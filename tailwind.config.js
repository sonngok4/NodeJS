/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,css} ", "./**/**/*.ejs", "./views/user.ejs"],
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [],
};

