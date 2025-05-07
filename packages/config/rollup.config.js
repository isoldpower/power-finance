import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			preserveModules: false,
			inlineDynamicImports: true,
			sourcemap: true,
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm',
			preserveModules: false,
			inlineDynamicImports: true,
			sourcemap: true,
		},
	],
	plugins: [
		json(),
		peerDepsExternal(),
		resolve({
			preferBuiltins: true
		}),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json'
		}),
		terser(),
	],
	external: [
		'@tailwindcss/oxide-darwin-arm64',
		'@tailwindcss/oxide',
		'@swc/core',
		'@swc/wasm',
		'fsevents',
		'lightningcss',
	],
};
