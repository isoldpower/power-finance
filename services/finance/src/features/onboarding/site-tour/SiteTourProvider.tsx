import { useCallback } from "react";
import { WebsiteTour } from "@internal/ui-library";
import { useRouteNavigate } from "@shared/routing";

import { SITE_TOUR_STOPS, SITE_TOUR_STORAGE_KEY } from "./config.ts";

import type { FC, ReactNode } from "react";


interface SiteTourProviderProps {
	children: ReactNode;
}

const SiteTourProvider: FC<SiteTourProviderProps> = ({ children }) => {
	const navigate = useRouteNavigate();

	const openStop = useCallback((step: number) => {
		const stop = SITE_TOUR_STOPS[step] as typeof SITE_TOUR_STOPS[number] | undefined;

		if (!stop) return;

		navigate(stop.route, stop.search);
	}, [navigate]);

	const handleStart = useCallback(() => {
		openStop(0);
	}, [openStop]);

	return (
		<WebsiteTour
			storageKey={SITE_TOUR_STORAGE_KEY}
			onStart={handleStart}
			onStepChange={openStop}
		>
			{children}
		</WebsiteTour>
	);
};

SiteTourProvider.displayName = 'SiteTourProvider';

export { SiteTourProvider };
export type { SiteTourProviderProps };
