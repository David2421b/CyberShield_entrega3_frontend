import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/features/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0a0e17",
          panel: "#111827",
          card: "#1f2937",
          cyan: "#00f2fe",
          blue: "#4facfe",
          muted: "#9ca3af",
          border: "#374151",
        },
      },
      boxShadow: {
        glow: "0 0 18px rgba(0, 242, 254, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
