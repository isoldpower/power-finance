import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface ActivityRowIconProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>  {
	tone: 'positive' | 'negative';
}

const ActivityRowIcon: FC<ActivityRowIconProps> = ({
	children,
	tone,
	...props
}) => {
	return (
		<div 
			className={cn(
				`flex size-8 flex-none items-center justify-center rounded-[8px]`,
				tone === 'positive' && 'bg-pos-soft text-pos',
				tone === 'negative' && 'bg-[var(--neg-soft)] text-neg',
			)} 
			{...props}
		>
			{children}
		</div>
	);
}

ActivityRowIcon.displayName = 'ActivityRowIcon';

export { ActivityRowIcon };