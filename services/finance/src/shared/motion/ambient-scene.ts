import { hexToRgba } from "./color.ts";
import { respawnParticle } from "./particle.ts";

import type { Particle, ParticleField } from "./particle.ts";


interface AmbientScene {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	field: ParticleField;
	particles: Particle[];
	maxAlpha: number;
	previousTime: number;
	animationFrame: number;
}

const MAX_PIXEL_RATIO = 2;
const MAX_FRAME_DELTA = 50;
const FULL_TURN = Math.PI * 2;
const COMPLETE_PROGRESS = 1;

const resizeScene = (scene: AmbientScene): void => {
	const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

	scene.field.width = window.innerWidth;
	scene.field.height = window.innerHeight;
	scene.canvas.width = Math.floor(scene.field.width * pixelRatio);
	scene.canvas.height = Math.floor(scene.field.height * pixelRatio);
	scene.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
};

const drawParticle = (scene: AmbientScene, particle: Particle): void => {
	const alpha = Math.sin(particle.progress * Math.PI) * scene.maxAlpha;
	const drift = Math.sin(particle.progress * FULL_TURN) * particle.driftAmplitude;
	const x = particle.originX + drift;
	const y = particle.originY - particle.progress * particle.riseDistance;

	scene.context.beginPath();
	scene.context.fillStyle = hexToRgba(particle.color, alpha);
	scene.context.arc(x, y, particle.radius, 0, FULL_TURN);
	scene.context.fill();
};

// Requests its own next frame; bound to the scene so the hook keeps no closures.
const drawScene = (scene: AmbientScene, now: number): void => {
	const delta = Math.min(now - scene.previousTime, MAX_FRAME_DELTA);

	scene.previousTime = now;
	scene.context.clearRect(0, 0, scene.field.width, scene.field.height);

	for (const particle of scene.particles) {
		particle.progress += delta / particle.lifespan;

		if (particle.progress >= COMPLETE_PROGRESS) {
			respawnParticle(particle, scene.field);
			continue;
		}

		drawParticle(scene, particle);
	}

	scene.animationFrame = requestAnimationFrame(drawScene.bind(null, scene));
};

const startScene = (scene: AmbientScene): void => {
	scene.previousTime = performance.now();
	scene.animationFrame = requestAnimationFrame(drawScene.bind(null, scene));
};

const stopScene = (scene: AmbientScene, onResize: () => void): void => {
	cancelAnimationFrame(scene.animationFrame);
	window.removeEventListener('resize', onResize);
};

export { resizeScene, startScene, stopScene };
export type { AmbientScene };
