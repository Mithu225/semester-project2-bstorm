const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        icon: "#E9D98F",
        common: "#434343",
        h1:'#794A4A',
      },
    },
  },
  plugins: [],
};
