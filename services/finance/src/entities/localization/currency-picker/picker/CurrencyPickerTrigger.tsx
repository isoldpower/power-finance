import { cn, FinanceComboboxTrigger } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerTriggerProps = PropsWithChildren<{
	className?: string;
	isSaving?: boolean;
}>;

const CurrencyPickerTrigger: FC<CurrencyPickerTriggerProps> = ({
	className,
	isSaving = false,
	children,
}) => (
	<FinanceComboboxTrigger
		aria-busy={isSaving}
		className={cn(
			"w-full transition-opacity",
			isSaving && "opacity-60",
			className,
		)}
	>
		{children}
	</FinanceComboboxTrigger>
);

CurrencyPickerTrigger.displayName = 'CurrencyPickerTrigger';

export { CurrencyPickerTrigger };
export type { CurrencyPickerTriggerProps };
