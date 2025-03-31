/** @type {import('tailwindcss').Config} */
export default {
    content: [ './index.html', './src/**/*.{js,ts,jsx,tsx}' ],
    theme: {
        extend: {
            colors: {
                'light-blue': '#97d5f4',
                'dark-blue': '#151f53',
                'medium-blue': '#37558e',
                'accent-blue': '#d27d2d',
            },
            fontFamily: {
                // Tipografía para titulos:
                heading: [ 'Raleway', 'sans-serif' ],
                // para párrafos:
                body: [ 'Poppins', 'sans-serif' ],
                // Para botones:
                button: [ 'Montserrat', 'sans-serif' ],
            },
        },
    },
    plugins: [],
};
