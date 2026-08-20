import { particlesConfig } from "./config.ts";
import { pickColor, randomBetween } from "./utils.ts";


interface ParticleField {
	width: number;
	height: number;
	palette: string[];
}

class Particle {
	public originX = 0;
	public originY = 0;
	public radius = 0;
	public progress = 0;
	public lifespan = 0;
	public driftAmplitude = 0;
	public riseDistance = 0;
	public color = '';

	private readonly field: ParticleField;

	public constructor(field: ParticleField) {
		this.field = field;

		this.respawn();
		this.progress = Math.random();
	}

	public static createPool(count: number, field: ParticleField): Particle[] {
		const particles: Particle[] = [];

		for (let index = 0; index < count; index += 1) {
			particles.push(new Particle(field));
		}

		return particles;
	}

	public advance(timeDelta: number): boolean {
		this.progress += timeDelta / this.lifespan;

		if (this.progress < 1) {
			return true;
		} else {
			this.respawn();
			return false;
		}
	}

	public respawn(): void {
		this.originX = randomBetween(0, this.field.width);
		this.originY = randomBetween(0, this.field.height * particlesConfig.SPAWN_HEIGHT_RATIO);
		this.radius = randomBetween(particlesConfig.RADIUS.MIN, particlesConfig.RADIUS.MAX);
		this.progress = 0;
		this.lifespan = randomBetween(particlesConfig.LIFESPAN.MIN, particlesConfig.LIFESPAN.MAX);
		this.driftAmplitude = randomBetween(particlesConfig.DRIFT.MIN, particlesConfig.DRIFT.MAX);
		this.riseDistance = randomBetween(particlesConfig.RISE.MIN, particlesConfig.RISE.MAX);
		this.color = pickColor(this.field.palette);
	}
}

export { Particle };
export type { ParticleField };
