import type { FC } from "react";


const BackgroundDotGrid: FC = () => (
	<div
		className="pointer-events-none fixed inset-0 z-0 size-full"
		style={{
			backgroundImage: 'radial-gradient(var(--backdrop-dots) 1px, transparent 1.4px)',
			backgroundSize: '22px 22px',
			backgroundAttachment: 'fixed',
		}}
	/>
);

BackgroundDotGrid.displayName = 'BackgroundDotGrid';

export { BackgroundDotGrid };
