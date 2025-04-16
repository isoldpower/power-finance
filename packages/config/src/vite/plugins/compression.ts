import { compression } from 'vite-plugin-compression2'

export const buildCompressionPlugin = () => {
	return compression({
		algorithm: 'gzip',
		threshold: 10240,
	});
}