import { hexToRgba } from "../color.ts";
import { sceneConfig } from "./config.ts";
import { Particle } from "./particle.ts";

import type { ParticleField } from "./particle.ts";


interface AmbientSceneOptions {
	palette: string[];
	particleCount: number;
	maxAlpha: number;
}


class AmbientScene {
	private readonly canvas: HTMLCanvasElement;
	private readonly context: CanvasRenderingContext2D;
	private readonly field: ParticleField;
	private readonly particles: Particle[];
	private readonly maxAlpha: number;
	private previousTime = 0;
	private animationFrame = 0;

	public constructor(
		canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		{ palette, particleCount, maxAlpha }: AmbientSceneOptions,
	) {
		this.canvas = canvas;
		this.context = context;
		this.maxAlpha = maxAlpha;
		this.field = { width: 0, height: 0, palette };

		this.resize();
		this.particles = Particle.createPool(particleCount, this.field);

		window.addEventListener('resize', this.resize);
		this.animationFrame = requestAnimationFrame(this.draw);
	}

	public stop = (): void => {
		cancelAnimationFrame(this.animationFrame);
		window.removeEventListener('resize', this.resize);
		this.animationFrame = 0;
	};

	private readonly resize = (): void => {
		const pixelRatio = Math.min(
			window.devicePixelRatio || 1,
			sceneConfig.MAX_PIXEL_RATIO,
		);

		this.field.width = window.innerWidth;
		this.field.height = window.innerHeight;
		this.canvas.width = Math.floor(this.field.width * pixelRatio);
		this.canvas.height = Math.floor(this.field.height * pixelRatio);
		this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	};

	private readonly draw = (now: number): void => {
		const timeDelta = Math.min(now - this.previousTime, sceneConfig.MAX_FRAME_DELTA);

		this.previousTime = now;
		this.context.clearRect(0, 0, this.field.width, this.field.height);

		for (const particle of this.particles) {
			if (particle.advance(timeDelta)) {
				this.drawParticle(particle);
			}
		}

		this.animationFrame = requestAnimationFrame(this.draw);
	};

	private readonly drawParticle = (particle: Particle): void => {
		const particleAlpha = Math.sin(particle.progress * Math.PI) * this.maxAlpha;
		const drift = Math.sin(particle.progress * sceneConfig.FULL_TURN) * particle.driftAmplitude;
		const positionX = particle.originX + drift;
		const positionY = particle.originY - particle.progress * particle.riseDistance;

		this.context.beginPath();
		this.context.fillStyle = hexToRgba(particle.color, particleAlpha);
		this.context.arc(positionX, positionY, particle.radius, 0, sceneConfig.FULL_TURN);
		this.context.fill();
	};
}

export { AmbientScene };
export type { AmbientSceneOptions };
