import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ASSET_CONFIG } from "../assetsConfig";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const renderMagicalText = (text: string, customDelay = 0) => {
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.015,
          delayChildren: customDelay,
        }
      }
    };

    const letter = {
      hidden: { opacity: 0, filter: "blur(4px)", y: 12, scale: 0.95 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.215, 0.61, 0.355, 1.0]
        }
      }
    };

    return (
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-flex flex-wrap justify-center"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };
  
  // ============================================================================
  // HERO COMPONENT CONFIGURATION SELECTOR
  // ============================================================================
  // Toggle between "video" and "slideshow":
  // - "video": Cinematic background video with fallback poster (Default)
  // - "slideshow": Multi-image cross-fade transition of 4-5 high-resolution images
  const HERO_VERSION = "slideshow" as "video" | "slideshow"; 

  // Paste/Customize your Cloudinary image links in this array:
  const HERO_SLIDESHOW_IMAGES = [
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784276257/hero-main_bdzxmo.jpg",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784275908/hero-5_btefhf.jpg",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784276263/hero-2_ltwbuy.jpg",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784276259/hero-3_gv4ago.jpg"
  ];

  // Media poster and video URLs loaded dynamically from Cloudinary Configuration with state fallbacks
  const [heroPoster, setHeroPoster] = useState(ASSET_CONFIG.heroPosterUrl);
  const [videoUrl, setVideoUrl] = useState(ASSET_CONFIG.heroVideoUrl);

  // Slideshow active index state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Fetch dynamic Hero assets from Cloudinary
  useEffect(() => {
    let isMounted = true;
    fetch("/api/cloudinary/hero")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.configured) {
          if (data.videoUrl) setVideoUrl(data.videoUrl);
          if (data.posterUrl) setHeroPoster(data.posterUrl);
        }
      })
      .catch((err) => {
        console.error("Failed to load dynamic Cloudinary hero assets:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset video loaded state when the URL changes to trigger a smooth new fade-in
  useEffect(() => {
    setVideoLoaded(false);
  }, [videoUrl]);

  // Slideshow interval timer
  useEffect(() => {
    if (HERO_VERSION !== "slideshow") return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, 4500); // Soft transition every 4.5s
    return () => clearInterval(interval);
  }, [HERO_VERSION]);

  // Framer motion scroll tracking for premium cinematic parallax depth
  const { scrollY } = useScroll();
  
  // Create a spring-smoothed scroll value to eliminate any native scrolling stutter
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 70, // Slightly softer spring for a luxurious, slow-catching feel
    damping: 24,   // Well-dampened to prevent bounce oscillation
    mass: 0.4,     // Lightweight feel
    restDelta: 0.001
  });
  
  // Media translates downward (slower than scroll) to sink "behind" the viewport
  const yParallax = useTransform(smoothScrollY, [0, 1000], [0, 260]);
  
  // Immersive slight expansion zoom as user scrolls down
  const scaleParallax = useTransform(smoothScrollY, [0, 1000], [1, 1.12]);
  
  // Fade out media opacity slightly to dissolve it as it sinks
  const mediaOpacity = useTransform(smoothScrollY, [0, 800], [1, 0.35]);
  
  // Gradually darken the background to solid black to merge cleanly with the next section
  const overlayOpacity = useTransform(smoothScrollY, [0, 800], [0, 0.85]);

  // Floating text content parallax layers - text lifts up and fades out
  const contentY = useTransform(smoothScrollY, [0, 800], [0, -100]);
  const contentOpacity = useTransform(smoothScrollY, [0, 600], [1, 0]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center animate-none"
    >
      {/* Parallax Media Container */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] left-0 right-0 origin-center"
        style={{ y: yParallax, scale: scaleParallax, opacity: mediaOpacity }}
      >
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black z-10 animate-none" />

        {HERO_VERSION === "video" ? (
          <>
            {/* Cinematic loop video with poster fallback */}
            <video
              key={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              src={videoUrl}
              poster={heroPoster}
              onCanPlay={() => setVideoLoaded(true)}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? "opacity-75" : "opacity-0"
              }`}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Constant background image poster when video is offline or loading */}
            <img
              src={heroPoster}
              alt="7 Lenz Wedding Poster"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? "opacity-0" : "opacity-75"
              }`}
              referrerPolicy="no-referrer"
            />
          </>
        ) : (
          /* Elegant Slideshow Cross-fade transition */
          <div className="absolute inset-0 w-full h-full">
            {HERO_SLIDESHOW_IMAGES.map((imgUrl, index) => (
              <motion.img
                key={imgUrl}
                src={imgUrl}
                alt={`Hero Slideshow ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlideIndex ? 0.75 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Dynamic black transition overlay to sink media seamlessly into next section background */}
      <motion.div 
        className="absolute inset-0 bg-black z-10 pointer-events-none animate-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content Area - Main stable layout with floating lift parallax */}
      <motion.div 
        className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center mt-12"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Subtle Tagline */}
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-amber-500 block mb-5">
            {renderMagicalText("Where Every Moment Finds Its Forever", 0.1)}
          </span>

          {/* Majestic Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-extralight text-stone-100 leading-[1.25] tracking-wide mb-8">
            <span className="block mb-2">
              {renderMagicalText("Some Moments", 0.4)}
            </span>
            <span className="relative inline-block pb-1">
              <span className="italic font-light">
                {renderMagicalText("Deserve Forever", 0.8)}
              </span>
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent origin-center shadow-[0_0_10px_rgba(245,158,11,0.6)]"
              />
            </span>
          </h1>

          {/* Narrative description */}
          <p className="font-sans text-xs sm:text-sm md:text-base font-light tracking-wide text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every wedding is a story woven with love, family, laughter, happy tears,
and traditions passed through generations. We preserve those moments
with honesty, artistry, and care so you can relive them for a lifetime.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => handleScrollTo("booking")}
              className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-stone-50 font-sans text-xs font-semibold uppercase tracking-[0.2em] rounded-sm shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
             Reserve Your Date
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => handleScrollTo("work")}
              className="w-full sm:w-auto px-8 py-4 border border-stone-400 hover:border-amber-500 text-stone-100 hover:text-amber-500 font-sans text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            >
              View Our Stories
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
