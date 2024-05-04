/** @type {import('tailwindcss').Config} */
export default {
  // configure the files we want to use the Tailwind CSS
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: "10rem",
    }
  },
  plugins: [],
}

