import type { MetadataRoute } from "next";
import pages from "@/data/pseo-pages.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inkpreview.co";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/tattoo-simulator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/tattoo-stencil-generator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tattoo-cover-up-design`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/tattoo-ideas`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const pseoPages = pages.map((p) => ({
    url: `${baseUrl}/tattoo-ideas/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...pseoPages];
}
