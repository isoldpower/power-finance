import { use } from "react";
import { ApiContext } from "./context.tsx";

const useApiContext = () => {
	const context = use(ApiContext);

	if (!context) {
		throw new Error('useApiContext must be used within an ApiProvider');
	}

	return context;
};

export { useApiContext };
