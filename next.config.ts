import type { NextConfig } from "next";

// Build estático para o GitHub Pages (vitrine, sem /api/lead — ver docs/github-pages.md).
// Ligado só pela env GITHUB_PAGES, setada no workflow de deploy. O build normal
// (dev local e Vercel) continua com o servidor completo, sem essa flag.
const paraGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = paraGithubPages ? "/Cozinhasemplastico" : "";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  cacheComponents: !paraGithubPages,
  partialPrefetching: !paraGithubPages,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(paraGithubPages
    ? {
        output: "export",
        basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
