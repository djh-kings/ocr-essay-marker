/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VisuLearn Design System Colors
        primary: '#0A3D62',      // Deep Blue
        secondary: '#D0D3D4',    // Light Grey
        accent: '#F5A623',       // Vivid Orange
        background: '#F4F6F8',   // Off-White
        'text-body': '#333333',  // Charcoal
        'text-muted': '#888888', // Medium Grey
        success: '#2ECC71',      // Green
        warning: '#F1C40F',      // Yellow
        error: '#E74C3C',        // Red
        'code-bg': '#0D202F',    // Dark Blue
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      boxShadow: {
        'visulearn': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'visulearn-sm': '0 2px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
