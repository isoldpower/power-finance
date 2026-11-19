import { useMemo } from "react";
import { FinanceIconButton, Icons } from "@internal/ui-library";
import { Caption, Heading, Overline } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface DrillPanelHeaderProps {
	overline: ReactNode;
	title: string;
	subtitle: string;
	accent: string;
	onClose: () => void;
}

const DrillPanelHeader: FC<DrillPanelHeaderProps> = ({ overline, title, subtitle, accent, onClose }) => {
	const accentStyle = useMemo(() => {
		return { background: accent };
	}, [accent]);

	return (
		<header className="flex items-start gap-3 border-b border-border px-6 pb-4 pt-5">
			<span className="mt-1.5 h-9 w-1 shrink-0 rounded-full" style={accentStyle} />
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<Overline as="span" size="10.5" tracking="0.12em">
					{overline}
				</Overline>
				<Heading size="19" className="truncate">
					{title}
				</Heading>
				<Caption size="12">
					{subtitle}
				</Caption>
			</div>
			<FinanceIconButton aria-label="Close" onClick={onClose}>
				<Icons.X aria-hidden size={16} />
			</FinanceIconButton>
		</header>
	);
};

DrillPanelHeader.displayName = 'DrillPanelHeader';

export { DrillPanelHeader };
export type { DrillPanelHeaderProps };
