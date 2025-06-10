import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "checkbox-default": 'url("/icons/icon_check-default.svg")',
        "checkbox-hover": 'url("/icons/icon_check-hover.svg")',
        "checkbox-focus": 'url("/icons/icon_check-focus.svg")',
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        "text-primary": "var(--primary)",
        "text-gray": "var(--gray)",
        "text-lightgray": "var(--lightgray)",
        "text-white": "#FFFFFF",
        "text-black": "#000000",
        "omr-green": "var(--omr-green)",
        "omr-red": "var(--omr-red)",
        "omr-blue": "var(--omr-blue)",
        "omr-purple": "var(--omr-purple)",
        "korean-color": "#008E45",
        "korean-bg-color": "#E8F3E7",
        "math-color": "#E11771",
        "math-bg-color": "#FFECEF",
        "english-color": "#0099D1",
        "english-bg-color": "#E6F5F8",
        "history-color": "#86729D",
        "history-bg-color": "#F5F1F4",
        "inquiry-color": "#86729D",
        "inquiry-bg-color": "#F5F1F4",
        // brand1: "#00A9A9",
        // brand2: "#333333",
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addComponents }: { addComponents: any }) {
      addComponents({
        ".required-label::after": {
          content: "'*'",
          color: "red",
          marginLeft: "0px",
        },
      });
    },
  ],
  safelist: [
    { pattern: /^bg-/ },
    { pattern: /^border-/ },
    { pattern: /^text-/ },
  ],
};
export default config;
