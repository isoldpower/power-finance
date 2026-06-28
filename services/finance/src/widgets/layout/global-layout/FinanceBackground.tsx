import type { FC } from "react";
import { useRef } from "react";

import { AmbientBackdrop } from "@entity/layout";
import { useAmbientParticles } from "@feature/layout";

import { PALETTE, PARTICLE_COUNT, MAX_ALPHA } from "../config.ts";

const FinanceBackground: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useAmbientParticles(canvasRef, { palette: PALETTE, particleCount: PARTICLE_COUNT, maxAlpha: MAX_ALPHA });

	return <AmbientBackdrop canvasRef={canvasRef} />;
};

FinanceBackground.displayName = 'FinanceBackground';

export { FinanceBackground };
