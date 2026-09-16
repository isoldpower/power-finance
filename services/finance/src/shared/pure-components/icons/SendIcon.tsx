import type { FC } from "react";


interface SendIconProps {
	size?: number;
	className?: string;
}

const SendIcon: FC<SendIconProps> = ({ size = 15, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<line x1="22" y1="2" x2="11" y2="13" />
		<polygon points="22 2 15 22 11 13 2 9 22 2" />
	</svg>
);

SendIcon.displayName = 'SendIcon';

export { SendIcon };
export type { SendIconProps };
