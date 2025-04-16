export interface TargetPaths {
	root: string
	src: string
	output: string
	public: string
}

export interface ViteConfigOptions {
	// vite server and preview ports
	port?: number
	// internal module names that should be tracked in devServer
	internal?: string[]
	// paths of the target application
	paths: TargetPaths
}

export interface ViteConfigResolved {
	// vite server and preview ports
	port: number
	// internal module names that should be tracked in devServer
	internal: string[]
	// development mode
	dev: boolean
	// production mode
	prod: boolean
	// paths of the target application
	paths: TargetPaths
}