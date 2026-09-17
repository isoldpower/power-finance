import { createContext, useContext } from "react";
import type { WebsiteTourPayload } from "./types.ts";

const WebsiteTourContext = createContext<WebsiteTourPayload | null>(null)

const WebsiteTourProvider = WebsiteTourContext.Provider;
const WebsiteTourConsumer = WebsiteTourContext.Consumer;

const useWebsiteTourContext = () => {
	const context = useContext(WebsiteTourContext);

	if (!context) {
		throw new Error('useWebsiteTourContext must be used within a WebsiteTourProvider');
	}

	return context;
}

export { WebsiteTourContext, WebsiteTourProvider, WebsiteTourConsumer };
export { useWebsiteTourContext };
