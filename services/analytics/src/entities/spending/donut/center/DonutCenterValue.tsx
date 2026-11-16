import type { FC, ReactNode } from "react";


interface DonutCenterValueProps {
	children: ReactNode;
}

const DonutCenterValue: FC<DonutCenterValueProps> = ({ children }) => (
	<text y={6} fill="var(--text)" fontSize={20} fontWeight={600} className="font-display">
		{children}
	</text>
);

DonutCenterValue.displayName = 'DonutCenterValue';

export { DonutCenterValue };
export type { DonutCenterValueProps };
