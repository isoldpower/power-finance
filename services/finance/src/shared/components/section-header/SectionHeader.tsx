import type { FC, ReactNode } from "react";


interface SectionHeaderProps {
	children: ReactNode;
}

function SectionHeader({ children }: SectionHeaderProps) {
	return (
		<div className="mx-0.5 mb-3 flex items-baseline gap-3">
			{children}
		</div>
	);
}

const SectionHeaderBorder: FC = () => {
	return (
		<div className="h-px flex-1 bg-border" />
	);
};

interface SectionHeaderTitleProps {
	children: ReactNode;
}

const SectionHeaderTitle: FC<SectionHeaderTitleProps> = ({ children }) => {
	return (
		<span className="font-display text-base font-semibold tracking-[-0.01em]">
			{children}
		</span>
	);
};

interface SectionHeaderCaptionProps {
	children: ReactNode;
}

const SectionHeaderCaption: FC<SectionHeaderCaptionProps> = ({ children }) => {
	return (
		<span className="hidden font-numeric text-[10.5px] uppercase tracking-[0.08em] text-text-3 sm:flex">
			{children}
		</span>
	);
};

SectionHeader.displayName = 'SectionHeader';
SectionHeader.Border = SectionHeaderBorder;
SectionHeader.Title = SectionHeaderTitle;
SectionHeader.Caption = SectionHeaderCaption;

export { SectionHeader };
export type { SectionHeaderProps, SectionHeaderTitleProps, SectionHeaderCaptionProps };
