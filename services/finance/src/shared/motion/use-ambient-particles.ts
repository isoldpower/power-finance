import { useEffect } from "react";

import { resizeScene, startScene, stopScene } from "./ambient-scene.ts";
import { createParticles } from "./particle.ts";
import { prefersReducedMotion } from "./reduced-motion.ts";

import type { RefObject } from "react";
import type { AmbientScene } from "./ambient-scene.ts";


interface AmbientParticlesOptions {
	palette: string[];
	particleCount: number;
	maxAlpha: number;
}

const NO_ANIMATION_FRAME = 0;
const INITIAL_SIZE = 0;

// Drifting dust behind the app shell: a fixed pool of particles rises, fades and respawns.
const useAmbientParticles = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	{ palette, particleCount, maxAlpha }: AmbientParticlesOptions,
): void => {
	useEffect(() => {
		if (prefersReducedMotion()) {
			return;
		}

		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');

		if (!canvas || !context) {
			return;
		}

		const scene: AmbientScene = {
			canvas,
			context,
			field: { width: INITIAL_SIZE, height: INITIAL_SIZE, palette },
			particles: [],
			maxAlpha,
			previousTime: INITIAL_SIZE,
			animationFrame: NO_ANIMATION_FRAME,
		};

		resizeScene(scene);
		scene.particles = createParticles(particleCount, scene.field);

		const handleResize = resizeScene.bind(null, scene);

		startScene(scene);
		window.addEventListener('resize', handleResize);

		return stopScene.bind(null, scene, handleResize);
	}, [canvasRef, palette, particleCount, maxAlpha]);
};

export { useAmbientParticles };
export type { AmbientParticlesOptions };
