import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6e6efc", // Modern Indigo
          secondary: "#f59d90", // Light Rose
          accent: "#34d399", // Mint Green
          neutral: "#f4f4f5", // Light Neutral Gray
          "base-100": "#ffffff", // White Base
          info: "#80d4ff", // Light Sky Blue
          success: "#86efac", // Pale Green
          warning: "#fcd34d", // Soft Amber
          error: "#fb7185", // Soft Red
        },
      },
      "light",
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
