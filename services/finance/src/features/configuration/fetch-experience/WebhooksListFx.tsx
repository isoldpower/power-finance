import { SkeletonText } from "@shared/pure-components/feedback";
import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


const ENDPOINTS_UNAVAILABLE = "Endpoints couldn't be loaded.";
const ENDPOINT_SAMPLE_SIZE = 2;

type WebhooksListFxProps = PropsWithChildren<{
	status: 'pending' | 'error' | 'success';
}>;

const EndpointSkeleton: FC = () => (
	<div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
		<SkeletonText size="14.5" width="w-40" className="mb-2" />
		<SkeletonText size="11.5" width="w-64" />
	</div>
);

EndpointSkeleton.displayName = 'EndpointSkeleton';

const EndpointsUnavailable: FC = () => (
	<Caption size="12">
		{ENDPOINTS_UNAVAILABLE}
	</Caption>
);

EndpointsUnavailable.displayName = 'EndpointsUnavailable';

const sampleKeys = (prefix: string): string[] => (
	Array.from({ length: ENDPOINT_SAMPLE_SIZE }, (_, index) => `${prefix}-${index.toString()}`)
);

const WebhooksListFx: FC<WebhooksListFxProps> = ({ status, children }) => {
	switch (status) {
		case 'pending':
			return sampleKeys('pending').map((key) => (
				<EndpointSkeleton key={key} />
			));
		case 'error':
			return sampleKeys('error').map((key) => (
				<EndpointsUnavailable key={key} />
			));
		case 'success':
			return children;
		default:
			throw Error("Unknown Webhooks List status");
	}
}

export { WebhooksListFx };
export type { WebhooksListFxProps };
