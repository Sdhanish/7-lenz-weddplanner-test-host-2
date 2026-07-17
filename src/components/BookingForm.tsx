import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { BookingEnquiry } from "../types";
import { businessConfig } from "../data";

// Schema definition using Zod
const bookingSchema = z.object({
  eventType: z.string().min(2, "Please select or type your event type"),
  date: z.string().min(1, "Please choose a tentative date"),
  location: z.string().min(2, "Please enter your tentative location/venue"),
  guestCount: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one required service"),
  name: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number (10-15 digits)"),
  email: z.string().email("Please enter a valid email address"),
  vision: z.string().optional(),
  packageName: z.string().optional(),
});

type FormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      services: [],
      eventType: "",
      vision: "",
      packageName: "",
    },
  });

  // Listener to pre-fill services and scroll to Booking
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId: string; title: string; packageName?: string }>;
      if (!customEvent.detail) return;
      
      const { serviceId, title, packageName } = customEvent.detail;
      
      let serviceToSelect = "Photography";
      let eventTypeToSelect = "";
      
      if (serviceId === "wedding-photo") {
        serviceToSelect = "Photography";
        eventTypeToSelect = "Traditional Hindu Wedding";
      } else if (serviceId === "wedding-film") {
        serviceToSelect = "Cinematic Films";
        eventTypeToSelect = "Christian Nuptial & Reception";
      } else if (serviceId === "pre-wedding") {
        serviceToSelect = "Pre-Wedding";
        eventTypeToSelect = "Pre-Wedding Couple Shoot";
      } else if (serviceId === "newborn-family") {
        serviceToSelect = "Photography";
        eventTypeToSelect = "Baptism or Special Celebration";
      } else if (serviceId === "portfolio") {
        serviceToSelect = "Photography";
        eventTypeToSelect = "Custom / Other Event";
      } else if (serviceId === "events") {
        serviceToSelect = "Photography";
        eventTypeToSelect = "Haldi & Mehendi Event";
      }
      
      setValue("services", [serviceToSelect]);
      if (eventTypeToSelect) {
        setValue("eventType", eventTypeToSelect);
      }
      
      if (packageName) {
        setValue("packageName", packageName);
        setValue("vision", `Hi! I would like to request a booking/consultation for the "${packageName}" package under "${title}".`);
      } else {
        setValue("packageName", "");
      }
      
      setStep(1); // Set to step 1 so they can fill date and location (which are required)
      
      // Smooth scroll to element
      const element = document.getElementById("booking");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    window.addEventListener("booking-prefill", handlePrefill);
    return () => window.removeEventListener("booking-prefill", handlePrefill);
  }, [setValue]);

  // Watch fields for interactive styling
  const selectedServices = watch("services") || [];
  const watchedEventType = watch("eventType") || "";
  const watchedPackageName = watch("packageName") || "";

  // Available interactive services
  const servicesOptions = [
    { id: "Photography", label: "Photography Coverage", desc: "Fine-art traditional & candid frames" },
    { id: "Cinematic Films", label: "Cinematic Films", desc: "Emotional 4K teasers and story highlights" },
    { id: "Pre-Wedding", label: "Pre-Wedding Session", desc: "Intimate scenic outdoor couple shoot" },
    { id: "Drone Coverage", label: "Aerial Drone", desc: "Breathtaking multi-angle scenic shots" },
    { id: "Bespoke Album", label: "Heirloom Album", desc: "Hand-crafted custom physical photo album" },
    { id: "Custom Crew", label: "Custom / Special scale", desc: "Multi-day ceremonies, customized requirements" },
  ];

  // Quick select event types
  const eventTypesOptions = [
    "Traditional Hindu Wedding",
    "Christian Nuptial & Reception",
    "Muslim Nikkah & Ceremony",
    "Pre-Wedding Couple Shoot",
    "Haldi & Mehendi Event",
    "Baptism or Special Celebration",
  ];

  // Toggle custom checkboxes
  const handleServiceToggle = (id: string) => {
    const current = [...selectedServices];
    if (current.includes(id)) {
      setValue("services", current.filter((s) => s !== id));
    } else {
      setValue("services", [...current, id]);
    }
  };

  // Step transitions
  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["eventType", "date", "location", "guestCount"]);
    } else if (step === 2) {
      isValid = await trigger("services");
    }
    
    if (isValid) {
      setStep((prev) => prev + 1);
      setSubmitError(null);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    setSubmitError(null);
  };

  // Submit Handler
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Secure Full-Stack Express API Endpoint dispatch
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to log enquiry. Please try again.");
      }

      // 2. Open client-side friendly prefilled WhatsApp Enquiry in a new tab
      const whatsappText = `Hello 7 Lenz! I would like to request a wedding/event consultation:

*Client Details:*
• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email}

*Event Details:*
• Event: ${data.eventType}
${data.packageName ? `• Selected Package: ${data.packageName}\n` : ""}• Date: ${data.date}
• Location: ${data.location}
• Guests: ${data.guestCount || "Not Specified"}

*Services Requested:*
• ${data.services.join(", ")}

*My Vision:*
${data.vision || "No custom vision specified yet."}

Thank you! Let's schedule our consultation.`;

      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodedText}`;
      
      // Attempt opening in a new tab safely
      window.open(whatsappUrl, "_blank");

      // Set success state
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      id="booking" 
      className="py-24 md:py-32 bg-white dark:bg-black text-stone-800 dark:text-stone-200 transition-colors duration-500 relative"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-3 font-semibold">
            Bespoke Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-stone-900 dark:text-stone-50 mb-4">
            Your story begins with <br className="hidden sm:block" />
            <span className="italic font-light">a conversation.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-stone-500 dark:text-stone-400">
            Tell us about your celebration. We will customize your pricing, organize details, and secure your dates.
          </p>
        </div>

        {/* The Multi-step Card layout */}
        <div className="bg-zinc-50 dark:bg-neutral-900/10 border border-stone-100 dark:border-zinc-900 rounded-sm shadow-lg overflow-hidden p-6 sm:p-10 relative">
          
          {/* Progress Indicators */}
          {!submitSuccess && (
            <div className="flex items-center justify-between mb-10 border-b border-stone-200/50 dark:border-stone-800/50 pb-6">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                  step >= 1 ? "bg-amber-600 border-amber-600 text-stone-50" : "border-stone-300 dark:border-stone-800 text-stone-400"
                }`}>1</div>
                <span className={`font-sans text-[10px] uppercase tracking-widest ${step === 1 ? "text-stone-900 dark:text-stone-100 font-semibold" : "text-stone-400"}`}>Event</span>
              </div>
              
              <div className="h-[1px] flex-1 bg-stone-200 dark:bg-stone-800 mx-4" />

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                  step >= 2 ? "bg-amber-600 border-amber-600 text-stone-50" : "border-stone-300 dark:border-stone-800 text-stone-400"
                }`}>2</div>
                <span className={`font-sans text-[10px] uppercase tracking-widest ${step === 2 ? "text-stone-900 dark:text-stone-100 font-semibold" : "text-stone-400"}`}>Services</span>
              </div>

              <div className="h-[1px] flex-1 bg-stone-200 dark:bg-stone-800 mx-4" />

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                  step >= 3 ? "bg-amber-600 border-amber-600 text-stone-50" : "border-stone-300 dark:border-stone-800 text-stone-400"
                }`}>3</div>
                <span className={`font-sans text-[10px] uppercase tracking-widest ${step === 3 ? "text-stone-900 dark:text-stone-100 font-semibold" : "text-stone-400"}`}>Contact</span>
              </div>
            </div>
          )}

          {/* Selected Package Banner */}
          {!submitSuccess && watchedPackageName && (
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xs flex items-center justify-between text-xs text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-2.5">
                <span className="font-sans font-bold uppercase tracking-wider text-[9px] bg-amber-500 text-stone-950 px-2 py-0.5 rounded-sm">
                  Package Selected
                </span>
                <span className="font-serif italic font-medium text-stone-900 dark:text-stone-100 text-xs sm:text-sm">{watchedPackageName}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValue("packageName", "");
                  setValue("vision", "");
                }}
                className="text-stone-500 hover:text-amber-600 dark:hover:text-amber-500 transition-colors font-sans uppercase tracking-wider text-[9px] font-bold cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          {/* Form wrapper */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                /* SUCCESS VIEW PANEL */
                <motion.div
                  id="booking-success-panel"
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-10 flex flex-col items-center justify-center"
                >
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-stone-900 dark:text-stone-100 mb-3">
                    Thank you! Your story has begun.
                  </h3>
                  <p className="font-sans text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed mb-8">
                    Your enquiry has been successfully logged on our secure servers, and we have opened a WhatsApp consultation window to instantly connect you with our lead directors.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        // Re-open WhatsApp if they closed it
                        const waText = encodeURIComponent(`Hello 7 Lenz! Just checking in regarding my recent wedding consultation enquiry.`);
                        window.open(`https://wa.me/${businessConfig.whatsappNumber}?text=${waText}`, "_blank");
                      }}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-stone-50 font-sans text-xs font-semibold uppercase tracking-[0.15em] rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={14}
                        height={14}
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setSubmitSuccess(false);
                      }}
                      className="px-6 py-3 border border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 font-sans text-xs font-semibold uppercase tracking-[0.15em] rounded-sm hover:text-amber-500 transition-colors duration-300 cursor-pointer"
                    >
                      Submit Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* STEP FIELDS */
                <div key={step}>
                  
                  {/* STEP 1: EVENT DETAILS */}
                  {step === 1 && (
                    <motion.div
                      id="booking-step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-serif text-lg font-light text-stone-900 dark:text-stone-50 mb-1">
                          Tell us about the event
                        </h3>
                        <p className="text-[11px] text-stone-400">Tentative schedules and formats help us construct package structures.</p>
                      </div>

                      {/* Event Type */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                          Event Type *
                        </label>
                        <select
                          id="booking-event-type"
                          {...register("eventType")}
                          className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                        >
                          <option value="">-- Select Event Type --</option>
                          {eventTypesOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                          <option value="Custom / Other Event">Other Special Event / Corporate</option>
                        </select>
                        {errors.eventType && (
                          <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.eventType.message}</p>
                        )}
                      </div>

                      {/* Date & Location Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Tentative Date */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            Tentative Date *
                          </label>
                          <input
                            id="booking-date"
                            type="date"
                            {...register("date")}
                            className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                          />
                          {errors.date && (
                            <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.date.message}</p>
                          )}
                        </div>

                        {/* Tentative Location */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            Location / Venue *
                          </label>
                          <input
                            id="booking-location"
                            type="text"
                            placeholder="e.g. Pathanamthitta, Kumarakom Resort, etc."
                            {...register("location")}
                            className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                          />
                          {errors.location && (
                            <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.location.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Guest count */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                          Estimated Guest Count (Optional)
                        </label>
                        <input
                          id="booking-guests"
                          type="text"
                          placeholder="e.g. 150, 500, 1000+"
                          {...register("guestCount")}
                          className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                        />
                      </div>

                      {/* Step Actions */}
                      <div className="pt-6 border-t border-stone-200/50 dark:border-stone-800/50 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] rounded-sm transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          Next: Services
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: REQUIRED SERVICES */}
                  {step === 2 && (
                    <motion.div
                      id="booking-step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-serif text-lg font-light text-stone-900 dark:text-stone-50 mb-1">
                          Choose required services
                        </h3>
                        <p className="text-[11px] text-stone-400">You can choose multiple items. These can be adjusted during consultation.</p>
                      </div>

                      {/* Services interactive cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {servicesOptions.map((opt) => {
                          const isChecked = selectedServices.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleServiceToggle(opt.id)}
                              className={`text-left p-4 rounded-sm border transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                                isChecked 
                                  ? "bg-amber-600/10 border-amber-500 text-stone-900 dark:text-stone-50" 
                                  : "bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full mb-1">
                                <span className="font-serif text-sm tracking-wide">{opt.label}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isChecked ? "bg-amber-600 border-amber-600 text-stone-50" : "border-stone-300 dark:border-stone-700"
                                }`}>
                                  {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                              </div>
                              <span className="text-[10px] text-stone-400 dark:text-stone-500 leading-normal font-light">{opt.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.services.message}</p>
                      )}

                      {/* Step Actions */}
                      <div className="pt-6 border-t border-stone-200/50 dark:border-stone-800/50 flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-3 border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 font-sans text-[10px] uppercase tracking-[0.15em] rounded-sm flex items-center gap-2 cursor-pointer focus:outline-none"
                        >
                          <ArrowLeft size={12} />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] rounded-sm transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          Next: Contact
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CONTACT & CLIENT VISION */}
                  {step === 3 && (
                    <motion.div
                      id="booking-step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-serif text-lg font-light text-stone-900 dark:text-stone-50 mb-1">
                          Personal Details & Vision
                        </h3>
                        <p className="text-[11px] text-stone-400">Bespoke photography starts by understanding your unique visual style.</p>
                      </div>

                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                          Full Name *
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          placeholder="e.g. Rahul Sharma / Anjali Nair"
                          {...register("name")}
                          className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                        />
                        {errors.name && (
                          <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.name.message}</p>
                        )}
                      </div>

                      {/* Contact grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            Phone Number *
                          </label>
                          <input
                            id="booking-phone"
                            type="text"
                            placeholder="e.g. +91 9074744417"
                            {...register("phone")}
                            className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                          />
                          {errors.phone && (
                            <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.phone.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            Email Address *
                          </label>
                          <input
                            id="booking-email"
                            type="email"
                            placeholder="e.g. your-name@gmail.com"
                            {...register("email")}
                            className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                          />
                          {errors.email && (
                            <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Vision Note */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                          Your Vision (Optional)
                        </label>
                        <textarea
                          id="booking-vision"
                          rows={4}
                          placeholder="Tell us about yourselves, your aesthetic preferences, or specific rituals you want highlighted..."
                          {...register("vision")}
                          className="w-full px-4 py-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200 resize-none"
                        />
                      </div>

                      {/* Submit failure alarm banner */}
                      {submitError && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-sm text-xs flex gap-2 items-center">
                          <AlertCircle size={14} />
                          <span>{submitError}</span>
                        </div>
                      )}

                      {/* Step Actions */}
                      <div className="pt-6 border-t border-stone-200/50 dark:border-stone-800/50 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          disabled={submitting}
                          className="px-5 py-3 border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 font-sans text-[10px] uppercase tracking-[0.15em] rounded-sm flex items-center gap-2 cursor-pointer focus:outline-none disabled:opacity-50"
                        >
                          <ArrowLeft size={12} />
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 disabled:bg-stone-700 text-stone-50 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <Loader2 size={12} className="animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Request My Consultation
                              <svg
                                viewBox="0 0 24 24"
                                width={12}
                                height={12}
                                fill="currentColor"
                              >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              )}
            </AnimatePresence>
          </form>

        </div>

      </div>
    </section>
  );
}
