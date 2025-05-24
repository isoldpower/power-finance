type TrendsGraphType = "linear" | "threshold";
type CategoryGraphType = "pie" | "radial" | "radar";

interface ConfigurationStoreState {
	graphType: TrendsGraphType;
	categoryGraphType: CategoryGraphType;
}

interface ConfigurationStore extends ConfigurationStoreState {
	setTrendsGraphType: (graphType: TrendsGraphType) => void;
	setCategoryGraphType: (graphType: CategoryGraphType) => void;
}

export type { TrendsGraphType, CategoryGraphType, ConfigurationStore, ConfigurationStoreState };