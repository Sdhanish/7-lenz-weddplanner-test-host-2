import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { businessConfig, testimonials } from "../data";
import { ASSET_CONFIG } from "../assetsConfig";
import { 
  Heart, 
  Award, 
  Layers, 
  Camera, 
  Film, 
  Clock, 
  BookOpen, 
  Plus, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  ArrowRightLeft
} from "lucide-react";

// Self-contained high-performance animated counter that triggers when visible in viewport
function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract the numeric portion and the suffix
  const numVal = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = numVal;
          if (end === 0) return;
          
          const duration = 1800; // 1.8 seconds duration
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentCount = Math.floor(easeProgress * end);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [numVal, hasAnimated]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {hasAnimated ? count : 0}
      {suffix}
    </span>
  );
}

export default function About() {
  const { stats } = businessConfig;
  const [view, setView] = useState<"about" | "why">("about");
  
  // Testimonials Carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Accordion active state for Why Choose Us (all collapsed by default)
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  // Custom scroll-parallax for the active image (only active on larger displays)
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 70,
    damping: 24,
    mass: 0.4
  });
  const yImageParallax = useTransform(smoothScrollY, [200, 1200], [-15, 15]); // Subtle 30px translation

  // Setup About slideshow images
  const aboutSlideshowImages = ASSET_CONFIG.aboutImages || [ASSET_CONFIG.aboutImageUrl];
  const [currentAboutImgIndex, setCurrentAboutImgIndex] = useState(0);

  useEffect(() => {
    if (aboutSlideshowImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentAboutImgIndex((prev) => (prev + 1) % aboutSlideshowImages.length);
    }, 5000); // Cross-fade every 5 seconds
    return () => clearInterval(interval);
  }, [aboutSlideshowImages]);

  // Setup Why Choose slideshow images and captions
  const whySlideshowImages = [
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231669/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_3_s0tmgc.jpg",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231667/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_1_yhe6qr.webp",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231666/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_3_yubhmo.webp",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231666/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_2_jd1njk.webp",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231648/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_inzxd6.jpg"
  ];

const whyCaptionTexts = [
  "Every glance, every smile, and every emotion preserved exactly as your story unfolded.",
  "Celebrating timeless love through elegant portraits inspired by Kerala's beauty.",
  "Cinematic wedding films crafted to let you relive every heartfelt moment.",
  "The joy of family, traditions, and candid memories captured forever.",
  "Creating heirloom photographs that will be cherished for generations."
];

const whyCaptionCredits = [
  "7 Lenz Signature",
  "7 Lenz Signature",
  "7 Lenz Signature",
  "7 Lenz Signature",
  "7 Lenz Signature "
];

  const [currentWhyImgIndex, setCurrentWhyImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWhyImgIndex((prev) => (prev + 1) % whySlideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // 7 standard credibility points with icons
  const standardPoints = [
    {
      id: "storytelling",
      title: "Artistic Storytelling",
      description: "We don't just ask you to smile. We document raw emotion, candid glances, and the quiet in-between memories that represent who you genuinely are.",
      icon: <Heart size={13} className="text-amber-500" />
    },
    {
      id: "experience",
      title: "Expertise & Intuition",
      description: "With 8+ years and over 200 weddings, our team navigates any lighting, traditional ceremony flow, or spontaneous moment with calm professionalism.",
      icon: <Award size={13} className="text-amber-500" />
    },
    {
      id: "editing",
      title: "Considered Post-Production",
      description: "Every frame undergoes bespoke fine-art color grading. We reject cheap filters, opting for timeless, rich tones that remain classic for decades.",
      icon: <Layers size={13} className="text-amber-500" />
    },
    {
      id: "technology",
      title: "Cinematic Grade Tech",
      description: "We employ professional mirrorless bodies, high-speed primes, DJI drone systems, and 32-bit float audio recorders to ensure flawless 4K output.",
      icon: <Camera size={13} className="text-amber-500" />
    },
    {
      id: "audio-video",
      title: "Cinema-Grade Audio & Video",
      description: "We use professional 4K cameras, high-speed lenses, advanced stabilizers, and multi-track spatial recorders to capture high-fidelity vows.",
      icon: <Film size={13} className="text-amber-500" />
    },
    {
      id: "consultation",
      title: "Personalised Consultation",
      description: "We work side-by-side with you, creating custom mood boards, conducting venue walkthroughs, and framing timelines to keep you completely relaxed.",
      icon: <Clock size={13} className="text-amber-500" />
    },
    {
      id: "albums",
      title: "Luxury Heirloom Albums",
      description: "Bespoke lay-flat digital albums, hand-bound with natural linen or leather covers, custom designed to be passed down through generations.",
      icon: <BookOpen size={13} className="text-amber-500" />
    }
  ];

  return (
    <section 
      id="about" 
      className="py-14 md:py-20 bg-stone-50 dark:bg-zinc-950/20 text-stone-800 dark:text-stone-200 transition-colors duration-500 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header with Swapper Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-6 relative">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-2 font-semibold">
              {view === "about" ? "OUR STORY • EST. 2018" : "THE 7 LENZ STANDARD"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-4xl font-light tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
              {view === "about" ? "Your Story. Your People. Your Forever." : "Why Trust Your Day With Us?"}
            </h2>
          </div>
          
          {/* Dynamic Premium Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 15px rgba(245, 158, 11, 0.2)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setView(view === "about" ? "why" : "about")}
            className="self-start sm:self-center px-6 py-3 bg-amber-100/5 hover:bg-amber-200/10 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[11px] uppercase tracking-widest rounded-full flex items-center gap-3 border border-amber-500/30 hover:border-amber-500/60 shadow-sm cursor-pointer transition-all duration-300"
            id="about-why-toggle-btn"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-semibold tracking-widest">{view === "about" ? "Why Choose Us" : "Our Story"}</span>
            <motion.span
              animate={{ rotate: view === "about" ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center justify-center text-amber-500"
            >
             
            </motion.span>
          </motion.button>
        </div>

        {/* Combined Main Grid: Left and Right Columns Swap Ordering */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative min-h-[500px]"
        >
          
          {/* Image Container Column */}
          <motion.div 
            layout 
            key="about-image-column"
            className={`lg:col-span-5 flex justify-center relative ${view === "about" ? "lg:order-1" : "lg:order-2"}`}
            transition={{ type: "spring", stiffness: 120, damping: 24, mass: 1 }}
          >
            <div className="lg:sticky lg:top-28 w-full max-w-[320px] sm:max-w-[340px] relative select-none">
              {/* Elegant Behind-Frame Thin Offset Half-Borders */}
              <div className="absolute -top-3 -left-3 w-[calc(100%-8px)] h-[calc(100%-8px)] border-t border-l border-amber-500/30 dark:border-amber-500/20 pointer-events-none rounded-xs" />
              <div className="absolute -bottom-3 -right-3 w-[calc(100%-8px)] h-[calc(100%-8px)] border-b border-r border-amber-500/30 dark:border-amber-500/20 pointer-events-none rounded-xs" />

              {/* Central Slideshow Box */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs border border-stone-200 dark:border-stone-850 shadow-2xl bg-stone-100 dark:bg-stone-950 z-10">
                <AnimatePresence mode="wait">
                  {view === "about" ? (
                    <motion.div
                      key="about-slideshow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <motion.div 
                        className="absolute inset-0 w-full h-[110%] -top-[5%]"
                        style={{ y: yImageParallax }}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.img
                            key={currentAboutImgIndex}
                            src={aboutSlideshowImages[currentAboutImgIndex]}
                            alt="7 Lenz Professional Wedding Photographer behind-the-scenes in Kerala"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="why-slideshow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <motion.div 
                        className="absolute inset-0 w-full h-[110%] -top-[5%]"
                        style={{ y: yImageParallax }}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.img
                            key={currentWhyImgIndex}
                            src={whySlideshowImages[currentWhyImgIndex]}
                            alt="Kerala traditional fine-art wedding bridal portrait by 7 Lenz"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                      </motion.div>
                      
                      {/* Caption Card Overlay for Why Choose Us */}
                      <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md p-3 rounded-sm border border-stone-800/50 z-20">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentWhyImgIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.4 }}
                          >
                            <p className="font-serif text-[10px] italic text-stone-200 leading-relaxed">
                              {whyCaptionTexts[currentWhyImgIndex]}
                            </p>
                            <span className="font-sans text-[8px] uppercase tracking-widest text-amber-500 mt-1.5 block font-medium">
                              — {whyCaptionCredits[currentWhyImgIndex]}
                            </span>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            layout 
            key="about-content-column"
            className={`lg:col-span-7 flex flex-col justify-center ${view === "about" ? "lg:order-2" : "lg:order-1"}`}
            transition={{ type: "spring", stiffness: 120, damping: 24, mass: 1 }}
          >
            <AnimatePresence mode="wait">
              {view === "about" ? (
                <motion.div
                  key="about-content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* About Content Text */}
                  <div className="font-sans text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 mb-6 font-light space-y-4">
                    <p>
                      At <strong className="font-normal text-stone-900 dark:text-stone-100">7 Lenz Wedd Planner</strong>, we believe the most beautiful photographs are not created—they are felt. A mother's silent prayer, a father's proud smile, the laughter of friends, and quiet moments shared between two hearts—<span className="text-stone-700 dark:text-stone-300 font-medium">these are the memories that deserve to live forever.</span>
                    </p>

                    <p>
                      For more than eight years, we have been honoured to document weddings across Kerala, preserving traditions, emotions, and celebrations with honesty, artistry, and care. From peaceful temple mornings to elegant church weddings, joyful nikahs, and destination celebrations, every story is captured with the same love, respect, and attention to detail.
                    </p>

                    <p>
                      <span className="font-medium text-stone-800 dark:text-stone-200">Our approach is simple: we don't ask you to perform for the camera.</span> We let you celebrate your day while we quietly preserve every smile, tear, blessing, and unforgettable moment exactly as it happened.
                    </p>
                  </div>

                  {/* Values Grid inside About view */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-2 border-t border-stone-150 dark:border-stone-900 pt-5">
                    <div>
                      <h4 className="font-serif text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-semibold mb-0.5">Heart Before Camera</h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal font-light">Every photograph begins with understanding people before pressing the shutter.</p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-semibold mb-0.5">Kerala Traditions</h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal font-light">Every culture, every ritual, and every family tradition is captured with genuine respect.</p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-semibold mb-0.5">Timeless Storytelling</h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal font-light">Images and films created to be cherished today, tomorrow, and generations from now.</p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-semibold mb-0.5">Crafted With Care</h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal font-light">From consultation to final delivery, every detail is handled with professionalism and personal attention.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="why-content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  {/* Why Choose Us Interactive Accordion */}
                  <div className="divide-y divide-stone-200/50 dark:divide-stone-800/50 border-t border-b border-stone-200/50 dark:border-stone-800/50">
                    {standardPoints.map((point) => {
                      const isOpen = openAccordionId === point.id;
                      return (
                        <div key={point.id} className="py-3.5 md:py-4">
                          {/* Header Trigger */}
                          <button
                            onClick={() => setOpenAccordionId(isOpen ? null : point.id)}
                            className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                            aria-expanded={isOpen}
                          >
                            <div className="flex items-center gap-4">
                              {/* Icon background */}
                              <div className="p-1.5 rounded-full bg-stone-100 dark:bg-neutral-900 text-amber-500 group-hover:bg-amber-500/10 transition-colors duration-300">
                                {point.icon}
                              </div>
                              {/* Title */}
                              <h3 className={`font-serif text-[13px] sm:text-sm md:text-base font-light tracking-wide transition-colors duration-300 ${
                                isOpen ? "text-amber-600 dark:text-amber-500 font-normal" : "text-stone-800 dark:text-stone-200 group-hover:text-stone-950 dark:group-hover:text-stone-50"
                              }`}>
                                {point.title}
                              </h3>
                            </div>

                            {/* Small Toggle Arrow or Plus */}
                            <div className="ml-4 p-1 rounded-full border border-stone-200 dark:border-stone-850 text-stone-400 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors duration-300 flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: isOpen ? 45 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-center"
                              >
                                <Plus size={11} className={isOpen ? "text-amber-500" : ""} />
                              </motion.div>
                            </div>
                          </button>

                          {/* Accordion Content */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="font-sans text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed pl-12 pr-4 mt-2 pb-1">
                                  {point.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>

        {/* Slim Glassmorphic Proof Points Strip (Always visible as an anchor of credibility) */}
        <motion.div
          className="mt-12 md:mt-14 p-6 sm:p-8 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-stone-200/50 dark:border-stone-900/50 rounded-xs z-10 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200/50 dark:divide-stone-800/50">
            {stats.map((stat, idx) => (
              <div key={idx} className={`pt-4 md:pt-0 ${idx === 0 ? "pt-0" : ""}`}>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extralight text-amber-600 dark:text-amber-500 block mb-1">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Carousel Integration (Bottom section social proof) */}
        <motion.div 
          className="mt-14 md:mt-16 bg-white/30 dark:bg-neutral-950/20 border border-stone-200/40 dark:border-zinc-900/50 p-6 sm:p-8 md:p-12 rounded-xs relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            {/* Quote Icon */}
            <div className="text-amber-500/10 dark:text-amber-500/20 mb-5">
              <Quote size={32} fill="currentColor" />
            </div>

            {/* Slidable Testimonials Carousel Area */}
            <div className="min-h-[140px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <p className="font-serif text-sm sm:text-base md:text-lg font-light text-stone-800 dark:text-stone-200 leading-relaxed mb-5 italic max-w-2xl">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  
                  <span className="font-mono text-[8px] uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1 block">
                    {testimonials[activeTestimonial].category}
                  </span>
                  <span className="font-sans text-xs font-medium text-stone-900 dark:text-stone-50">
                    {testimonials[activeTestimonial].clientName} — <span className="font-light text-stone-500">{testimonials[activeTestimonial].location}</span>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-1.5 rounded-full border border-stone-300 dark:border-stone-850 text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-500 hover:border-amber-500 dark:hover:border-amber-500 focus:outline-none transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-1.5 rounded-full border border-stone-300 dark:border-stone-850 text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-500 hover:border-amber-500 dark:hover:border-amber-500 focus:outline-none transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
