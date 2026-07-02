import {cloneElement, FC, PropsWithChildren, ReactElement} from "react";

type WebhooksListFxProps = PropsWithChildren<{
	status: 'pending' | 'error' | 'success';
	fxSampleSize: number;
	pendingElement: ReactElement;
	errorElement: ReactElement;
}>;

const WebhooksListFx: FC<WebhooksListFxProps> = ({
	status,
	fxSampleSize,
	pendingElement,
	errorElement,
	children
}) => {
	switch (status) {
		case 'pending':
			return Array.from({ length: fxSampleSize }).map((_, index) => {
				return cloneElement(
					pendingElement,
					{ ...(pendingElement.props ?? {}), key: `pending-${index.toString()}` }
				);
			});
		case 'error':
			return Array.from({ length: fxSampleSize }).map((_, index) => {
				return cloneElement(
					errorElement,
					{ ...(errorElement.props ?? {}), key: `error-${index.toString()}` }
				);
			});
		case 'success':
			return children;
		default:
			throw Error("Unknown Webhooks List status");
	}
}

export { WebhooksListFx };
export type { WebhooksListFxProps };