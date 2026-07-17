import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Instagram, Facebook, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { businessConfig } from "../data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);

    try {
      // Re-use our secure email/booking flow with custom event type mapping to general contact
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "General Enquiry",
          date: "N/A",
          location: "N/A",
          services: ["General Contact Message"],
          name: data.name,
          phone: "Not Specified",
          email: data.email,
          vision: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      // 2. Open client-side prefilled WhatsApp Enquiry in a new tab
      const whatsappText = `Hello 7 Lenz! I have sent a general enquiry from your website:

*Client Details:*
• Name: ${data.name}
• Email: ${data.email}

*My Message:*
${data.message}

Thank you!`;

      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodedText}`;
      
      // Attempt opening in a new tab safely
      window.open(whatsappUrl, "_blank");

      setSuccess(true);
      reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 bg-white dark:bg-black text-stone-800 dark:text-stone-200 transition-colors duration-500 overflow-hidden border-t border-stone-200/50 dark:border-stone-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Column 1: Contact Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-3 font-semibold">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-stone-900 dark:text-stone-50 mb-4">
                Send a Message
              </h2>
              <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-stone-500 dark:text-stone-400">
                Have a quick question about our processes, pricing, or calendar availability? Send us a message and our studio coordinator will respond within 24 hours.
              </p>
            </div>

            {/* Form */}
            <div className="bg-zinc-50 dark:bg-neutral-900/10 border border-stone-100 dark:border-zinc-900 p-6 sm:p-8 rounded-sm">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 flex flex-col items-center justify-center"
                  >
                    <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-full mb-4">
                      <CheckCircle2 size={30} />
                    </div>
                    <h3 className="font-serif text-lg font-light text-stone-900 dark:text-stone-100 mb-2">
                      Message Sent Successfully
                    </h3>
                    <p className="font-sans text-[11px] text-stone-500 dark:text-stone-400 leading-normal mb-6 max-w-sm">
                      We have securely dispatched your message to the 7 Lenz administration inbox. We appreciate you reaching out!
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] rounded-sm transition-colors cursor-pointer"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Anand Krishnan"
                        {...register("name")}
                        className="w-full px-4 py-3 bg-white dark:bg-black border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                      />
                      {errors.name && (
                        <p className="text-[9px] text-red-500 flex items-center gap-1"><AlertCircle size={8} /> {errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. anand@gmail.com"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-white dark:bg-black border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200"
                      />
                      {errors.email && (
                        <p className="text-[9px] text-red-500 flex items-center gap-1"><AlertCircle size={8} /> {errors.email.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Your Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="What details are you interested in knowing? (Packages, date availability, etc.)"
                        {...register("message")}
                        className="w-full px-4 py-3 bg-white dark:bg-black border border-stone-200 dark:border-stone-800 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-200 resize-none"
                      />
                      {errors.message && (
                        <p className="text-[9px] text-red-500 flex items-center gap-1"><AlertCircle size={8} /> {errors.message.message}</p>
                      )}
                    </div>

                    {/* Error Box */}
                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] rounded-sm flex items-center gap-2">
                        <AlertCircle size={12} />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Column 2: Studio Info & Location Map */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-3 font-semibold">
                Studio Address
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-stone-900 dark:text-stone-50 mb-4">
                Come Say Hello
              </h2>
              <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-stone-500 dark:text-stone-400">
                We would love to host you at our creative studio for a warm cup of coffee and a hands-on viewing of our physical fine-art albums and cinematic trailers.
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-zinc-50 dark:bg-neutral-900/10 p-6 rounded-sm border border-stone-100 dark:border-zinc-900">
              {/* Phone */}
              <div className="flex gap-3 items-start">
                <div className="text-amber-500 mt-0.5"><Phone size={14} /></div>
                <div>
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">Phone</h4>
                  <a 
                    href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`} 
                    className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors duration-300"
                  >
                    {businessConfig.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start">
                <div className="text-amber-500 mt-0.5"><Mail size={14} /></div>
                <div>
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">Email</h4>
                  <a 
                    href={`mailto:${businessConfig.email}`} 
                    className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors duration-300"
                  >
                    {businessConfig.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3 items-start">
                <div className="text-amber-500 mt-0.5"><MapPin size={14} /></div>
                <div>
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">Studio</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    {businessConfig.location.address}, <br />
                    {businessConfig.location.city}, {businessConfig.location.state}
                  </p>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-3 items-start">
                <div className="text-amber-500 mt-0.5"><Instagram size={14} /></div>
                <div>
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-2.5">Socials</h4>
                  <div className="flex items-center gap-3">
                    <a 
                      href={businessConfig.instagramUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-stone-500 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5 transition-all duration-300 transform hover:scale-110 p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center justify-center"
                      title="Instagram"
                    >
                      <Instagram size={15} />
                    </a>
                    <a 
                      href="https://facebook.com/7lenzweddplanner" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-stone-500 hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5 transition-all duration-300 transform hover:scale-110 p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center justify-center"
                      title="Facebook"
                    >
                      <Facebook size={15} />
                    </a>
                    <a 
                      href={`https://wa.me/${businessConfig.whatsappNumber}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-stone-500 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-300 transform hover:scale-110 p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center justify-center"
                      title="WhatsApp"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={15}
                        height={15}
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="w-full h-48 sm:h-56 rounded-sm overflow-hidden border border-stone-200 dark:border-stone-800 shadow-inner bg-stone-200 relative">
              <iframe
                title="7 Lenz Wedd Planner Map Location Pathanamthitta Kerala"
                src={businessConfig.location.mapIframeUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[50%] contrast-[110%] invert-[5%] dark:invert-[90%]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
