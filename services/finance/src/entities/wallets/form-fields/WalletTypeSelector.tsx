import type { FC } from "react";
import { cn, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";


interface WalletTypeSelectorProps {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const WalletTypeSelector: FC<WalletTypeSelectorProps> = ({ options, value, onChange, className }) => (
	<FinanceSegmented value={value} onValueChange={(next) => { if (next) onChange(next); }} className={cn("w-full", className)}>
		{options.map((option) => (
			<FinanceSegmentedItem key={option} value={option} className={cn(textClass({ size: '11' }), "flex-1")}>
				{option}
			</FinanceSegmentedItem>
		))}
	</FinanceSegmented>
);

WalletTypeSelector.displayName = 'WalletTypeSelector';

export { WalletTypeSelector };
export type { WalletTypeSelectorProps };
