// Declare file extension modules
declare module '*.svg' {
	const content: string;
	export default content;
}

// Declare Module Federation remotes' exposed modules
declare module 'analytics/remote-app';