// Declare file extension modules
declare module '*.svg' {
	const content: string;
	export default content;
}
declare module '*/css';

// Declare Module Federation remotes' exposed modules
declare module 'analytics/remote-app';
declare module 'finance/remote-app';