import { useEffect } from "react";
import type { RefObject } from "react";

// Ambient background particle simulation, ported from the Claude Design reference: a slow
// rising-particle canvas. Tuning is supplied by the layout widget that owns the config.

interface AmbientOptions {
	palette: string[];
	particleCount: number;
	maxAlpha: number;
}

interface Particle {
	x0: number;
	y: number;
	r: number;
	life: number;
	dur: number;
	drift: number;
	rise: number;
	col: string;
}

const rnd = (min: number, max: number): number => min + Math.random() * (max - min);

const hexToRgba = (hex: string, alpha: number): string => {
	let value = hex.replace('#', '');
	if (value.length === 3) value = value.split('').map((char) => char + char).join('');
	const n = parseInt(value, 16);
	return `rgba(${((n >> 16) & 255).toString()},${((n >> 8) & 255).toString()},${(n & 255).toString()},${alpha.toString()})`;
};

const useAmbientParticles = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	{ palette: PALETTE, particleCount: PARTICLE_COUNT, maxAlpha: MAX_ALPHA }: AmbientOptions
): void => {
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;

		let width = 0;
		let height = 0;
		let raf = 0;

		const sizeCanvas = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const spawn = (particle: Particle) => {
			particle.x0 = rnd(0, width);
			particle.y = rnd(0, height * 0.66);
			particle.r = rnd(0.8, 2.4);
			particle.life = 0;
			particle.dur = rnd(4200, 9000);
			particle.drift = rnd(-7, 7);
			particle.rise = rnd(10, 28);
			particle.col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		};

		sizeCanvas();

		const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
			const particle = {} as Particle;
			spawn(particle);
			particle.life = Math.random();
			return particle;
		});

		let last = performance.now();
		const tick = (now: number) => {
			const dt = Math.min(now - last, 50);
			last = now;
			ctx.clearRect(0, 0, width, height);
			for (const particle of particles) {
				particle.life += dt / particle.dur;
				if (particle.life >= 1) {
					spawn(particle);
					continue;
				}
				const alpha = Math.sin(particle.life * Math.PI) * MAX_ALPHA;
				const y = particle.y - particle.life * particle.rise;
				const x = particle.x0 + Math.sin(particle.life * Math.PI * 2) * particle.drift;
				ctx.beginPath();
				ctx.fillStyle = hexToRgba(particle.col, alpha);
				ctx.arc(x, y, particle.r, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		const onResize = () => { sizeCanvas(); };
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
		};
	}, [canvasRef, PALETTE, PARTICLE_COUNT, MAX_ALPHA]);
};

export { useAmbientParticles };
