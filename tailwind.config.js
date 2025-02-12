/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'atyp-display': ['Atyp Display', 'sans-serif'],
        'atyp-text': ['Atyp Text', 'sans-serif'],
        'atyp-variable': ['Atyp Variable', 'sans-serif'],
      },
      blur: {
        200: '110px', // Add a custom blur value
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotate: "rotate 20s linear infinite", // Infinite rotation over 10 seconds
      },
    },
  },
  plugins: [],
}

