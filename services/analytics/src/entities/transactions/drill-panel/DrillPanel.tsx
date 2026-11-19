import { cn } from "@internal/ui-library";
import { DrillPanelBody } from "./panel/DrillPanelBody.tsx";
import { DrillPanelHeader } from "./panel/DrillPanelHeader.tsx";
import { DrillPanelStat } from "./panel/DrillPanelStat.tsx";
import { DrillPanelStats } from "./panel/DrillPanelStats.tsx";

import type { FC, PropsWithChildren } from "react";
import type { DrillPanelBodyProps } from "./panel/DrillPanelBody.tsx";
import type { DrillPanelHeaderProps } from "./panel/DrillPanelHeader.tsx";
import type { DrillPanelStatProps } from "./panel/DrillPanelStat.tsx";
import type { DrillPanelStatsProps } from "./panel/DrillPanelStats.tsx";


type DrillPanelProps = PropsWithChildren<{
	label: string;
	onClose: () => void;
}>;
type DrillPanelObject = FC<DrillPanelProps> & {
	Body: FC<DrillPanelBodyProps>;
	Header: FC<DrillPanelHeaderProps>;
	Stat: FC<DrillPanelStatProps>;
	Stats: FC<DrillPanelStatsProps>;
};

const DrillPanel: DrillPanelObject = ({ label, onClose, children }) => (
	<div className="fixed inset-0 z-50 flex justify-end">
		<button
			type="button"
			aria-label="Close details"
			onClick={onClose}
			className="fx-fade absolute inset-0 bg-[rgba(12,14,19,0.32)] backdrop-blur-[2px]"
		/>
		<aside
			role="dialog"
			aria-modal="true"
			aria-label={label}
			className={cn(
				"fx-slidein relative flex h-full w-full max-w-[460px] flex-col border-l border-border",
				"bg-card shadow-[var(--shadow-lg)]",
			)}
		>
			{children}
		</aside>
	</div>
);

DrillPanel.Body = DrillPanelBody;
DrillPanel.Header = DrillPanelHeader;
DrillPanel.Stat = DrillPanelStat;
DrillPanel.Stats = DrillPanelStats;
DrillPanel.displayName = 'DrillPanel';

export { DrillPanel };
export type { DrillPanelProps };
