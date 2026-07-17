import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioItems } from "../data";
import { Play, X, ChevronLeft, ChevronRight, Eye, Plus, Film, Loader2 } from "lucide-react";
import { PortfolioItem } from "../types";

export default function OurWork() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [dynamicItems, setDynamicItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Custom states for Story Lightbox
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  // Tabs container reference for scroll buttons
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/cloudinary/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.configured && Array.isArray(data.items) && data.items.length > 0) {
            setDynamicItems(data.items);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load dynamic Cloudinary gallery:", err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const itemsToUse = dynamicItems.length > 0 ? dynamicItems : portfolioItems;

  // Process items to guarantee any video item is sorted to the front of the gallery and the thumbnail represents the video itself
  const processedItems = itemsToUse.map(item => {
    let newItem = { ...item };
    if (newItem.gallery && newItem.gallery.length > 0) {
      const videoItems = newItem.gallery.filter(g => g.type === "video");
      const imageItems = newItem.gallery.filter(g => g.type !== "video");
      if (videoItems.length > 0) {
        newItem.gallery = [...videoItems, ...imageItems];
        
        // Use the first video's generated .jpg frame as the card's thumbnail
        const primaryVideoUrl = videoItems[0].url;
        if (primaryVideoUrl && primaryVideoUrl.includes("cloudinary.com")) {
          newItem.mediaUrl = primaryVideoUrl.replace(/\.(mp4|webm|ogg|mov|m4v)$/i, ".jpg");
        } else if (newItem.videoEmbedId && newItem.videoEmbedId.includes("cloudinary.com")) {
          newItem.mediaUrl = newItem.videoEmbedId.replace(/\.(mp4|webm|ogg|mov|m4v)$/i, ".jpg");
        }
      }
    } else if (newItem.mediaType === "video" || newItem.videoEmbedId) {
      if (newItem.videoEmbedId && newItem.videoEmbedId.includes("cloudinary.com")) {
        newItem.mediaUrl = newItem.videoEmbedId.replace(/\.(mp4|webm|ogg|mov|m4v)$/i, ".jpg");
      }
    }
    return newItem;
  });

  const scrollTabsLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollTabsRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  // Categories list - aligned with services + customized "Videos" filter
  const categories = [
    "All", 
    "Weddings", 
    "Films", 
    "Pre-Wedding", 
    "Newborn & Family", 
    "Portraits", 
    "Events", 
    "Videos"
  ];

  // Filter items based on selected category
  const filteredItems = activeCategory === "All" 
    ? processedItems 
    : activeCategory === "Videos"
      ? processedItems.filter(item => item.mediaType === "video" || item.gallery?.some(g => g.type === "video"))
      : processedItems.filter(item => item.category === activeCategory);

  // Keyboard navigation for active story gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeStoryIndex === null) return;
      
      const story = filteredItems[activeStoryIndex];
      const galleryLength = story?.gallery?.length || 0;
      if (galleryLength === 0) return;

      if (e.key === "Escape") {
        closeStoryLightbox();
      } else if (e.key === "ArrowRight") {
        setActiveMediaIndex((prev) => (prev < galleryLength - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : galleryLength - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStoryIndex, filteredItems]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setActiveMediaIndex(0);
  };

  const closeStoryLightbox = () => {
    setActiveStoryIndex(null);
    setActiveMediaIndex(0);
  };

  // Get active story and media details
  const activeStory = activeStoryIndex !== null ? filteredItems[activeStoryIndex] : null;
  const activeMedia = activeStory && activeStory.gallery ? activeStory.gallery[activeMediaIndex] : null;

  return (
    <section 
      id="work" 
      className="py-14 md:py-18 bg-white dark:bg-black text-stone-800 dark:text-stone-200 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 block mb-3 font-semibold">
              Selected Portfolios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-stone-900 dark:text-stone-50 mb-4">
              Our Work
            </h2>
            <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-stone-500 dark:text-stone-400">
              A carefully curated, low-density collection of emotional wedding ceremonies, classic portrait photography, and widescreen cinema film stills.
            </p>
          </div>

          {/* Filtering Tabs with interactive subtle scroll buttons */}
          <div className="relative flex items-center w-full md:max-w-xl lg:max-w-2xl bg-stone-50/50 dark:bg-zinc-900/10 p-1 sm:p-1.5 rounded-full border border-stone-100 dark:border-zinc-900">
            {/* Left Scroll Button */}
            <button
              onClick={scrollTabsLeft}
              className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-all cursor-pointer select-none focus:outline-none flex-shrink-0"
              aria-label="Scroll Categories Left"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={tabsContainerRef}
              className="overflow-x-auto scrollbar-none flex flex-1 scroll-smooth px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-1 pb-0.5 w-max">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      closeStoryLightbox();
                    }}
                    className={`px-3.5 py-1.5 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                      activeCategory === cat 
                        ? "text-amber-600 dark:text-amber-500 font-bold" 
                        : "text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-600 dark:bg-amber-500" 
                        layoutId="activeCategoryBorder"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Scroll Button with subtle guide pulse */}
            <button
              onClick={scrollTabsRight}
              className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-all cursor-pointer select-none focus:outline-none flex-shrink-0 flex items-center justify-center"
              aria-label="Scroll Categories Right"
            >
              <ChevronRight size={14} className="text-amber-500 dark:text-amber-400" />
            </button>
          </div>
        </div>

        {/* Masonry Portfolio Grid - Adjusted for at least 3 cards in a row on desktop for a wider, bigger view */}
        <motion.div 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const galleryLength = item.gallery?.length || 0;
              const hasVideo = item.mediaType === "video" || item.gallery?.some(g => g.type === "video");

              return (
                <motion.div
                  key={item.id}
                  className="break-inside-avoid bg-stone-50 dark:bg-stone-950 border border-stone-200/40 dark:border-stone-800/40 rounded-sm overflow-hidden group hover:shadow-md hover:border-stone-300 dark:hover:border-stone-800 transition-all duration-500 relative flex flex-col cursor-pointer max-w-[420px] sm:max-w-none mx-auto w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openStory(index)}
                >
                  {/* Media Content with premium aspect ratios */}
                  <div className={`relative overflow-hidden w-full ${
                    item.aspectRatio === "16:9" ? "aspect-video" :
                    item.aspectRatio === "4:3" ? "aspect-[4/3]" :
                    item.aspectRatio === "1:1" ? "aspect-square" : "aspect-[3/4]"
                  }`}>
                    {hasVideo ? (
                      <video
                        src={item.videoEmbedId || item.gallery?.find(g => g.type === "video")?.url}
                        poster={item.mediaUrl}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out filter grayscale-[30%] dark:grayscale-[40%] group-hover:grayscale-0"
                        preload="metadata"
                        muted
                        playsInline
                        loop
                        onMouseEnter={(e) => {
                          e.currentTarget.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                        }}
                      />
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out filter grayscale-[30%] dark:grayscale-[40%] group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Premium Specific Overlays */}
                    {hasVideo ? (
                      /* Video overlay: persistent highly-visible elegant play button with non-autoplay indicator */
                      <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-stone-950/30 transition-colors duration-500 flex flex-col items-center justify-center text-center">
                        <div className="w-11 h-11 rounded-full bg-stone-950/40 backdrop-blur-md border border-stone-50/20 flex items-center justify-center text-stone-50 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                          <Play size={18} className="ml-1" />
                        </div>
                      </div>
                    ) : (
                      /* Image overlay: View More reveals beautifully on hover */
                      <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/60 transition-all duration-500 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100">
                        <div className="w-11 h-11 rounded-full bg-stone-950/40 backdrop-blur-md border border-stone-50/20 flex items-center justify-center text-stone-50 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                          <Eye size={13} className="text-stone-50" />
                        </div>
                        <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-stone-50 mt-3 font-semibold">
                          View More
                        </span>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty portfolio category fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-stone-300 dark:border-stone-800 rounded-sm">
            <p className="font-serif text-stone-500 dark:text-stone-400">No projects added under this folder yet.</p>
          </div>
        )}

      </div>

      {/* Elegant Multi-Media Story Lightbox */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            className="fixed inset-0 z-50 bg-stone-950/98 backdrop-blur-xl flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStoryLightbox}
          >
            {/* Header Bar */}
            <div className="p-6 flex items-center justify-between border-b border-stone-900/60 bg-gradient-to-b from-stone-950 to-transparent">
              <div className="max-w-2xl text-left" onClick={(e) => e.stopPropagation()}>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-500">
                  {activeStory.category} · {activeStory.location}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-light text-stone-100 tracking-wide mt-1">
                  {activeStory.coupleName ? `${activeStory.coupleName} — ` : ""}{activeStory.title}
                </h3>
              </div>

              <button
                onClick={closeStoryLightbox}
                className="p-3 text-stone-400 hover:text-stone-50 rounded-full hover:bg-stone-900/80 transition-all duration-300 cursor-pointer focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Media Viewer Row */}
            <div className="flex-1 flex items-center justify-between px-4 sm:px-8 relative">
              {/* Left Navigate */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const len = activeStory.gallery?.length || 0;
                  if (len > 0) {
                    setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : len - 1));
                  }
                }}
                className="hidden sm:flex z-10 p-3 bg-stone-900/40 hover:bg-stone-900/80 text-stone-400 hover:text-stone-50 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Media Stage */}
              <div 
                className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto h-[60vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMediaIndex}
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeMedia?.type === "video" ? (
                      <div className="relative w-full max-h-full aspect-[16/9] max-w-3xl rounded-sm overflow-hidden border border-stone-800 shadow-2xl bg-black">
                        <video
                          src={activeMedia.url}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <img
                        src={activeMedia?.url}
                        alt={activeMedia?.caption || activeStory.title}
                        className="max-w-full max-h-full object-contain rounded-xs border border-stone-900 shadow-2xl"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Navigate */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const len = activeStory.gallery?.length || 0;
                  if (len > 0) {
                    setActiveMediaIndex((prev) => (prev < len - 1 ? prev + 1 : 0));
                  }
                }}
                className="hidden sm:flex z-10 p-3 bg-stone-900/40 hover:bg-stone-900/80 text-stone-400 hover:text-stone-50 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Footer Navigation & Thumbnails */}
            <div 
              className="p-6 bg-gradient-to-t from-stone-950 to-transparent flex flex-col items-center gap-4 border-t border-stone-900/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Active Item Caption */}
              {activeMedia?.caption && (
                <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-xl text-center font-light leading-relaxed">
                  {activeMedia.caption}
                </p>
              )}

              {/* Mobile Swipe / Arrow helpers */}
              <div className="flex sm:hidden items-center gap-6 mt-1">
                <button
                  onClick={() => {
                    const len = activeStory.gallery?.length || 0;
                    if (len > 0) {
                      setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : len - 1));
                    }
                  }}
                  className="p-2 text-stone-400 hover:text-stone-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-mono text-xs text-stone-400">
                  {activeMediaIndex + 1} / {activeStory.gallery?.length || 1}
                </span>
                <button
                  onClick={() => {
                    const len = activeStory.gallery?.length || 0;
                    if (len > 0) {
                      setActiveMediaIndex((prev) => (prev < len - 1 ? prev + 1 : 0));
                    }
                  }}
                  className="p-2 text-stone-400 hover:text-stone-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Horizontal Thumbnails Strips */}
              {activeStory.gallery && activeStory.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 scrollbar-none">
                  {activeStory.gallery.map((g, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`relative flex-shrink-0 w-12 sm:w-16 aspect-square rounded-sm overflow-hidden border transition-all duration-300 ${
                        activeMediaIndex === idx 
                          ? "border-amber-500 scale-105 shadow-md shadow-amber-500/20" 
                          : "border-stone-800 hover:border-stone-600 scale-100 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {g.type === "video" ? (
                        <div className="w-full h-full bg-stone-900 flex items-center justify-center relative">
                          <Film size={12} className="text-amber-500" />
                          <div className="absolute bottom-0.5 right-0.5 bg-black/60 px-1 py-0.5 rounded-[1px] text-[6px] text-stone-300 font-mono">
                            CLIP
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={g.url} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
