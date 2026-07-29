import type { FC } from "react";


const BackgroundAurora: FC = () => (
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
);

BackgroundAurora.displayName = 'BackgroundAurora';

export { BackgroundAurora };
