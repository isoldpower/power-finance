import { Heading, Overline } from "@shared/pure-components/typography";

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
		<Heading size="base">
			{children}
		</Heading>
	);
};

interface SectionHeaderCaptionProps {
	children: ReactNode;
}

const SectionHeaderCaption: FC<SectionHeaderCaptionProps> = ({ children }) => {
	return (
		<Overline as="span" size="10.5" tracking="0.08em" className="hidden sm:flex">
			{children}
		</Overline>
	);
};

SectionHeader.displayName = 'SectionHeader';
SectionHeader.Border = SectionHeaderBorder;
SectionHeader.Title = SectionHeaderTitle;
SectionHeader.Caption = SectionHeaderCaption;

export { SectionHeader };
export type { SectionHeaderProps, SectionHeaderTitleProps, SectionHeaderCaptionProps };
