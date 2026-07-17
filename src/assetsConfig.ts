/**
 * 7 Lenz - Central Cloudinary & Asset Configuration Hub
 * 
 * Simply upload your videos and images to Cloudinary, then replace the URLs below 
 * with your own Cloudinary delivery links!
 * 
 * HOW TO GET CLOUDINARY LINKS:
 * 1. Log in to your Cloudinary Dashboard.
 * 2. Upload your file (video or image) to your desired folder.
 * 3. Hover over the uploaded asset and click the "Link icon" (Copy URL) or open the Options.
 * 4. Paste the URL into the appropriate field below.
 * 
 * Structure of a Cloudinary link:
 * - Video: "https://res.cloudinary.com/<your_cloud_name>/video/upload/v.../folder/your_video.mp4"
 * - Image: "https://res.cloudinary.com/<your_cloud_name>/image/upload/v.../folder/your_image.jpg"
 */

export const ASSET_CONFIG = {
  // --- HERO SECTION ---
  // Replace this link with your uploaded Cloudinary slow-motion cinematic video!
  heroVideoUrl: "https://res.cloudinary.com/yfmkodp7/video/upload/v1784227959/AQNiJ6lF9Sm42LaPznltcySlPJk44D4jF2efG-KVNqLdFTvgegr7fx5UE8SiuB-_WbjWLrmZpd6pE7k1T4gtmy0pQBx0BddnyORkVZU_humh1o.mp4",
  
  // Replace this with your uploaded Cloudinary Hero fall-back image (shows while video loads or on mobile)
  heroPosterUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784227942/Screenshot_2026-07-16_042902_k90uyg.png",

  // --- ABOUT SECTION ---
  // Replace this with your uploaded Cloudinary BTS photographer image
  aboutImageUrl: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231648/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_inzxd6.jpg",
  
  // List mul  tiple images here to create a stunning, slow fade-in slideshow
  aboutImages: [
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231648/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_inzxd6.jpg",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231666/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_2_jd1njk.webp",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231666/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_3_yubhmo.webp",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231667/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_1_yhe6qr.webp",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231669/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_3_s0tmgc.jpg",
    "https://res.cloudinary.com/yfmkodp7/image/upload/v1784231646/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_1_s9sqv0.jpg"
  ],

  // --- PORTFOLIO & WORK ---
  // If you are saving all your images in a Cloudinary folder, you can list or update their links here
  portfolioImages: {
    work1: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784266961/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_k_2_zigfvm.jpg",
    work2: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784266949/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_5_pdjnfm.webp",
    work3: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784266953/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_1_sg5lqj.webp",
    work4: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784266915/S_t_o_r_i_e_s_f_r_o_m_7l_e_n_zBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_keralastyle_1_myim66.jpg",
    work5: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784266935/New_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphot_qw3tv4.webp",
    work6: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268392/New_click_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7le_wzeycf.webp",
    work7: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268395/New_click_%EF%B8%8FS_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7le_2_q7wcvv.webp",
    work8: "https://res.cloudinary.com/yfmkodp7/image/upload/v1784268387/S_t_o_r_i_e_s_f_r_o_m_7lenz_weddplannerBook_ur_dates_%EF%B8%8F9_6_5_6_9_6_6_8_4_8_7lenzphotography_8_p3u7id.webp",
  }
};
