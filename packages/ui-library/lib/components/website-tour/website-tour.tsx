import { WebsiteTourProvider } from "./context/context.ts";
import { TourStepContextProvider } from "./step-context/context.ts";
import { useWebsiteTour } from "./hooks";
import { WebsiteTourInvite } from "./website-tour-invite.tsx";
import { WebsiteTourPopover } from "./website-tour-popover.tsx";
import { WebsiteTourSpotlight } from "./website-tour-spotlight.tsx";
import { WebsiteTourStep } from "./website-tour-step.tsx";
import { WebsiteTourTrigger } from "./website-tour-trigger.tsx";

import type { ReactNode } from "react";
import type { WebsiteTourOptions } from "./hooks";


type WebsiteTourProps = WebsiteTourOptions & {
	children: ReactNode;
	className?: string;
};

function WebsiteTour({ children, className, ...options }: WebsiteTourProps) {
	const { rootReference, payload, stepValue } = useWebsiteTour(options);

	return (
		<WebsiteTourProvider value={payload}>
			<span ref={rootReference} hidden />
			{children}
			{stepValue && (
				<TourStepContextProvider value={stepValue}>
					<WebsiteTourSpotlight className={className} />
					<WebsiteTourPopover />
				</TourStepContextProvider>
			)}
		</WebsiteTourProvider>
	);
}

WebsiteTour.displayName = 'WebsiteTour';
WebsiteTour.Step = WebsiteTourStep;
WebsiteTour.Invite = WebsiteTourInvite;
WebsiteTour.Trigger = WebsiteTourTrigger;

export { WebsiteTour };
export type { WebsiteTourProps };
