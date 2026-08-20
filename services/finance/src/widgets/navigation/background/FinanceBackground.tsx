import { useRef } from "react";
import { useAmbientParticles } from "@shared/motion";
import { PALETTE, PARTICLE_COUNT, MAX_ALPHA } from "./config.ts";
import { Background } from "@entity/navigation";

import type { FC } from "react";


const FinanceBackground: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useAmbientParticles(canvasRef, { 
		palette: PALETTE,
		particleCount: PARTICLE_COUNT,
		maxAlpha: MAX_ALPHA,
	});

	return (
		<Background>
			<Background.DotGrid />
			<Background.Aurora />
			<Background.Particles canvasRef={canvasRef} />
		</Background>
	);
};

FinanceBackground.displayName = 'FinanceBackground';

export { FinanceBackground };
