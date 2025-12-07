import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#02a145",
          50: "#e6f7ed",
          100: "#ccefdb",
          200: "#99dfb7",
          300: "#66cf93",
          400: "#33bf6f",
          500: "#02a145",
          600: "#028137",
          700: "#016129",
          800: "#01401c",
          900: "#00200e",
        },
        secondary: {
          DEFAULT: "#020ba9",
          50: "#e6e7f7",
          100: "#ccceef",
          200: "#999ddf",
          300: "#666ccf",
          400: "#333bbf",
          500: "#020ba9",
          600: "#020987",
          700: "#010765",
          800: "#010544",
          900: "#000222",
        },
        dark: {
          DEFAULT: "#000000",
          50: "#1a1a1a",
          100: "#0d0d0d",
          200: "#0a0a0a",
          300: "#080808",
          400: "#050505",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
