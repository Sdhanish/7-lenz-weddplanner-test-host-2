import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Instagram, Facebook } from "lucide-react";
import { businessConfig } from "../data";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "work" },
    { name: "Book Your Date", id: "booking" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-black text-stone-300 py-16 border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-12 border-b border-stone-900">
          
          {/* Column 1: Monogram & Bio */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 text-left cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-800 group-hover:border-amber-500 transition-colors">
                <span className="font-serif text-sm font-light tracking-wider text-amber-500">7L</span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-serif text-base font-light tracking-[0.2em] text-stone-100 uppercase">
                  7 Lenz
                </span>
                <span className="font-sans text-[7px] uppercase tracking-[0.3em] text-stone-500 mt-0.5">
                  Wedd Planner
                </span>
              </div>
            </a>
            <p className="font-sans text-[11px] leading-relaxed text-stone-500 font-light max-w-sm">
              Crafting timeless wedding memories and cinematic films through emotional storytelling and refined fine-art photography. Based in Pathanamthitta, capturing legacies across Kerala and beyond.
            </p>
          </div>

          {/* Column 2: Directories */}
          <div className="md:col-span-4 flex items-start pt-2">
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3.5 font-serif text-[15px] italic tracking-[0.1em] text-stone-400 w-full">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="hover:text-amber-500 hover:translate-x-1 text-left transition-all duration-300 cursor-pointer flex items-center"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact quick connect */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Studio Location
            </h4>
            <p className="font-sans text-[11px] text-stone-500 font-light leading-relaxed">
              Near Ring Road Junction,<br />
              Pathanamthitta, Kerala, India
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href={businessConfig.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-500 hover:text-[#E1306C] transition-all duration-300 transform hover:scale-110 p-2 rounded-full border border-stone-900 hover:border-[#E1306C]/40 bg-stone-950 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="https://facebook.com/7lenzweddplanner" 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-500 hover:text-[#1877F2] transition-all duration-300 transform hover:scale-110 p-2 rounded-full border border-stone-900 hover:border-[#1877F2]/40 bg-stone-950 flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a 
                href={`https://wa.me/${businessConfig.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-500 hover:text-[#25D366] transition-all duration-300 transform hover:scale-110 p-2 rounded-full border border-stone-900 hover:border-[#25D366]/40 bg-stone-950 flex items-center justify-center"
                aria-label="WhatsApp"
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

        {/* Brand Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-[12px] text-stone-600 dark:text-stone-500 tracking-wider">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-center md:text-left w-full md:w-auto">
            <span>© 2026 7 Lenz Wedd Planner. All Rights Reserved @dhanishs</span>
            <span className="hidden sm:inline text-stone-800">·</span>
            <button 
              onClick={() => setModalType("privacy")} 
              className="hover:text-amber-500 transition-colors cursor-pointer focus:outline-none"
            >
              Privacy Policy
            </button>
            <span className="text-stone-800">·</span>
            <button 
              onClick={() => setModalType("terms")} 
              className="hover:text-amber-500 transition-colors cursor-pointer focus:outline-none"
            >
              Terms & Conditions
            </button>
            <span className="text-stone-800">·</span>
            <span>Cinematic Film Studio</span>
          </div>
        </div>

      </div>

      {/* Dummy Modals Overlay */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalType(null)}
          >
            <motion.div
              className="bg-stone-900 border border-stone-800 text-stone-200 p-6 sm:p-8 rounded-sm max-w-lg w-full relative shadow-2xl overflow-y-auto max-h-[85vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-200 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {modalType === "privacy" ? (
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-amber-500 tracking-wide mb-5 uppercase">
                    Privacy Policy
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm font-light text-stone-400 leading-relaxed font-sans">
                    <p>
                      Welcome to <strong>7 Lenz Wedd Planner</strong>. We are committed to protecting your personal information and artistic privacy.
                    </p>
                    <div>
                      <h4 className="font-medium text-stone-200 mb-1">1. Information Collection</h4>
                      <p>
                        We collect minimal communication details (such as your full name, email address, phone number, and venue details) when you inquire about our wedding planning, photography, or cinematic packages.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-200 mb-1">2. Media Capture and Consent</h4>
                      <p>
                        As a premium fine-art and documentary studio, client captures (raw footage, bespoke colored portraits, and film frames) are handled with supreme confidentiality. Selected digital portraits are only shared on our physical heirloom previews and social portfolios in complete agreement with the client.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-200 mb-1">3. Third-Party Sharing</h4>
                      <p>
                        We strictly never lease, sell, or trade your contact information, event metrics, or communication history to any external commercial advertising agencies.
                      </p>
                    </div>
                    <p className="text-[10px] text-stone-500 pt-2 border-t border-stone-800/80">
                      Last Updated: July 2026. Designed for Kerala's premier wedding experiences.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-amber-500 tracking-wide mb-5 uppercase">
                    Terms & Conditions
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm font-light text-stone-400 leading-relaxed font-sans">
                    <p>
                      By accessing this portal or locking your calendar dates with <strong>7 Lenz Wedd Planner</strong>, you agree to our creative terms of service.
                    </p>
                    <div>
                      <h4 className="font-medium text-stone-200 mb-1">1. Artistic Integrity & Fine-Art Grading</h4>
                      <p>
                        7 Lenz holds final artistic authority over image composition, editorial framing, and bespoke cinematic color grading styles. We reject raw unedited file deliveries to preserve our standard.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-200 mb-1">2. Calendar Retainer</h4>
                      <p>
                        Your booking dates are fully secured only after an online or in-studio personalized consultation accompanied by a signed agreement and non-refundable retainer fee.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-200 mb-1">3. Lay-Flat Heirlooms & Digital Delivery</h4>
                      <p>
                        Our hand-bound lay-flat digital albums require digital proof approval from the clients. High-fidelity digital galleries are stored on our servers for a designated post-event period.
                      </p>
                    </div>
                    <p className="text-[10px] text-stone-500 pt-2 border-t border-stone-800/80">
                      Standard Terms applied across Kerala. Capture your legacy beautifully.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
