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
        foreground: "#2d3748",
        primary: {
          DEFAULT: "#C80050",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0f766e",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
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
