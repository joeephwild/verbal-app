/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Inter-VariableFont_slnt": ["Inter-VariableFont_slnt"],
      },
    },
  },
  plugins: [],
};
