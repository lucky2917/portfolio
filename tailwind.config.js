/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-bg)',
                foreground: 'var(--color-text)',
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    foreground: 'var(--color-bg)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    foreground: 'var(--color-bg)',
                },
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-text)',
                },
                accent: {
                    DEFAULT: 'var(--color-coral)',
                    foreground: 'var(--color-bg)',
                },
            },
            fontFamily: {
                heading: ['var(--font-heading)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
}
