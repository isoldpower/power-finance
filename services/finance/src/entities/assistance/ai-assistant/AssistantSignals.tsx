import { cn } from "@internal/ui-library";
import { AssistantSectionLabel } from "./signals/AssistantSectionLabel.tsx";
import { AssistantSignalTile } from "./signals/AssistantSignalTile.tsx";
import { AssistantSignalsGrid } from "./signals/AssistantSignalsGrid.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AssistantSectionLabelProps } from "./signals/AssistantSectionLabel.tsx";
import type { AssistantSignalTileProps } from "./signals/AssistantSignalTile.tsx";
import type { AssistantSignalsGridProps } from "./signals/AssistantSignalsGrid.tsx";


type AssistantSignalsProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AssistantSignalsObject = FC<AssistantSignalsProps> & {
	Grid: FC<AssistantSignalsGridProps>;
	Label: FC<AssistantSectionLabelProps>;
	Tile: FC<AssistantSignalTileProps>;
}

const AssistantSignals: AssistantSignalsObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"border-b border-border bg-secondary px-3.5 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSignals.Grid = AssistantSignalsGrid;
AssistantSignals.Label = AssistantSectionLabel;
AssistantSignals.Tile = AssistantSignalTile;
AssistantSignals.displayName = 'AssistantSignals';

export { AssistantSignals };
export type { AssistantSignalsProps };
