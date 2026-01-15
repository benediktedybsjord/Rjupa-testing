/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      /* Colors – from theme.ts */
      colors: {
        sand: "#E3DCCC",
        text: "#111111",
        bg: "#FFFFFF",
        icon: "#111111",
        muted: "#555555",
        card: {
          border: "#E6E1D6",
        },
      },

      /* Fonts – fallback now, Tenon later */
      fontFamily: {
        heading: ["System"],
        body: ["System"],
      },

      /* Border radius tokens */
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
