/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#eef9ff",
          100: "#d8f1ff",
          200: "#b9e7ff",
          300: "#88d7ff",
          400: "#50bdff",
          500: "#289bfc",
          600: "#107bf1",
          700: "#0c63de",
          800: "#1050b4",
          900: "#13468e",
          950: "#112b57",
        },
        ink: "#0d1b2a",
      },
      boxShadow: {
        card: "0 4px 32px 0 rgba(16,91,224,0.10)",
        glow: "0 0 32px 4px rgba(40,155,252,0.18)",
      },
    },
  },
  plugins: [],
}
