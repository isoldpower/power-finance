import type { FC } from "react";
import { useEffect, useRef } from "react";

// Ambient background, ported from the Claude Design reference: a fixed dot grid,
// three drifting aurora gradient blobs, and a slow rising-particle canvas.
// App is light-only, so the light-mode color values are inlined.

const PALETTE = ['#4f46e5', '#4f46e5', '#4f46e5', '#8b5cf6', '#14b8a6'];
const PARTICLE_COUNT = 64;
const MAX_ALPHA = 0.16;

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

const FinanceBackground: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

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
	}, []);

	return (
		<>
			<div
				className="pointer-events-none fixed inset-0 z-0"
				style={{
					backgroundImage: 'radial-gradient(rgba(26,34,64,0.05) 1px, transparent 1.4px)',
					backgroundSize: '22px 22px',
					backgroundAttachment: 'fixed',
				}}
			/>
			<div
				className="finance-aurora pointer-events-none fixed z-0"
				style={{
					inset: '-12% -6% 0 -6%',
					backgroundImage:
						'radial-gradient(760px 440px at 6% -10%, rgba(79,70,229,0.11), transparent 60%),' +
						'radial-gradient(680px 460px at 102% -6%, rgba(139,92,246,0.075), transparent 55%),' +
						'radial-gradient(1000px 620px at 62% -2%, rgba(20,184,166,0.06), transparent 62%)',
					animation: 'auroraDrift 28s ease-in-out infinite alternate',
					willChange: 'transform, opacity',
				}}
			/>
			<canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
		</>
	);
};

FinanceBackground.displayName = 'FinanceBackground';

export { FinanceBackground };
