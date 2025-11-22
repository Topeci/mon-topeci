/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "indie-flower": ["Indie Flower", "cursive"],
        "waffle-soft": ["Waffle soft", "sans-serif"],
        "glacial-indifference": ["Glacial Indifference", "sans-serif"],
      },
    },
  },
  plugins: [],
};
