import type { FC } from "react";


const BackgroundDotGrid: FC = () => (
	<div
		style={{
			backgroundImage: 'radial-gradient(rgba(26,34,64,0.05) 1px, transparent 1.4px)',
			backgroundSize: '22px 22px',
			backgroundAttachment: 'fixed',
		}}
	/>
);

BackgroundDotGrid.displayName = 'AmbientBackdrop';

export { BackgroundDotGrid };
