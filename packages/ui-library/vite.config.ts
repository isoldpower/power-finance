import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [ react(), tailwindcss(), dts({ tsconfigPath: './tsconfig.app.json' }) ],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./lib"),
		},
	},
	build: {
		lib: {
			entry: {
				'main': resolve(__dirname, 'lib', 'main.ts')
			},
			name: 'InternalUI'
		},
		rollupOptions: {
			external: ['react', 'react-dom', '@internal/shared'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				},
			},
		},
	},
})