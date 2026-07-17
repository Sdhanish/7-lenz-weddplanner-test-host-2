import { 
  ServiceCategory, 
  ServiceDetail, 
  PortfolioItem, 
  WhyChooseUsItem, 
  FAQItem, 
  TestimonialItem, 
  BusinessConfig 
} from "./types";
import { ASSET_CONFIG } from "./assetsConfig";

export const businessConfig: BusinessConfig = {
  name: "7 Lenz Wedd Planner",
  tagline: "Crafting Timeless Memories Through Art & Emotion",
  description: "7 Lenz documents weddings, celebrations, and personal milestones through refined photography, cinematic filmmaking, considered editing, and calm client-first production.",
  foundedYear: 2018,
  phone: "+91 7909122902",
  email: "sdhanish92@gmail.com",
  whatsappNumber: "917909122902", // Country code 91 followed by number
  instagramUrl: "https://instagram.com/7_lenz_wed_planner",
  location: {
    address: "7 Lenz Studio, Near Ring Road Junction",
    city: "Pathanamthitta",
    state: "Kerala",
    country: "India",
    mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126046.06208573646!2d76.71263590483863!3d9.266205938883204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0614001bd27d21%3A0xc68d6ff4737d6e4a!2sPathanamthitta%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  stats: [
    { value: "8+", label: "Years of Storytelling" },
    { value: "200+", label: "Weddings Celebrated" },
    { value: "500+", label: "Happy Families" },
    { value: "10,000+", label: "Memories Preserved" }
  ]
};

export const servicesList: ServiceDetail[] = [
  {
    id: "wedding-photo",
    category: ServiceCategory.WEDDING_PHOTO,
    title: "Luxury Wedding Photography",
    shortDescription: "A sophisticated blend of traditional, fine-art portraiture and modern, candid photojournalism to document your legacy.",
    features: [
      "Traditional & Candid coverage by award-winning photographers",
      "Full-day, multi-camera raw capturing with modern gear",
      "Signature fine-art portraits of the couple, bride, and groom",
      "High-resolution color-graded digital gallery delivery"
    ],
    duration: "Full-day & Multi-day options",
    deliverables: ["600+ fully-edited high-res images", "Online private gallery", "Hand-crafted heirloom album options"]
  },
  {
    id: "wedding-film",
    category: ServiceCategory.WEDDING_FILM,
    title: "Cinematic Wedding Films",
    shortDescription: "Visual poetry. We craft emotional films, trailers, and teasers that feel like real cinema with professional audio storytelling.",
    features: [
      "4K Cinematic videography with multi-angle coverage",
      "High-fidelity professional audio capturing for vows and ambient sound",
      "Aerial drone videography for breathtaking destination coverage",
      "Same-day-edit teaser option for reception premiere"
    ],
    duration: "Full-day & Multi-day options",
    deliverables: ["3-5 min Cinematic Trailer", "20-30 min Extended Documentary Film", "Instagram Reels-friendly Teaser"]
  },
  {
    id: "pre-wedding",
    category: ServiceCategory.PRE_WEDDING,
    title: "Pre-Wedding & Couple Shoots",
    shortDescription: "An intimate, tailored session at scenic, serene destinations to tell your unique pre-wedding story in high style.",
    features: [
      "Custom concept consultation and mood boarding",
      "Destination scouting in Kerala (Backwaters, Hills, Tea plantations)",
      "Atmospheric couple portraits and cinematic videos",
      "Save-the-Date video trailers and digital designs"
    ],
    duration: "4 - 8 Hours session",
    deliverables: ["50+ edited portrait frames", "1-2 min Cinematic Save-the-Date Trailer"]
  },
  {
    id: "newborn-family",
    category: ServiceCategory.NEWBORN_FAMILY,
    title: "Newborn, Kids & Family",
    shortDescription: "Quiet, gentle, safe milestone portraiture. Preserving your family's growing chapters with natural, warm art direction.",
    features: [
      "Safe and cozy newborn studio and home sessions",
      "Maternity and elegant mother-to-be portraits",
      "Creative milestone sessions for kids and families",
      "Natural lighting and comfortable, unhurried pacing"
    ],
    duration: "2 - 3 Hours session",
    deliverables: ["30+ high-end edited family photos", "Printed custom canvas art options"]
  },
  {
    id: "portfolio",
    category: ServiceCategory.PORTFOLIO,
    title: "Portfolio & Personal Branding",
    shortDescription: "Sophisticated personal branding and high-fashion model portfolios for professionals and creators looking for premium impact.",
    features: [
      "High-fashion and model portfolio sessions",
      "Professional headshots and corporate branding portraits",
      "Editorial style storytelling with precise studio/natural lighting",
      "Wardrobe and pose guidance by expert directors"
    ],
    duration: "3 - 5 Hours session",
    deliverables: ["20+ premium retouched branding master portraits", "Commercial licensing"]
  },
  {
    id: "events",
    category: ServiceCategory.EVENTS,
    title: "Baptism, Birthdays & Celebrations",
    shortDescription: "Full event coverage from sacred ceremonies to high-energy birthday milestones, engagements, Haldi, and receptions.",
    features: [
      "Sacred ceremony coverage (Baptism, Holy Communion, Nikkah)",
      "Festive event capturing (Haldi, Mehendi, Sangeet, Receptions)",
      "Comprehensive documentary coverage of guest interactions",
      "Vibrant, energetic editing that preserves original colors"
    ],
    duration: "Hourly and Full-event structures",
    deliverables: ["150+ fully graded ceremony/event digital frames", "Highlight video reels"]
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "work-1",
    category: "Weddings",
    title: "Golden Hour Houseboat Serenade",
    coupleName: "Anjali & Rahul",
    location: "Alappuzha Backwaters, Kerala",
    mediaType: "mixed",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784273398/Screenshot_2026-07-17_125923_kvujns.png",
    videoEmbedId: "https://res.cloudinary.com/yfmkodp7/video/upload/v1784273255/AQPkxWxPTGwyTtSQ6tyzjgMQiHSreFbeS9IugCYQV0IUeo3d0z6w5FPvDziMXEO-KJMGUGIOZNEzkOQeXa6U612IaYZ7t7fPK3r7fjU_r1fhin.mp4",
    aspectRatio: "16:9",
    caption: "A luxury editorial portrait capturing Anjali and Rahul on a hand-carved heritage houseboat, enveloped in the warm embrace of an Alappuzha sunset.",
    gallery: [
      { type: "video", url: "https://res.cloudinary.com/yfmkodp7/video/upload/v1784273255/AQPkxWxPTGwyTtSQ6tyzjgMQiHSreFbeS9IugCYQV0IUeo3d0z6w5FPvDziMXEO-KJMGUGIOZNEzkOQeXa6U612IaYZ7t7fPK3r7fjU_r1fhin.mp4", caption: "Cinematic Highlight: Smooth gimbal movement following the happy couple." },
    ]
  },
  {
    id: "work-2",
    category: "Portraits",
    title: "Artist Photoshoot",
    coupleName: "Swasika ",
    location: "Pathanamthitta, Kerala",
    mediaType: "image",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268341/S_t_o_r_i_e_s_f_r_o_m_7l_e_n_zBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_keralastyle_imkf2o.jpg",
    aspectRatio: "3:4",
    caption: "Fine-art bridal portraiture capturing Meera in traditional temple jewelry and handwoven Kasavu silk, reflecting quiet anticipation before her vows.",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268341/S_t_o_r_i_e_s_f_r_o_m_7l_e_n_zBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_keralastyle_imkf2o.jpg", caption: "Heirloom jewelry details under warm editorial studio lighting." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268338/S_t_o_r_i_e_s_f_r_o_m_7l_e_n_zBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_keralastyle_1_tnmyaj.jpg", caption: "Traditional Kasavu wedding wear showcase." }
    ]
  },
  {
    id: "work-3",
    category: "Films",
    title: "Misty Trails of Munnar",
    coupleName: "Divya & Thomas",
    location: "Munnar Tea Estates, Kerala",
    mediaType: "video",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784227942/Screenshot_2026-07-16_042902_k90uyg.png",
    videoEmbedId: "https://res.cloudinary.com/yfmkodp7/video/upload/v1784273674/AQNUhiB4b7TPmkH82-MSJ7qKUA8Z2eJnnW5E08l8qI9ZKHeVtJyBQyekK-dLlKNhfLEUi_5b9l7zW8ztcwA9VUooAuHzIVQaA5rTHIg_vfzevm.mp4",
    aspectRatio: "16:9",
    caption: "Widescreen frame from our signature 4K wedding trailer, detailing Divya and Thomas walking through misty, emerald-green hills.",
    gallery: [
      { type: "video", url: "https://res.cloudinary.com/yfmkodp7/video/upload/v1784273674/AQNUhiB4b7TPmkH82-MSJ7qKUA8Z2eJnnW5E08l8qI9ZKHeVtJyBQyekK-dLlKNhfLEUi_5b9l7zW8ztcwA9VUooAuHzIVQaA5rTHIg_vfzevm.mp4", caption: "The Cinematic Trailer - Pure high-dynamic 4K footage." },
    ]
  },
  {
    id: "work-4",
    category: "Events",
    title: "Candid Grace of Haldi Petals",
    coupleName: "Riya & Arjun",
    location: "Kochi, Kerala",
    mediaType: "mixed",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784227942/Screenshot_2026-07-16_042902_k90uyg.png",
    videoEmbedId: ASSET_CONFIG.heroVideoUrl,
    aspectRatio: "4:3",
    caption: "Documentary-style capturing of pure laughter as friends and family shower flower petals over the bride and groom during their Haldi ceremony.",
    gallery: [
      { type: "video", url: ASSET_CONFIG.heroVideoUrl, caption: "Slow-motion Haldi highlights trailer edit." }
    ]
  },
  {
    id: "work-5",
    category: "Pre-Wedding",
    title: "The Backwater Whisper",
    coupleName: "Sana & Zubin",
    location: "Kumarakom, Kerala",
    mediaType: "image",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268217/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_11_wucxmb.webp",
    aspectRatio: "3:4",
    caption: "An intimate romantic pre-wedding session capturing Sana and Zubin in soft morning haze, surrounded by native palms.",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268217/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_11_wucxmb.webp", caption: "Pre-wedding portrait under towering Kumarakom palms." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268220/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_12_bp6xw4.webp", caption: "Pre-wedding portrait under towering Kumarakom palms." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268214/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_14_jfuzyy.webp", caption: "Couple portrait at the wooden bridge jetty during dawn." }
    ]
  },
  {
    id: "work-6",
    category: "Weddings",
    title: "Hindhu Wedding",
    coupleName: "Arjun & Swathy",
    location: "Ambalapuzha, Pathanamthitta",
    mediaType: "image",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268371/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_3_b2vuhw.webp",
    aspectRatio: "4:3",
    caption: "A majestic cathedral ceremony capturing the solemn vows, delicate white veil details, and the timeless exchange of rings.",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268371/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_3_b2vuhw.webp", caption: "Grand wide angle of the cathedral altar and exchange of vows." },
    ]
  },
  {
    id: "work-7",
    category: "Newborn & Family",
    title: "Cozy Family Milestones",
    coupleName: "Baby",
    location: "Pathanamthitta Studio, Kerala",
    mediaType: "image",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268269/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_qpbjqm.webp",
    aspectRatio: "16:9",
    caption: "Preserving your family's growing chapters with safe, gentle, and warm art direction.",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268269/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_qpbjqm.webp", caption: "Warm embrace of baby and mother." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268267/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_1_ugydcs.webp", caption: "Sweet milestone baby laughter." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268265/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_2_doyo6i.webp", caption: "Sweet milestone baby laughter." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268263/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_3_rjxui4.webp", caption: "Sweet milestone baby laughter." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268260/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_4_ehtuah.webp", caption: "Sweet milestone baby laughter." }
    ]
  },
  {
    id: "work-8",
    category: "Events",
    title: "Vows and Golden Garlands",
    coupleName: "Nikhil & Neha ",
    location: "Guruvayur Temple, Thrissur",
    mediaType: "image",
    mediaUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268387/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_8_p3u7id.webp",
    aspectRatio: "1:1",
    caption: "Candid emotional expressions captured in high-detail as the couple unites in traditional Hindu ceremony amid golden jasmine garlands.",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268387/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_8_p3u7id.webp", caption: "Garland exchange ceremony." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268364/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_6_enuqvt.webp", caption: "Grand mandap crowd celebratory cheering." },
      { type: "image", url: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268359/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_10_m8rfez.webp" },
    ]
  }
];

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: "storytelling",
    title: "Artistic Storytelling",
    description: "We don't just ask you to smile. We document raw emotion, candid glances, and the quiet in-between memories that represent who you genuinely are."
  },
  {
    id: "experience",
    title: "Expertise & Intuition",
    description: "With 8+ years and over 200 weddings, our team navigates any lighting, traditional ceremony flow, or spontaneous moment with calm professionalism."
  },
  {
    id: "editing",
    title: "Considered Post-Production",
    description: "Every frame undergoes bespoke fine-art color grading. We reject cheap filters, opting for timeless, rich tones that remain classic for decades."
  },
  {
    id: "technology",
    title: "Cinematic Grade Tech",
    description: "We employ professional mirrorless bodies, high-speed primes, DJI drone systems, and 32-bit float audio recorders to ensure flawless 4K output."
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    clientName: "Anjali & Rahul S.",
    location: "Kochi, Kerala",
    quote: "7 Lenz captured our wedding in Alappuzha like an absolute fairytale. Their team was incredibly calm and polite. The cinematic film they made moved us to tears, capturing small details we missed ourselves!",
    category: "Luxury Wedding"
  },
  {
    id: "test-2",
    clientName: "Dr. Divya & Thomas P.",
    location: "Pathanamthitta",
    quote: "We hate posing, but their photographers made us feel completely relaxed. The Munnar pre-wedding shoot was an absolute blast. They are the most professional team in Kerala wedding photography, without a doubt.",
    category: "Destination Wedding"
  },
  {
    id: "test-3",
    clientName: "Riya & Arjun K.",
    location: "Thiruvananthapuram",
    quote: "From our Haldi to the reception, the coverage was immaculate. The same-day edit trailer played at the reception was the highlight of the event! Guests are still talking about the editing quality.",
    category: "Celebration Event"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Where is 7 Lenz based, and do you travel for destination shoots?",
    answer: "We are proudly based in Pathanamthitta, Kerala. However, our team loves traveling and documents weddings all across India, including luxury destination weddings in Goa, Rajasthan, Kumarakom, and international locations."
  },
  {
    id: "faq-2",
    question: "What packages do you offer, and can they be customized?",
    answer: "We offer tailored packages categorized into Essential, Premium, and Luxury tiers. Because every wedding is unique with varying timelines and ceremony configurations (such as multiple-day Haldi, Mehendi, and Church weddings), we specialize in crafting custom structures matching your specific schedule."
  },
  {
    id: "faq-3",
    question: "How long does it take to deliver the finished films and photographs?",
    answer: "We deliver a selected sneak peek of 25-30 edited photos within 7 days of your wedding so you can share them. The complete high-resolution color-graded digital gallery and cinematic trailer are delivered within 6 to 8 weeks, followed by heirloom physical albums."
  },
  {
    id: "faq-4",
    question: "What makes your cinematic films different?",
    answer: "We approach wedding films as cinematic documentaries. We record premium multi-track audio of your vows, speeches, and ambient laughter, weaving them into an emotional, cohesive narrative rather than just setting a montage of clips to generic background music."
  },
  {
    id: "faq-5",
    question: "How do we book 7 Lenz for our wedding date?",
    answer: "To ensure absolute dedication and artistic quality, we accept a limited number of bookings per season. You can easily begin by submitting our Booking Consultation form with your event details. We will schedule a calm visual consultation to discuss your vision, customize your proposal, and secure your dates."
  }
];
