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
      colors: {
        sand: "#E3DCCC",
        text: "#000000",
        bg: "#FFFFFF",
        icon: "#000000",
        muted: "#555555",

        // existing
        "card-border": "#E6E1D6",

        // new – lighter, subtle border (same tone, lower contrast)
        "border-subtle": "rgba(230, 225, 214, 0.6)",
      },
      fontFamily: {
        heading: ["System"],
        body: ["System"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
