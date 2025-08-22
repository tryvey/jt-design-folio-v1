import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/content/**/*.md"
    ],
    darkMode: 'class', // Enable dark mode with class strategy
    plugins: [typography],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                sansBold: ["Inter", "sans-serif"],
                serif: ["Playfair Display", "serif"],
                display: ["Playfair Display", "serif"],
                headline: ["Mozilla Headline", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
            },
            colors: {
                neutral: {
                    950: '#000000', // Pure black
                    900: '#171717',
                    800: '#262626',
                },
            },
        },
    },
};