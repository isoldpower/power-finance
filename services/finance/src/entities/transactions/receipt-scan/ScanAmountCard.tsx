import { cn } from "@internal/ui-library";
import { ScanAmountCardConfidence } from "./amount-card/ScanAmountCardConfidence.tsx";
import { ScanAmountCardField } from "./amount-card/ScanAmountCardField.tsx";
import { ScanAmountCardLabel } from "./amount-card/ScanAmountCardLabel.tsx";
import { ScanAmountCardValue } from "./amount-card/ScanAmountCardValue.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ScanAmountCardConfidenceProps } from "./amount-card/ScanAmountCardConfidence.tsx";
import type { ScanAmountCardFieldProps } from "./amount-card/ScanAmountCardField.tsx";
import type { ScanAmountCardLabelProps } from "./amount-card/ScanAmountCardLabel.tsx";
import type { ScanAmountCardValueProps } from "./amount-card/ScanAmountCardValue.tsx";


type ScanAmountCardProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type ScanAmountCardObject = FC<ScanAmountCardProps> & {
	Confidence: FC<ScanAmountCardConfidenceProps>;
	Field: FC<ScanAmountCardFieldProps>;
	Label: FC<ScanAmountCardLabelProps>;
	Value: FC<ScanAmountCardValueProps>;
}

const ScanAmountCard: ScanAmountCardObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-3.5 flex items-center justify-between rounded-[var(--radius-md)]",
			"border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]"
		)}
		{...props}
	>
		{children}
	</div>
);

ScanAmountCard.Confidence = ScanAmountCardConfidence;
ScanAmountCard.Field = ScanAmountCardField;
ScanAmountCard.Label = ScanAmountCardLabel;
ScanAmountCard.Value = ScanAmountCardValue;
ScanAmountCard.displayName = 'ScanAmountCard';

export { ScanAmountCard };
export type { ScanAmountCardProps };
