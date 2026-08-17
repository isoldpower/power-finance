import type { FC, RefObject } from "react";


interface ParticlesCanvasProps {
	canvasRef: RefObject<HTMLCanvasElement | null>;
}

const ParticlesCanvas: FC<ParticlesCanvasProps> = ({ canvasRef }) => (
	<canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
);

ParticlesCanvas.displayName = 'ParticlesCanvas';

export { ParticlesCanvas };
export type { ParticlesCanvasProps };
