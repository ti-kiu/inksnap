import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FEFCF8",
        "warm-white": "#F9F6F0",
        sand: "#EDE8DF",
        charcoal: "#2D2D2D",
        stone: "#6B6560",
        sage: {
          DEFAULT: "#8FA68B",
          light: "#D4E2D1",
          dark: "#5C7A57",
        },
        terracotta: {
          DEFAULT: "#C4907A",
          light: "#F0DDD4",
        },
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", fontWeight: "400" }],
        "display-lg": ["2.5rem", { lineHeight: "1.15", fontWeight: "400" }],
        "display-md": ["2rem", { lineHeight: "1.2", fontWeight: "400" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-md": ["1.25rem", { lineHeight: "1.35", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(45,45,45,0.04), 0 1px 2px rgba(45,45,45,0.06)",
        card: "0 4px 16px rgba(45,45,45,0.06)",
        elevated: "0 8px 32px rgba(45,45,45,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
