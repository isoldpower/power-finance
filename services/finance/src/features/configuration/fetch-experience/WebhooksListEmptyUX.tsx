import {FC, PropsWithChildren, ReactNode} from "react";

type WebhooksListEmptyUXProps = PropsWithChildren<{
	dataset: unknown[]
	emptyElement?: ReactNode;
}>;

const WebhooksListEmptyUX: FC<WebhooksListEmptyUXProps> = ({
	dataset,
	emptyElement,
	children
}) => {
	if (dataset.length === 0) {
		return emptyElement ?? (
			<div>Nothing to show here</div>
		);
	}
	
	return children;
}

export { WebhooksListEmptyUX };
export type { WebhooksListEmptyUXProps };