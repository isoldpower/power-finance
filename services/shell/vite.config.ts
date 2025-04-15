import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import inspect from 'vite-plugin-inspect'
import restart from 'vite-plugin-restart';
import { compression } from 'vite-plugin-compression2'

const internalNodeModules = [
	'node_modules/@internal/**',
	'node_modules/@drive/**'
]

export default defineConfig({
  plugins: [react(), compression(), inspect(), restart({
		restart: internalNodeModules
	})],
	resolve: {
		preserveSymlinks: true
	},
	server: {
		watch: {
			ignored: internalNodeModules.map((module) => ['!**', module].join('/'))
		},
	},
})
