import { useEffect } from "react";
import { AmbientScene } from "./ambient-scene.ts";
import { prefersReducedMotion } from "../reduced-motion.ts";

import type { RefObject } from "react";
import type { AmbientSceneOptions } from "./ambient-scene.ts";


type AmbientParticlesOptions = AmbientSceneOptions;

const useAmbientParticles = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	{ palette, particleCount, maxAlpha }: AmbientParticlesOptions,
): void => {
	useEffect(() => {
		if (prefersReducedMotion()) {
			return undefined;
		}

		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		if (canvas && context) {
			const scene = new AmbientScene(canvas, context, { 
				palette,
				particleCount,
				maxAlpha,
			});
			
			return scene.stop;
		} else {
			return undefined;
		}
	}, [canvasRef, palette, particleCount, maxAlpha]);
};

export { useAmbientParticles };
export type { AmbientParticlesOptions };
