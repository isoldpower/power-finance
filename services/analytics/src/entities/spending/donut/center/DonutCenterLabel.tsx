import type { FC, ReactNode } from "react";


interface DonutCenterLabelProps {
	children: ReactNode;
}

const DonutCenterLabel: FC<DonutCenterLabelProps> = ({ children }) => (
	<text y={-18} fill="var(--text-3)" fontSize={10.5} letterSpacing="0.1em" className="font-numeric uppercase">
		{children}
	</text>
);

DonutCenterLabel.displayName = 'DonutCenterLabel';

export { DonutCenterLabel };
export type { DonutCenterLabelProps };
