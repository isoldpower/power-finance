import { cn, FinanceComboboxTrigger } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type TimezonePickerTriggerProps = PropsWithChildren<{
	className?: string;
	isSaving?: boolean;
}>;

const TimezonePickerTrigger: FC<TimezonePickerTriggerProps> = ({
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

TimezonePickerTrigger.displayName = 'TimezonePickerTrigger';

export { TimezonePickerTrigger };
export type { TimezonePickerTriggerProps };
