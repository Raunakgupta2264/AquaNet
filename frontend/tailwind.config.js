/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: "#0F172A",
        aqua: "#06B6D4",
        cyan: "#22D3EE",
        cardbg: "#1E293B",
      }
    },
  },
  plugins: [],
}
