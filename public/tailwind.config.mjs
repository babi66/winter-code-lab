/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // This is the line we need for your toggle!
	theme: {
		extend: {
			colors: {
				// You can define custom colors here later if light mode looks weird
			},
		},
	},
	plugins: [],
}