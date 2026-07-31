import type { Config } from "tailwindcss";

// In Tailwind v4, design tokens are defined via @theme in globals.css
// This config only tells Tailwind where to scan for class names
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
