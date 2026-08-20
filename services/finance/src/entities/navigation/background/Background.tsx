import { cn } from "@internal/ui-library";
import { BackgroundAurora } from "./layers/BackgroundAurora.tsx";
import { BackgroundDotGrid } from "./layers/BackgroundDotGrid.tsx";
import { ParticlesCanvas } from "./layers/ParticlesCanvas.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ParticlesCanvasProps } from "./layers/ParticlesCanvas.tsx";


type BackgroundProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type BackgroundObject = FC<BackgroundProps> & {
	Aurora: FC;
	DotGrid: FC;
	Particles: FC<ParticlesCanvasProps>;
}

const Background: BackgroundObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative"
		)}
		{...props}
	>
		{children}
	</div>
);

Background.Aurora = BackgroundAurora;
Background.DotGrid = BackgroundDotGrid;
Background.Particles = ParticlesCanvas;
Background.displayName = 'Background';

export { Background };
export type { BackgroundProps };
