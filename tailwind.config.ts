import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#e0e5ec",
        foreground: "#0b0b0b",
        mymuesli: {
          pink: "#f91f64",
          lightpink: "#f4b8c8",
          green: "#12504c",
          black: "#0b0b0b",
          white: "#ffffff",
        },
        primary: {
          DEFAULT: "#f91f64",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#12504c",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'sans-serif'],
        futura: ['"Futura"', '"Adobe Futura Std"', '"Trebuchet MS"', 'sans-serif'],
      },
      boxShadow: {
        'neu-flat': '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
        'neu-pressed': 'inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)',
        'neu-button': '6px 6px 10px 0 rgba(163,177,198, 0.4), -6px -6px 10px 0 rgba(255,255,255, 0.8)',
      },
      borderRadius: {
        '2xl': '24px',
        '3xl': '32px',
      }
    },
  },
  plugins: [],
};
export default config;
