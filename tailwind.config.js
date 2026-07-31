/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5500',     // Papaya Orange (Lando style)
          darkBg: '#050506',     // Extreme pitch-black background
          darkCard: '#0F0F11',   // Carbon card background
          darkBorder: '#1F1F24', // Dark border details
          mutedText: '#A3A3A3',   // Soft silver-grey body text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
