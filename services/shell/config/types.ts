export interface FederationRemoteOptions {
	// name of the remote application
	name: string
	// list of remote applications
	remotes: {
		// name of the remote application
		name: string
		// host url of the remote application
		url: string
	}[]
}