/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apolloBlue: "#0052CC",
        apolloLightBlue: "#0066FF",
        apolloSky: "#E6F0FF",
        medicalBg: "#F5F9FF",
        darkMedicalBg: "#0F172A",
        darkCardBg: "#1E293B",
        darkText: "#0F172A",
        slateMuted: "#64748B",
        tealAccent: "#0D9488",
        roseEmergency: "#E11D48",
        amberWarning: "#D97706"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        medical: '0 10px 30px -5px rgba(0, 82, 204, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        medicalHover: '0 20px 40px -10px rgba(0, 82, 204, 0.15), 0 8px 10px -4px rgba(0, 0, 0, 0.03)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
      }
    },
  },
  plugins: [],
}
