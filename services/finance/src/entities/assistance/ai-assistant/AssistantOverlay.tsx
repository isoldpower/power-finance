import { cn } from "@internal/ui-library";
import { AssistantFab } from "./overlay/AssistantFab.tsx";
import { AssistantScrim } from "./overlay/AssistantScrim.tsx";
import { AssistantSheet } from "./overlay/AssistantSheet.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AssistantFabProps } from "./overlay/AssistantFab.tsx";
import type { AssistantScrimProps } from "./overlay/AssistantScrim.tsx";
import type { AssistantSheetProps } from "./overlay/AssistantSheet.tsx";


type AssistantOverlayProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AssistantOverlayObject = FC<AssistantOverlayProps> & {
	Fab: FC<AssistantFabProps>;
	Scrim: FC<AssistantScrimProps>;
	Sheet: FC<AssistantSheetProps>;
}

const AssistantOverlay: AssistantOverlayObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"finance-theme"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantOverlay.Fab = AssistantFab;
AssistantOverlay.Scrim = AssistantScrim;
AssistantOverlay.Sheet = AssistantSheet;
AssistantOverlay.displayName = 'AssistantOverlay';

export { AssistantOverlay };
export type { AssistantOverlayProps };
