import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [
		react(),
		dts({
			tsconfigPath: './tsconfig.app.json'
		})
	],
	resolve: {
		alias: {
			'@lib': resolve(__dirname, 'lib'),
			'@src': resolve(__dirname, 'src'),
		}
	},
	build: {
		lib: {
			entry: {
				'main': resolve(__dirname, 'lib', 'main.ts')
			},
			name: 'InternalLib'
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				},
			},
		},
	},
})