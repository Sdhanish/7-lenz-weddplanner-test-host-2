import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary if credentials are provided in the environment
export const hasCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log("Cloudinary configuration loaded successfully.");
} else {
  console.log("Cloudinary not configured in environment. Dynamic folders will fall back to local assets.");
}

/**
 * Fetches dynamic hero assets from Cloudinary
 */
export async function getHeroAssets() {
  if (!hasCloudinary) {
    return {
      configured: false,
      videoUrl: null,
      posterUrl: null
    };
  }

  console.log("Fetching dynamic hero assets from Cloudinary...");
  // Search specifically inside 7-lenz-weddplanner/hero-section or hero-section
  const searchResponse = await cloudinary.search
    .expression("folder:\"7-lenz-weddplanner/hero-section\" OR folder:\"7-lenz-weddplanner/hero-section/*\" OR folder:\"hero-section\"")
    .sort_by("resource_type", "asc")
    .max_results(20)
    .execute();

  const resources = searchResponse.resources || [];
  console.log(`Successfully fetched ${resources.length} hero assets from Cloudinary.`);

  let videoUrl: string | null = null;
  let posterUrl: string | null = null;

  // Find first video and first image
  const videoAsset = resources.find(r => r.resource_type === "video");
  const imageAsset = resources.find(r => r.resource_type === "image");

  if (videoAsset) {
    videoUrl = videoAsset.secure_url;
  }
  if (imageAsset) {
    posterUrl = imageAsset.secure_url;
  }

  return {
    configured: true,
    videoUrl,
    posterUrl
  };
}

// Map folder categories nicely
function getCategoryFromFolder(folderPath: string): string | null {
  const parts = folderPath.split("/");
  // Look at the root-level folder in our category path (e.g. weddings, pre-wedding, etc.)
  const categoryKey = parts[0].toLowerCase();
  
  if (categoryKey.includes("wedding") && !categoryKey.includes("pre-wedding") && !categoryKey.includes("prewedding")) {
    return "Weddings";
  }
  if (categoryKey.includes("pre-wedding") || categoryKey.includes("prewedding")) {
    return "Pre-Wedding";
  }
  if (categoryKey.includes("film") || categoryKey.includes("cinema") || categoryKey.includes("video")) {
    return "Films";
  }
  if (categoryKey.includes("portrait")) {
    return "Portraits";
  }
  if (categoryKey.includes("newborn") || categoryKey.includes("baby") || categoryKey.includes("family")) {
    return "Newborn & Family";
  }
  if (categoryKey.includes("event") || categoryKey.includes("baptism") || categoryKey.includes("birthday") || categoryKey.includes("celebration")) {
    return "Events";
  }
  
  // Dynamic category capitalize fallback
  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).replace(/[-_]/g, " ");
}

/**
 * Fetches and structures dynamic gallery from Cloudinary
 */
export async function getGalleryAssets() {
  if (!hasCloudinary) {
    return {
      configured: false,
      items: []
    };
  }

  console.log("Fetching dynamic gallery from Cloudinary...");
  
  // Let's use cloudinary's Search API to fetch all resources inside folder structures
  // We search for both image and video resource types.
  const searchResponse = await cloudinary.search
    .expression("resource_type:image OR resource_type:video")
    .sort_by("public_id", "desc")
    .max_results(500)
    .execute();

  const resources = searchResponse.resources || [];
  console.log(`Successfully fetched ${resources.length} resources from Cloudinary.`);

  if (resources.length === 0) {
    return {
      configured: true,
      items: []
    };
  }

  // Group resources by their full folder path
  const groups: { [folderPath: string]: any[] } = {};
  
  for (const r of resources) {
    const folderPath = r.folder || "";
    if (!folderPath) continue; // Skip root uploads with no folder to maintain clean structures
    
    if (!groups[folderPath]) {
      groups[folderPath] = [];
    }
    groups[folderPath].push(r);
  }

  // We map these groups into dynamic PortfolioItem objects!
  const fetchedItems: any[] = [];
  let counter = 1;

  // Process each folder group
  for (const [folderPath, assets] of Object.entries(groups)) {
    const category = getCategoryFromFolder(folderPath);
    if (!category) continue;

    const parts = folderPath.split("/");
    const isNested = parts.length > 1;

    // Determine title, coupleName, and location
    let title = "Highlights";
    let coupleName: string | undefined = undefined;
    let location = "Kerala, India";

    if (isNested) {
      // If nested, parts[1] might be something like "Anjali & Rahul - Alappuzha" or "Divya & Thomas"
      const projectFolder = parts[1];
      
      // Parse location and couple name from name if structured with hyphen e.g., "Anjali & Rahul - Alappuzha"
      if (projectFolder.includes(" - ")) {
        const [namePart, locPart] = projectFolder.split(" - ");
        coupleName = namePart.replace(/[-_]/g, " ").trim();
        location = locPart.replace(/[-_]/g, " ").trim() + ", Kerala";
        title = `${category} Celebration`;
      } else if (projectFolder.includes("-")) {
        // Replace hyphens with spaces nicely
        const cleaned = projectFolder.replace(/[-_]/g, " ").trim();
        if (cleaned.toLowerCase().includes(" and ") || cleaned.includes("&")) {
          coupleName = cleaned;
          title = `${category} Session`;
        } else {
          title = cleaned;
        }
      } else {
        // No separator, capitalized folder name
        const cleaned = projectFolder.replace(/[-_]/g, " ").trim();
        if (cleaned.length < 25 && (cleaned.includes("&") || cleaned.toLowerCase().includes(" and "))) {
          coupleName = cleaned;
          title = `${category} Story`;
        } else {
          title = cleaned;
        }
      }
    } else {
      // Root category folder itself containing items (e.g., weddings/img1.jpg)
      title = `${category} Portfolio Highlights`;
      coupleName = undefined;
      location = "Kerala, India";
    }

    // Sort assets so videos or first uploaded assets are displayed nicely
    assets.sort((a, b) => {
      if (a.resource_type === "video" && b.resource_type !== "video") return -1;
      if (a.resource_type !== "video" && b.resource_type === "video") return 1;
      return a.public_id.localeCompare(b.public_id);
    });

    // Determine mediaUrl and mediaType
    const firstAsset = assets[0];
    let coverUrl = firstAsset.secure_url;
    let coverAsset = firstAsset;
    if (firstAsset.resource_type === "video") {
      coverUrl = firstAsset.secure_url.replace(/\.[^/.]+$/, ".jpg");
    }

    // Determine aspect ratio from cover asset
    let aspectRatio = "4:3";
    if (coverAsset && coverAsset.width && coverAsset.height) {
      const ratio = coverAsset.width / coverAsset.height;
      if (ratio > 1.5) aspectRatio = "16:9";
      else if (ratio > 1.1) aspectRatio = "4:3";
      else if (ratio >= 0.95 && ratio <= 1.05) aspectRatio = "1:1";
      else aspectRatio = "3:4";
    }

    const hasVideo = assets.some(a => a.resource_type === "video");
    const hasImage = assets.some(a => a.resource_type === "image");
    let mediaType: "image" | "video" | "mixed" = "image";
    if (hasVideo && hasImage) mediaType = "mixed";
    else if (hasVideo) mediaType = "video";

    // Form gallery structures
    const gallery = assets.map((a: any) => ({
      type: a.resource_type,
      url: a.secure_url,
      caption: a.context?.custom?.caption || `${title} - Fine art frame`
    }));

    fetchedItems.push({
      id: `cloud-${counter++}-${folderPath.replace(/[^a-zA-Z0-9]/g, "-")}`,
      category,
      title,
      coupleName,
      location,
      mediaType,
      mediaUrl: coverUrl,
      aspectRatio,
      caption: `Selected premium captured moments within our ${category.toLowerCase()} portfolio folder.`,
      gallery
    });
  }

  // Sort items so projects are consistent
  fetchedItems.sort((a, b) => b.id.localeCompare(a.id));

  return {
    configured: true,
    items: fetchedItems
  };
}
