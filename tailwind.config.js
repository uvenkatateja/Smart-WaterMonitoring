/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
      },
      colors: {
        water: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "water-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "1" 
          },
          "50%": { 
            transform: "scale(1.05)", 
            opacity: "0.8" 
          },
        },
        "water-wave": {
          "0%": { 
            backgroundPosition: "0% 50%",
          },
          "100%": { 
            backgroundPosition: "100% 50%",
          },
        },
        "water-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--fill-width)" },
        },
        "slide-in": {
          "0%": { 
            transform: "translateX(-10px)",
            opacity: "0" 
          },
          "100%": { 
            transform: "translateX(0)",
            opacity: "1" 
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-small": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "water-pulse": "water-pulse 2s ease-in-out infinite",
        "water-wave": "water-wave 3s ease infinite alternate",
        "water-fill": "water-fill 1s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out",
        "bounce-small": "bounce-small 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}; 