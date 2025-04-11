/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "main-purple": "#635FC7",
      "main-purple-hover": "#A8A4FF",
      white: "#FFFFFF",
      black: "#000112",
      "very-dark-grey": "#1E1E1E",
      "dark-grey": "#2B2C37",
      lines: "#3E3F4E",
      "medium-grey": "#828FA3",
      "lines-light": "#E4EBFA",
      "light-grey": "#F4F7FD",
      red: "#EA5555",
      "red-hover": "#FF9898",
    },
    fontSize: {
      "heading-s": [".75rem", { fontWeight: "700" }],
      "heading-m": [".9rem", { fontWeight: "700" }],
      "heading-l": ["1.125rem", { fontWeight: "700" }],
      "heading-xl": ["1.5rem", { fontWeight: "700" }],
      "body-m": [".75rem", { fontWeight: "700" }],
      "body-l": [".8125rem", { fontWeight: "500" }],
    },
  },
  plugins: [],
}

