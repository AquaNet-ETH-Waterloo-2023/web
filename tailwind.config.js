/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#008080",
      },

      minHeight: {
        screen: ["100vh", "100svh"],
      },

      height: {
        screen: ["100vh", "100svh"],
      },
    },
  },
  plugins: [],
};
