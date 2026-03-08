/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
      "./src/**/*.{html,vue,js}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6', // adjust to match site
        },

        keyframes: {
          float1: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(20px, -30px)' },
          },
          float2: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(-25px, 20px)' },
          },
          float3: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(15px, 25px)' },
          },
        },
        animation: {
          float1: 'float1 6s ease-in-out infinite',
          float2: 'float2 8s ease-in-out infinite',
          float3: 'float3 7s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }