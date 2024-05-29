/** @type {import('tailwindcss').Config} */
export default {
  content: ["./web/template/**/*.templ"], // this is where our templates are located
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
      },
    },
  },
  plugins: [],
}
