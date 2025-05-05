import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'../src/**/*.{js,ts,jsx,tsx}',
		'../../../packages/ui-library/lib/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

export default config;