import type { MetadataRoute } from "next";

const styles = [
  "geometric", "japanese", "minimalist", "realism", "watercolor",
  "blackwork", "neo-traditional", "dotwork", "fineline", "tribal",
  "old-school", "new-school", "abstract", "biomechanical", "mandala",
  "floral", "animal", "skull", "butterfly", "rose", "dragon", "lion", "phoenix",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inksnap.ai";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/tattoo-simulator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/tattoo-stencil-generator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tattoo-cover-up-design`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tattoo-ideas/hub`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const stylePages = styles.map((style) => ({
    url: `${baseUrl}/tattoo-ideas/${style}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...stylePages];
}
