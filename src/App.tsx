import { useState, useEffect } from "react";
import ElegantLoader from "./components/ElegantLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import OurWork from "./components/OurWork";
import FAQ from "./components/FAQ";
import BookingForm from "./components/BookingForm";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Theme state: default to light theme (white) or saved localStorage value
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("7lenz-theme");
    if (saved) {
      return saved === "dark";
    }
    return false; // Default to light theme (white) for a bright, clean initial presentation
  });

  // Sync dark class on document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("7lenz-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("7lenz-theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      {/* Elegant Loader curtain */}
      <ElegantLoader onComplete={() => setLoading(false)} />

      {/* Main App Layout */}
      {!loading && (
        <div 
          id="app-root-container"
          className="min-h-screen bg-white dark:bg-black text-stone-900 dark:text-stone-100 font-sans theme-transition selection:bg-amber-500/25 relative"
        >
          {/* Header Navbar */}
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Main Cinematic Sections */}
          <main id="main-content">
            {/* 1. Full-Viewport landscape hero */}
            <Hero />

            {/* 2. Editorial About Section with stats */}
            <About />

            {/* 3. Curved/staggered Service listings */}
            <Services />

            {/* 4. Categorized portfolio masonry grid with lightbox/player */}
            <OurWork />

            {/* 5. Guided consultation planner form */}
            <BookingForm />

            {/* 7. Comprehensive FAQ listings */}
            <FAQ />

            {/* 8. Split map and contact info */}
            <ContactSection />
          </main>

          {/* Clean minimal footer */}
          <Footer />

          {/* Floating actions */}
          <FloatingWhatsApp />
        </div>
      )}
    </>
  );
}
