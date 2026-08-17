import { cn } from "@internal/ui-library";
import { ScanFieldRowAction } from "./field-row/ScanFieldRowAction.tsx";
import { ScanFieldRowAiBadge } from "./field-row/ScanFieldRowAiBadge.tsx";
import { ScanFieldRowLabel } from "./field-row/ScanFieldRowLabel.tsx";
import { ScanFieldRowValue } from "./field-row/ScanFieldRowValue.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ScanFieldRowActionProps } from "./field-row/ScanFieldRowAction.tsx";
import type { ScanFieldRowAiBadgeProps } from "./field-row/ScanFieldRowAiBadge.tsx";
import type { ScanFieldRowLabelProps } from "./field-row/ScanFieldRowLabel.tsx";
import type { ScanFieldRowValueProps } from "./field-row/ScanFieldRowValue.tsx";


type ScanFieldRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type ScanFieldRowObject = FC<ScanFieldRowProps> & {
	Action: FC<ScanFieldRowActionProps>;
	AiBadge: FC<ScanFieldRowAiBadgeProps>;
	Label: FC<ScanFieldRowLabelProps>;
	Value: FC<ScanFieldRowValueProps>;
}

const ScanFieldRow: ScanFieldRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-3 border-b border-border py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

ScanFieldRow.Action = ScanFieldRowAction;
ScanFieldRow.AiBadge = ScanFieldRowAiBadge;
ScanFieldRow.Label = ScanFieldRowLabel;
ScanFieldRow.Value = ScanFieldRowValue;
ScanFieldRow.displayName = 'ScanFieldRow';

export { ScanFieldRow };
export type { ScanFieldRowProps };
