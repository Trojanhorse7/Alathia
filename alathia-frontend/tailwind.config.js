/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        siteblack: '#131519',
        siteDimBlack: '#191d23',
        siteViolet: '#7f46f0',
        siteWhite: '#9eacc7',

        blue10: "#106EBE",
        blue20: '#2C3E50',
        blue30: "#5DADE2",

        red10: '#C0392B',
        red20: "#DA1E28",

        gold10: "#FAD000",
        
        green10: '#27AE60',
        green15: "#107C10",
        
        yellow20: "#7A6958",
        yellow10: "#dca54c",
        
        gold10: '#F4D03F',
        gold20: '#D35400',

        black10: "#231F20",
        black20: "#1C1C1C",
        black30: "#BDC3C7",
        gray10: '#7F8C8D',

        purple10: '#8E44AD',
      },
      fontFamily: {
        'Carvist': ['Carvist', 'sans-serif'],
      },
      screens: {
        md2: '1000px'
      },
      boxShadow: {
        'custom-green': '0px 10px 15px -3px #2A6F4A1F',
      },
      backgroundImage: {
        astral: "url('/src/assets/background/astral.jpg')",
        saiman: "url('/src/assets/background/saiman.jpg')",
        eoaalien: "url('/src/assets/background/eoaalien.jpg')",
        panight: "url('/src/assets/background/panight.jpg')",
        heroImg: "url('/src/assets/background/hero-img.jpg')",
        landing: "url('/src/assets/background/landing.jpg')",
      },
      keyframes: {
        wiggle: {
          "5%": {
            transform: "rotate(-5deg)"
          },
          "20%": {
            transform: "rotate(5deg)"
          },
          "40%": {
            transform: "rotate(-5deg)"
          },
          "80%": {
            transform: "rotate(5deg)"
          }
        },
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out 0.25s infinite',
        slidein: "slidein 1s ease var(--slidein-delay, 0) forwards",
        slideinX: "slideinX 1s ease-in-out var(--slideinX-delay, 0) forwards",
      },
    },
  },
  plugins: [nextui(), require("tailwind-scrollbar")],
};

