import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { servicesList } from "../data";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

interface PackageTier {
  title: string;
  price: string;
  description: string;
  deliverables: string[];
  includes: string[];
}

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<any | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Map images specifically matching the aesthetic for an image-led grid
  const serviceImages: { [key: string]: string } = {
    "wedding-photo": "https://res.cloudinary.com/yfmkodp7/image/upload/v1784233499/luxury-wedding_pruoqz.jpg", // Candid laugh
    "wedding-film": "https://res.cloudinary.com/yfmkodp7/image/upload/v1784232942/7lenz-hero_mosfoy.jpg", // Munnar film poster
    "pre-wedding": "https://res.cloudinary.com/yfmkodp7/image/upload/v1784233067/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_2_rjesv5.webp", // Couple outdoor
    "newborn-family": "https://res.cloudinary.com/yfmkodp7/image/upload/v1784274755/baby-landscape_yrbda6.jpg", // Soft baby portrait
    "portfolio": "https://res.cloudinary.com/yfmkodp7/image/upload/v1784274714/swasika-landscape_gtsno5.jpg", // Bride portrait
    "events": "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268392/New_click_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7le_wzeycf.webp", // Haldi celebration
  };

  // Bespoke Package Details configuration
  const servicesPackages: { [key: string]: PackageTier[] } = {
    "wedding-photo": [
      {
        title: "Essential Photography",
        price: "Consultation Request",
        description: "Ideal for smaller gatherings, family rituals, or single-day events.",
        includes: ["1 Senior Candid Photographer", "Up to 6 Hours coverage", "High-end prime-lens capture"],
        deliverables: ["350+ color-graded digital frames", "Secure online client gallery"]
      },
      {
        title: "Signature Premium",
        price: "Consultation Request",
        description: "Our core requested plan. Comprehensive documentary coverage of all rituals.",
        includes: ["1 Lead Candid Photographer", "1 Traditional Photographer", "Full-day coverage (up to 12 Hours)"],
        deliverables: ["550+ master-graded digital frames", "Luxury handcrafted 12x15 photo album", "Online private gallery"]
      },
      {
        title: "Elite Royal Heirloom",
        price: "Consultation Request",
        description: "Master-director production for grand, multi-day celebrations.",
        includes: ["2 Lead Candid Photographers", "1 Traditional Photographer", "1 Lighting director", "Multi-day travel options"],
        deliverables: ["800+ bespoke edited digital frames", "2 Luxury glass-cover physical albums", "Fine-art custom couple canvas prints"]
      }
    ],
    "wedding-film": [
      {
        title: "Cinematic Highlights",
        price: "Consultation Request",
        description: "A compact, highly emotional highlights trailer summarizing your big day.",
        includes: ["1 Lead Cinematographer", "Up to 10 Hours of coverage", "Professional ambient float audio"],
        deliverables: ["3-5 min Cinematic Trailer Film", "Full-length raw footage stream archive"]
      },
      {
        title: "Premium Director's Cut",
        price: "Consultation Request",
        description: "Award-grade wedding cinema telling your complete narrative arc.",
        includes: ["2 Senior Cinematographers", "1 Professional Drone pilot", "Full-day comprehensive coverage"],
        deliverables: ["5-7 min Story Trailer Film", "25-30 min Extended Feature Film", "Instagram Reels teaser film"]
      },
      {
        title: "Royal Signature Film",
        price: "Consultation Request",
        description: "Uncompromised cinematic master production for major high-scale weddings.",
        includes: ["2 Senior Cinematographers", "1 Gimbal specialist", "1 Dedicated Drone pilot", "Multi-day coverage"],
        deliverables: ["8-12 min Narrative Highlight Film", "35-45 min Extended Cinematic Film", "Same-Day-Edit (SDE) premiere teaser"]
      }
    ],
    "pre-wedding": [
      {
        title: "Classic Scenic Shoot",
        price: "Consultation Request",
        description: "A relaxed, comfortable session capturing your authentic bond.",
        includes: ["1 Senior Portrait Photographer", "3 Hours relaxed session", "Scenic scouting support"],
        deliverables: ["35+ fine-art edited digital portraits", "Private gallery delivery"]
      },
      {
        title: "Bespoke Love Story",
        price: "Consultation Request",
        description: "Our signature pre-wedding. An immersive story production in backwaters or misty hills.",
        includes: ["1 Portrait Photographer", "1 Cinematographer", "Full-day session (up to 8 Hours)", "Scouting 2 scenic locations", "Bespoke concept & styling consultation"],
        deliverables: ["65+ premium edited digital frames", "1-2 min Cinematic Save-the-Date video trailer"]
      }
    ],
    "newborn-family": [
      {
        title: "Cozy Sprout Session",
        price: "Consultation Request",
        description: "Safe, cozy, unhurried baby and motherhood fine-art portraiture.",
        includes: ["1 Specialized Kids & Family Photographer", "2 Hours relaxed session", "In-studio or comfort-of-home setups", "Baby-safe props and organic staging styling"],
        deliverables: ["25+ high-res retouched frames", "Private gallery delivery"]
      },
      {
        title: "Generations Legacy",
        price: "Consultation Request",
        description: "A rich legacy session documenting the complete family tree.",
        includes: ["1 Lead Portrait Photographer", "4 Hours unhurried session", "Combination of indoor fine-art & outdoor frames", "Group styling coordination"],
        deliverables: ["50+ high-res retouched master frames", "Custom 12x18 printed canvas wall art"]
      }
    ],
    "portfolio": [
      {
        title: "Creative Portrait & Headshots",
        price: "Consultation Request",
        description: "Elevated portraits for executives, creators, and business profiles.",
        includes: ["1 Expert Studio Photographer", "2 Hours studio session", "Up to 2 look/outfit configurations", "Precision studio lighting setup"],
        deliverables: ["10+ high-end retouched portraits", "Full commercial licensing rights"]
      },
      {
        title: "Elite Creator Portfolio",
        price: "Consultation Request",
        description: "High-fashion model portfolios and premium personal branding.",
        includes: ["1 Lead Fashion Photographer", "4 Hours studio & outdoor shoot", "Up to 4 look/outfit configurations", "Professional posing coaching"],
        deliverables: ["25+ luxury retouched master portraits", "Commercial license and raw sheets access"]
      }
    ],
    "events": [
      {
        title: "Festive Half-Day Coverage",
        price: "Consultation Request",
        description: "Vibrant documentary coverage for Baptisms, Sangeets, or intimate receptions.",
        includes: ["1 Professional Event Photographer", "Up to 4 Hours of active coverage", "Fast-turnaround post production"],
        deliverables: ["150+ color-graded digital frames", "Online client gallery access"]
      },
      {
        title: "Complete Event Celebration",
        price: "Consultation Request",
        description: "End-to-end multi-angle event photography capturing every smile.",
        includes: ["2 Senior Event Photographers", "Up to 8 Hours coverage (Full-day)", "Focus on guest interaction and grand rituals"],
        deliverables: ["300+ color-graded digital frames", "2-3 min Highlight Cinematic Video Reel"]
      }
    ]
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCount = () => {
    if (windowWidth >= 1024) return 3; // lg
    if (windowWidth >= 768) return 2;  // md
    return 1;                          // sm
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, servicesList.length - visibleCount);

  // Keep index within bounds if size changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = false;
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;

    const moveX = Math.abs(e.clientX - dragStartX.current);
    if (moveX > 5) {
      isDraggingRef.current = true;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleCardClick = (service: any) => {
    if (isDraggingRef.current) {
      return; // Ignore modal click if user was dragging
    }
    setSelectedServiceForModal(service);
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / getVisibleCount();
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / getVisibleCount();
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth / getVisibleCount();
    const activeIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(activeIndex, maxIndex));
  };

  const handleBookPackage = (service: any, pkg?: PackageTier) => {
    // 1. Dispatch custom event that BookingForm listens to
    const prefillEvent = new CustomEvent("booking-prefill", {
      detail: {
        serviceId: service.id,
        title: service.title,
        packageName: pkg ? pkg.title : undefined,
      },
    });
    window.dispatchEvent(prefillEvent);

    // 2. Close modal
    setSelectedServiceForModal(null);
  };

  const handleScrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDotClick = (idx: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / getVisibleCount();
      scrollContainerRef.current.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
      setCurrentIndex(idx);
    }
  };

  return (
    <section 
      id="services" 
      className="pt-12 pb-18 md:pt-16 md:pb-20 bg-white dark:bg-black text-stone-800 dark:text-stone-200 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <span className="font-sans text-[20px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-3 font-semibold">
              WHAT WE DO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-stone-900 dark:text-stone-50 mb-4">
             Every Celebration
Deserves To Be Remembered
            </h2>
            <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-stone-500 dark:text-stone-400 max-w-2xl">
              Every family has a story worth preserving. From intimate ceremonies to grand weddings, we capture every celebration with creativity, care, and heartfelt storytelling—creating photographs and films that you'll cherish for generations.
            </p>
          </div>

          {/* Luxury Slider Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous service"
              className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 bg-white/40 dark:bg-neutral-900/20 backdrop-blur-md flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 transition-all duration-300 cursor-pointer shadow-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next service"
              className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 bg-white/40 dark:bg-neutral-900/20 backdrop-blur-md flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 transition-all duration-300 cursor-pointer shadow-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Track with Swipe / Drag & Drop Hands */}
        <div className="relative overflow-visible">
          <div className="overflow-hidden w-full py-4 -my-4">
            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onScroll={handleScroll}
              className={`flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth select-none pb-4 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
            >
              {servicesList.map((service, index) => (
                <motion.div
                  key={service.id}
                  onClick={() => handleCardClick(service)}
                  className="flex-shrink-0 w-[285px] sm:w-[325px] snap-start flex flex-col bg-zinc-50/50 dark:bg-neutral-900/5 border border-stone-100 dark:border-zinc-900 rounded-sm overflow-hidden group hover:shadow-lg hover:border-stone-200 dark:hover:border-zinc-800 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* Image Header - reduced height (aspect-video / aspect-[16/10]) */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={serviceImages[service.id] || "https://picsum.photos/seed/service/400/300"}
                      alt={service.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors duration-500" />
                    
                    {/* Floating Category tag */}
                    <span className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md text-stone-50 text-[8px] font-medium uppercase tracking-[0.25em] py-1 px-2.5 rounded-sm">
                      {service.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-light tracking-wide text-stone-900 dark:text-stone-100 mb-2.5 group-hover:text-amber-500 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="font-sans text-[11px] sm:text-xs leading-relaxed text-stone-500 dark:text-stone-400 font-light">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* CTA Details Link - streamlined footer */}
                    <div className="pt-4 mt-6 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedServiceForModal(service);
                        }}
                        className="flex items-center gap-1.5 font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-amber-600 dark:text-amber-500 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-300 cursor-pointer"
                      >
                        Package Details
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide group ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentIndex === idx 
                    ? "w-6 bg-amber-500" 
                    : "w-1.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tailored Packages Callout (At the end) */}
        <motion.div
          className="mt-16 md:mt-24 p-8 sm:p-12 bg-zinc-50 dark:bg-neutral-950/20 border border-stone-100 dark:border-zinc-900 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl text-center md:text-left">
            <span className="font-serif text-xs italic tracking-wider text-amber-600 dark:text-amber-500 block mb-2">
              Bespoke Configurations
            </span>
            <h3 className="font-serif text-2xl font-light tracking-wide text-stone-900 dark:text-stone-50 mb-3">
              Every celebration is tailored
            </h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              We offer structured pricing across <strong className="text-stone-700 dark:text-stone-300">Essential</strong>, <strong className="text-stone-700 dark:text-stone-300">Premium</strong>, <strong className="text-stone-700 dark:text-stone-300">Luxury</strong>, and <strong className="text-stone-700 dark:text-stone-300">Custom</strong> packages. No matter the scale or layout of your rituals, we build a seamless, dedicated team structure to capture your story flawlessly.
            </p>
          </div>
          
          <button
            onClick={handleScrollToBooking}
            className="whitespace-nowrap px-8 py-3.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            Customise Package
          </button>
        </motion.div>

      </div>

      {/* STUNNING POPUP MODAL: Service Package Details */}
      <AnimatePresence>
        {selectedServiceForModal && (
          <motion.div 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedServiceForModal(null)}
          >
            <motion.div 
              className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Banner Image */}
              <div className="relative h-48 sm:h-60 md:h-72 w-full">
                <img 
                  src={serviceImages[selectedServiceForModal.id] || "https://picsum.photos/seed/service/800/400"} 
                  alt={selectedServiceForModal.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-stone-950 via-stone-950/50 to-transparent" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedServiceForModal(null)}
                  className="absolute top-4 right-4 bg-stone-900/80 hover:bg-stone-950 text-stone-100 p-2 rounded-full backdrop-blur-xs transition-all focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <X size={16} />
                </button>
                
                <div className="absolute bottom-4 left-6 md:left-8 pr-12">
                  <span className="bg-amber-600 text-stone-50 text-[8px] font-bold uppercase tracking-[0.25em] py-1 px-2.5 rounded-sm mb-1.5 inline-block">
                    {selectedServiceForModal.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-stone-900 dark:text-stone-50 leading-tight">
                    {selectedServiceForModal.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content Details */}
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h4 className="font-sans text-[10px] uppercase tracking-widest text-stone-400 block mb-2">Service Overview</h4>
                  <p className="font-sans text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
                    {selectedServiceForModal.shortDescription}
                  </p>
                </div>

                {/* Package Tiers Grid */}
                <div>
                  <h4 className="font-serif text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-semibold mb-4 border-b border-stone-100 dark:border-stone-900 pb-2">
                    Bespoke Package Tiers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(servicesPackages[selectedServiceForModal.id] || []).map((pkg, idx) => (
                      <div 
                        key={idx} 
                        className="bg-stone-50/50 dark:bg-stone-900/20 border border-stone-200/40 dark:border-stone-900 p-5 rounded-sm flex flex-col justify-between"
                      >
                        <div>
                          <h5 className="font-serif text-base font-light text-stone-900 dark:text-stone-100 mb-1">
                            {pkg.title}
                          </h5>
                          <span className="font-mono text-[9px] text-amber-600 dark:text-amber-500 font-medium block mb-3 uppercase tracking-wider">
                            {pkg.price}
                          </span>
                          <p className="font-sans text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-4 font-light">
                            {pkg.description}
                          </p>
                          
                          <div className="space-y-4 pt-3 border-t border-stone-200/50 dark:border-stone-800/50">
                            {/* Crew/Specs */}
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5 font-medium">Crew & Service:</span>
                              <ul className="space-y-1">
                                {pkg.includes.map((inc, i) => (
                                  <li key={i} className="text-[10px] text-stone-600 dark:text-stone-400 flex items-start gap-1.5 font-light">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Deliverables */}
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5 font-medium">Deliverables:</span>
                              <ul className="space-y-1">
                                {pkg.deliverables.map((del, i) => (
                                  <li key={i} className="text-[10px] text-stone-600 dark:text-stone-400 flex items-start gap-1.5 font-light">
                                    <span className="text-emerald-500">✓</span>
                                    <span>{del}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleBookPackage(selectedServiceForModal, pkg)}
                          className="w-full mt-6 py-2 bg-stone-900 hover:bg-amber-600 dark:bg-stone-100 dark:hover:bg-amber-500 text-stone-50 dark:text-stone-950 hover:text-stone-50 dark:hover:text-stone-50 font-sans text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs focus:outline-none"
                        >
                          <span>Book This Package</span>
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info / Bespoke Tailoring footer */}
                <div className="bg-stone-50 dark:bg-stone-900/10 p-5 rounded-sm border border-stone-200/50 dark:border-stone-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-serif text-xs italic tracking-wider text-amber-600 dark:text-amber-500 block mb-1">
                      Need a custom crew structure or multi-day coverage?
                    </span>
                    <p className="font-sans text-[11px] text-stone-400 leading-normal font-light">
                      All options are fully customizable to align with your personal traditional requirements, travel plans, and ritual structures.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleBookPackage(selectedServiceForModal, { title: "Custom Personalized Package" } as any)}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-sans text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all cursor-pointer whitespace-nowrap focus:outline-none"
                  >
                    Custom Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
