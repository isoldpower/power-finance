import type { FC, PropsWithChildren } from "react";


const ROW_HEIGHT = 56;
const SEPARATOR_HEIGHT = 1;

type LedgerViewportProps = PropsWithChildren<{
	pageSize: number;
}>;

const LedgerViewport: FC<LedgerViewportProps> = ({ pageSize, children }) => (
	<div
		className="flex flex-col overflow-y-auto"
		style={{
			minHeight: pageSize * ROW_HEIGHT + (pageSize - 1) * SEPARATOR_HEIGHT,
		}}
	>
		{children}
	</div>
);

LedgerViewport.displayName = 'LedgerViewport';

export { LedgerViewport };
export type { LedgerViewportProps };
