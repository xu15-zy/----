import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shiqing: { DEFAULT: "#2b5d7d", deep: "#1d4259", light: "#6f9bb3" },
        zheshi: { DEFAULT: "#9c5b3b", deep: "#7a4329", light: "#c08a6a" },
        mibai: { DEFAULT: "#f4ecda", deep: "#e8dcc0", light: "#fbf6ea" },
        zhusha: { DEFAULT: "#b23a2e", deep: "#8f2a20", light: "#d06a5f" },
        jin: { DEFAULT: "#c9a227", deep: "#a07e15", light: "#e3c75a" },
        mo: { DEFAULT: "#2b2620", deep: "#1a1611", light: "#4a4239" },
      },
      fontFamily: {
        serif: ['var(--font-serif)', "STSong", "SimSun", "serif"],
        sans: ['var(--font-sans)', "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "slow-spin": "slow-spin 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
