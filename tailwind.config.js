/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      boxShadow: {
        uni: "0 0 8px 8px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("./tailwind.scrollbar"),
  ],
};
