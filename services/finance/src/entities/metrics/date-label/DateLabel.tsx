import type { FC, ReactNode } from "react";

interface DateLabelProps {
	children: ReactNode;
}

const DateLabel: FC<DateLabelProps> = ({ children }) => (
	<span className="font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3">
		{children}
	</span>
);

DateLabel.displayName = 'DateLabel';

export { DateLabel };
export type { DateLabelProps };
