import { useHoverToggle } from "@shared/charts";
import { SankeyNodeBar } from "./node-mark/SankeyNodeBar.tsx";
import { SankeyNodeLabel } from "./node-mark/SankeyNodeLabel.tsx";
import { SankeyNodeValue } from "./node-mark/SankeyNodeValue.tsx";

import type { FC, PropsWithChildren } from "react";
import type { SankeyNodeBarProps } from "./node-mark/SankeyNodeBar.tsx";
import type { SankeyNodeLabelProps } from "./node-mark/SankeyNodeLabel.tsx";
import type { SankeyNodeValueProps } from "./node-mark/SankeyNodeValue.tsx";


type SankeyNodeMarkProps = PropsWithChildren<{
	label: string;
	dimmed: boolean;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}>;
type SankeyNodeMarkObject = FC<SankeyNodeMarkProps> & {
	Bar: FC<SankeyNodeBarProps>;
	Label: FC<SankeyNodeLabelProps>;
	Value: FC<SankeyNodeValueProps>;
};

const SankeyNodeMark: SankeyNodeMarkObject = ({ label, dimmed, onHover, onSelect, children }) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	return (
		<g
			role="button"
			aria-label={label}
			className="cursor-pointer transition-opacity"
			opacity={dimmed ? 0.35 : 1}
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			onClick={onSelect}
		>
			{children}
		</g>
	);
};

SankeyNodeMark.Bar = SankeyNodeBar;
SankeyNodeMark.Label = SankeyNodeLabel;
SankeyNodeMark.Value = SankeyNodeValue;
SankeyNodeMark.displayName = 'SankeyNodeMark';

export { SankeyNodeMark };
export type { SankeyNodeMarkProps };
