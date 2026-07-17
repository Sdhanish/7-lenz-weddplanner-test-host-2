import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqs } from "../data";
import { Plus, Minus, ChevronDown } from "lucide-react";

export default function FAQ() {
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="py-10 md:py-12 bg-white dark:bg-black text-stone-800 dark:text-stone-200 transition-colors duration-500 overflow-hidden border-t border-stone-200/20 dark:border-stone-900"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-3 font-semibold">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-stone-900 dark:text-stone-50 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-stone-500 dark:text-stone-400">
            Answers to our most common questions regarding scheduling, planning, delivery, and travel.
          </p>
        </div>

        {/* Master Toggle Trigger */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setIsSectionExpanded(!isSectionExpanded)}
            className="px-6 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.25em] border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:text-amber-500 rounded-sm bg-stone-50/50 dark:bg-neutral-900/10 transition-all duration-300 flex items-center gap-3 cursor-pointer select-none focus:outline-none"
            aria-expanded={isSectionExpanded}
          >
            {isSectionExpanded ? "Hide FAQs" : "Explore FAQs"}
            <motion.span
              animate={{ rotate: isSectionExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={12} className="text-amber-500" />
            </motion.span>
          </button>
        </div>

        {/* Accordions */}
        <AnimatePresence initial={false}>
          {isSectionExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden space-y-4"
            >
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={faq.id}
                    className="bg-zinc-50 dark:bg-neutral-900/10 border border-stone-200/50 dark:border-stone-900 rounded-sm overflow-hidden"
                  >
                    {/* Header Toggle Trigger */}
                    <button
                      id={`faq-trigger-${index}`}
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer focus-visible:bg-stone-200/50 dark:focus-visible:bg-stone-800/50 transition-colors duration-300"
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span className="font-serif text-sm sm:text-base font-light tracking-wide text-stone-950 dark:text-stone-50 pr-4">
                        {faq.question}
                      </span>
                      <div className={`text-amber-600 dark:text-amber-500 transition-transform duration-300`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>

                    {/* Answer Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-content-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-stone-500 dark:text-stone-400 font-light border-t border-stone-200/30 dark:border-stone-800/30 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
