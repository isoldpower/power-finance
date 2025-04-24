// CSS module declaration
declare module '*.css';

// Declare file extension modules
declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.png';