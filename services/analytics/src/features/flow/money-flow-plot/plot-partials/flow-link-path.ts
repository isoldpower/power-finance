import type { PositionedLink } from "../../layout";


type FlowLinkGeometry = Pick<PositionedLink, 'sourceX' | 'sourceY' | 'targetX' | 'targetY'>;

const flowLinkPath = ({ sourceX, sourceY, targetX, targetY }: FlowLinkGeometry): string => {
	const middle = (sourceX + targetX) / 2;

	return `M${sourceX.toFixed(1)},${sourceY.toFixed(1)}`
		+ `C${middle.toFixed(1)},${sourceY.toFixed(1)} ${middle.toFixed(1)},${targetY.toFixed(1)}`
		+ ` ${targetX.toFixed(1)},${targetY.toFixed(1)}`;
};

export { flowLinkPath };
