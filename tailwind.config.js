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
        my_light:'#eeddcc',
        my_dark:'#34251f',
      },
      fontFamily: {
        // Adding custom fonts
        Frank: [ "Frank Ruhl Libre", 'serif'],
        Lato: [ "Lato", 'serif']
      },
    },
  },
  plugins: [],
};
