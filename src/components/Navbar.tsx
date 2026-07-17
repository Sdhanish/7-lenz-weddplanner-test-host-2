import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

// Framer Motion Animation Variants for smooth luxury feeling
const drawerVariants = {
  hidden: { x: "100%", opacity: 0.9 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 280, 
      damping: 32,
      staggerChildren: 0.06,
      delayChildren: 0.15
    } 
  },
  exit: { 
    x: "100%", 
    opacity: 0.9,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 35,
      staggerChildren: 0.04,
      staggerDirection: -1
    } 
  }
};

const linkItemVariants = {
  hidden: { opacity: 0, x: 30, filter: "blur(2px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 240, 
      damping: 24 
    } 
  },
  exit: { 
    opacity: 0, 
    x: 15,
    filter: "blur(1px)",
    transition: { 
      duration: 0.2 
    } 
  }
};

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to trigger frosted-glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "work" },
    { name: "Book Your Date", id: "booking" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/70 dark:bg-black/75 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50 shadow-sm"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo - Scrolls to Top */}
          <button
            id="nav-logo-btn"
            onClick={scrollToTop}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/50 px-2 py-1 rounded cursor-pointer"
            aria-label="7 Lenz - Scroll to top"
          >
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border group-hover:border-amber-500 transition-colors duration-300 ${
              scrolled
                ? "border-stone-300 dark:border-stone-700/80"
                : "border-white/40"
            }`}>
              <span className="font-serif text-sm font-light tracking-wider text-amber-500">7L</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className={`font-serif text-lg font-semibold tracking-[0.25em] uppercase group-hover:text-amber-500 transition-colors duration-300 ${
                scrolled
                  ? "text-stone-900 dark:text-stone-100"
                  : "text-white"
              }`}>
                7 Lenz
              </span>
              <span className={`font-sans text-[8px] uppercase tracking-[0.35em] mt-0.5 transition-colors duration-300 ${
                scrolled
                  ? "text-stone-500 dark:text-stone-400"
                  : "text-stone-300/80"
              }`}>
                Wedd Planner
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links - Elegantly theme-oriented lowercase serif italics */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-2 font-serif text-[15px] sm:text-[16px] italic  tracking-[0.1em]">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className={`relative px-4 py-1.5 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/50 transition-all duration-300 cursor-pointer group flex items-center justify-center hover:bg-amber-500/[0.04] dark:hover:bg-amber-500/[0.06] ${
                      scrolled
                        ? "text-stone-850 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-500"
                        : "text-white/95 hover:text-amber-400 hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.name}
                    {/* Subtle centered underline effect on hover */}
                    <span className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-amber-500 scale-x-0 transition-transform duration-300 origin-center group-hover:scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className={`h-4 w-[1px] transition-colors duration-300 ${
              scrolled
                ? "bg-stone-300 dark:bg-stone-800"
                : "bg-white/20"
            }`} />

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className={`p-2 rounded-full border focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/50 transition-all duration-300 cursor-pointer ${
                scrolled
                  ? "border-stone-200 dark:border-stone-800 text-stone-750 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-500 hover:border-amber-500 dark:hover:border-amber-500"
                  : "border-white/25 text-white hover:text-amber-400 hover:border-white/50 hover:bg-white/5"
              }`}
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Mobile Actions: Menu + Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-full border focus:outline-none cursor-pointer transition-all duration-300 ${
                scrolled
                  ? "border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 hover:border-amber-500"
                  : "border-white/25 text-white hover:text-amber-400 hover:border-white/50 hover:bg-white/5"
              }`}
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/50 cursor-pointer transition-colors duration-300 ${
                scrolled
                  ? "text-stone-900 dark:text-stone-100 hover:text-amber-500"
                  : "text-white hover:text-amber-400"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer (Smoothly Animated, High-contrast z-50 overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            className="fixed inset-0 z-50 lg:hidden bg-stone-950/40 dark:bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-stone-950 p-6 shadow-2xl flex flex-col justify-between z-50"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking drawer content
            >
              <div>
                {/* Header Row: Logo & Close Actions */}
                <div className="flex items-center justify-between pb-6 border-b border-stone-100 dark:border-neutral-900">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full border border-amber-500/40">
                      <span className="font-serif text-xs font-light tracking-wider text-amber-500">7L</span>
                    </div>
                    <span className="font-serif text-sm font-light tracking-[0.15em] uppercase text-stone-900 dark:text-stone-100">
                      7 Lenz
                    </span>
                  </div>
                  
                  {/* Actions inside drawer */}
                  <div className="flex items-center gap-2">
                    {/* Theme toggle inside drawer */}
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full border border-stone-200 dark:border-neutral-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-neutral-900 cursor-pointer focus:outline-none"
                      aria-label="Toggle theme"
                    >
                      {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                    {/* Close button inside drawer */}
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full border border-stone-200 dark:border-neutral-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-neutral-900 cursor-pointer focus:outline-none flex items-center justify-center"
                      aria-label="Close menu"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* Navigation Links with custom luxury staggered animations and hover elements */}
                <motion.ul className="flex flex-col gap-5 text-stone-850 dark:text-stone-100 mt-10">
                  {navLinks.map((link) => (
                    <motion.li 
                      key={link.id}
                      variants={linkItemVariants}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <button
                        onClick={() => handleScrollTo(link.id)}
                        className="text-left w-full font-serif text-[22px] italic tracking-[0.06em] text-stone-850 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-500 py-1 cursor-pointer transition-colors duration-300 flex items-center justify-between group"
                      >
                        <span>{link.name}</span>
                        {/* Subtle decorative dot indicator */}
                        <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2" />
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Bottom Footer inside drawer with clean styling */}
              <div className="flex flex-col gap-3 border-t border-stone-100 dark:border-neutral-900 pt-6">
                <p className="font-serif text-[10px] tracking-[0.15em] text-amber-500 uppercase">
                  7 Lenz Studio
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Pathanamthitta, Kerala, India
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
