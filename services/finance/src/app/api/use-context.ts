import { use } from "react";
import { ApiContext } from "./Context.tsx";

const useApiContext = () => {
	const context = use(ApiContext);

	if (context === null) {
		throw new Error('useApiContext must be used within an ApiProvider');
	}

	return context;
};

export { useApiContext };
