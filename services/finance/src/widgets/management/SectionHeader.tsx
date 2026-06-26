import type { FC, ReactNode } from "react";

interface SectionHeaderProps {
	title: ReactNode;
	caption?: ReactNode;
	action?: ReactNode;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, caption, action }) => {
	return (
		<div className="mx-0.5 mb-3 flex items-baseline gap-3">
			<span className="font-display text-base font-semibold tracking-[-0.01em]">{title}</span>
			{caption ? (
				<span className="hidden font-numeric text-[10.5px] uppercase tracking-[0.08em] text-text-3 sm:block">
					{caption}
				</span>
			) : null}
			<div className="h-px flex-1 bg-border" />
			{action}
		</div>
	);
};

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
export type { SectionHeaderProps };
