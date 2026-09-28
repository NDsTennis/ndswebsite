import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { locales } from "@/content/types";

const routes = ["", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.siteUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );
}
