import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f9fafb",
          dark: "#1f2937",
        },
        foreground: {
          light: "#1f2937",
          dark: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|blue|green|yellow|purple)-(50|500\/20)/,
    },
    {
      pattern: /ring-(red|blue|green|yellow|purple)-500/,
    },
  ],
} satisfies Config;
