import type { FC } from "react";
import { useRef } from "react";

import { useAmbientParticles } from "@shared/components";

import { PALETTE, PARTICLE_COUNT, MAX_ALPHA } from "./config.ts";
import { BackgroundAurora, BackgroundDotGrid, ParticlesCanvas } from "@entity/navigation";



const FinanceBackground: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useAmbientParticles(canvasRef, { 
		palette: PALETTE,
		particleCount: PARTICLE_COUNT,
		maxAlpha: MAX_ALPHA,
	});

	return (
		<div className='relative'>
			<div className="pointer-events-none fixed inset-0 z-0">
				<BackgroundDotGrid />
			</div>
			<div className="pointer-events-none fixed z-0">
				<BackgroundAurora />
			</div>
			<ParticlesCanvas canvasRef={canvasRef} />
		</div>
	);
};

FinanceBackground.displayName = 'FinanceBackground';

export { FinanceBackground };
