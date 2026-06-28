import type { FC, RefObject } from "react";

interface AmbientBackdropProps {
	canvasRef: RefObject<HTMLCanvasElement | null>;
}

// Static decorative layers of the ambient background: a fixed dot grid and three drifting
// aurora gradient blobs, plus the canvas element the particle simulation draws into.
// App is light-only, so the light-mode color values are inlined.
const AmbientBackdrop: FC<AmbientBackdropProps> = ({ canvasRef }) => (
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

AmbientBackdrop.displayName = 'AmbientBackdrop';

export { AmbientBackdrop };
export type { AmbientBackdropProps };
