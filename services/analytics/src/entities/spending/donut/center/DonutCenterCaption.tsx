import type { FC, ReactNode } from "react";


interface DonutCenterCaptionProps {
	children: ReactNode;
}

const DonutCenterCaption: FC<DonutCenterCaptionProps> = ({ children }) => (
	<text y={26} fill="var(--text-3)" fontSize={11.5} className="font-numeric">
		{children}
	</text>
);

DonutCenterCaption.displayName = 'DonutCenterCaption';

export { DonutCenterCaption };
export type { DonutCenterCaptionProps };
