/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'md-up': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      colors: {
        romTurquoise: {
          '50': '#effefa',
          '100': '#cafdf3',
          '200': '#95faea',
          '300': '#58f0dc',
          '400': '#40e0d0',
          '500': '#0cc0b1',
          '600': '#079a91',
          '700': '#0a7b75',
          '800': '#0d625e',
          '900': '#10514e',
          '950': '#023131',
        },
        yellowOrange: {
          '50': '#fffaed',
          '100': '#fff3d4',
          '200': '#ffe3a8',
          '300': '#ffce71',
          '400': '#ffb64d',
          '500': '#fe9311',
          '600': '#ef7707',
          '700': '#c65a08',
          '800': '#9d470f',
          '900': '#7e3b10',
          '950': '#441c06',
          
        },
      },
      
    },

  },
  
  plugins: [
    
  ],
}

