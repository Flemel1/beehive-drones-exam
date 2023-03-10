/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#370EDC",
        yellow: "#F3C317",
        "black-50": "rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
}
