import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/content/**/*.md"
    ],
    plugins: [typography],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
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