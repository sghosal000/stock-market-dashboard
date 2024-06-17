/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				palanquin: ['Palanquin', 'sans-serif'],
			},

			colors: {
				background: "#141419",		// overall background (zinc-900)
				base: "#0f0f14",			// main theme color, used on cards, components.. (zinc-950)
				base1: "#0f1414",			// stone-900
				"base-lighter": "#1e1e23",
				neutral: "#334155",			// for borders, divider-like other elements (slate-700)
				accent: "#0ea5e9",			// for buttons, links and other highlighted elements (sky-500)
				txt: "#e2e8f0",				// for normal texts
				"txt-depressed": "#94a3b8", // for depressed texts
				danger: "#ef4444",			// for delete functionalities
				"light-red": "#f87171cc",
				"light-green": "#599d88",
				"light-cyan": "#67e8f9"
			},

			backgroundImage: {

			}
		},
	},
	plugins: [],
}

