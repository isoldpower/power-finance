interface Particle {
	originX: number;
	originY: number;
	radius: number;
	progress: number;
	lifespan: number;
	driftAmplitude: number;
	riseDistance: number;
	color: string;
}

interface ParticleField {
	width: number;
	height: number;
	palette: string[];
}

const SPAWN_HEIGHT_RATIO = 0.66;
const MIN_RADIUS = 0.8;
const MAX_RADIUS = 2.4;
const MIN_LIFESPAN = 4200;
const MAX_LIFESPAN = 9000;
const MIN_DRIFT = -7;
const MAX_DRIFT = 7;
const MIN_RISE = 10;
const MAX_RISE = 28;

const randomBetween = (min: number, max: number): number => {
	return min + Math.random() * (max - min);
};

const pickColor = (palette: string[]): string => {
	return palette[Math.floor(Math.random() * palette.length)];
};

// Rewrites a particle in place so the pool never allocates while the animation runs.
const respawnParticle = (particle: Particle, field: ParticleField): void => {
	particle.originX = randomBetween(0, field.width);
	particle.originY = randomBetween(0, field.height * SPAWN_HEIGHT_RATIO);
	particle.radius = randomBetween(MIN_RADIUS, MAX_RADIUS);
	particle.progress = 0;
	particle.lifespan = randomBetween(MIN_LIFESPAN, MAX_LIFESPAN);
	particle.driftAmplitude = randomBetween(MIN_DRIFT, MAX_DRIFT);
	particle.riseDistance = randomBetween(MIN_RISE, MAX_RISE);
	particle.color = pickColor(field.palette);
};

const createParticles = (count: number, field: ParticleField): Particle[] => {
	const particles: Particle[] = [];

	for (let index = 0; index < count; index += 1) {
		const particle = {} as Particle;

		respawnParticle(particle, field);
		// Staggered start so the pool does not pulse in unison on the first frame.
		particle.progress = Math.random();
		particles.push(particle);
	}

	return particles;
};

export { createParticles, respawnParticle };
export type { Particle, ParticleField };
