import type { FC } from "react";


const BackgroundDotGrid: FC = () => (
	<div
		className="size-full"
		style={{
			backgroundImage: 'radial-gradient(var(--backdrop-dots) 1px, transparent 1.4px)',
			backgroundSize: '22px 22px',
			backgroundAttachment: 'fixed',
		}}
	/>
);

BackgroundDotGrid.displayName = 'AmbientBackdrop';

export { BackgroundDotGrid };
