type GraphType = "linear" | "threshold";

interface ConfigurationStoreState {
	graphType: GraphType;
}

interface ConfigurationStore extends ConfigurationStoreState {
	setGraphType: (graphType: GraphType) => void;
}

export type { GraphType, ConfigurationStore, ConfigurationStoreState };