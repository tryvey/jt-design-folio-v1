const typography = require('@tailwindcss/typography');

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/content/**/*.md"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            colors: {
                neutral: {
                    950: '#0a0a0a',
                    900: '#171717',
                    800: '#262626',
                },
            },
        },
    },
    plugins: [typography],
};