import { useRef } from "react";
import { useAmbientParticles } from "../../motion/index.ts";
import { Background } from "./Background.tsx";
import { MAX_ALPHA, PALETTE, PARTICLE_COUNT } from "./config.ts";

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
