import type { MetadataRoute } from "next";
import content from "@/data/pseo-content.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inkpreview.co";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/pt`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/de`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/it`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/tattoo-simulator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/tattoo-stencil-generator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tattoo-cover-up-design`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/tattoo-ideas/hub`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // PSEO style pages (16) + placement pages (8) from new generator
  const pseoPages = Object.keys(content)
    .filter((slug) => slug !== "hub")
    .map((slug) => ({
      url: slug.startsWith("placement-")
        ? `${baseUrl}/tattoo-ideas/placement/${slug.replace("placement-", "")}`
        : `${baseUrl}/tattoo-ideas/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: slug.startsWith("placement-") ? 0.7 : 0.8,
    }));

  return [...staticPages, ...pseoPages];
}
