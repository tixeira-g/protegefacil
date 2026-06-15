import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#15315c", soft: "#23477e", deep: "#0d213f" },
        brand: {
          blue: "#2f6fd0",
          green: "#1fa24b",
          purple: "#7a57b0",
          red: "#df3b3b",
          amber: "#e09a14",
        },
        ink: "#16203a",
        muted: "#5d6b80",
        line: "#e3e8f0",
        canvas: "#eef2f8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 44px -26px rgba(13,33,63,.4)",
        mark: "0 8px 18px -7px rgba(13,33,63,.55)",
      },
    },
  },
  plugins: [],
};

export default config;
