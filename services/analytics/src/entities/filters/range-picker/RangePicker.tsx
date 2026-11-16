import { cn } from "@internal/ui-library";
import { RangePickerInput } from "./picker/RangePickerInput.tsx";

import type { FC, PropsWithChildren } from "react";
import type { RangePickerInputProps } from "./picker/RangePickerInput.tsx";


type RangePickerProps = PropsWithChildren<{
	active: boolean;
}>;
type RangePickerObject = FC<RangePickerProps> & {
	Input: FC<RangePickerInputProps>;
};

const RangePicker: RangePickerObject = ({ active, children }) => (
	<div
		className={cn(
			"flex h-[34px] items-center gap-1 rounded-[var(--radius-sm)] border px-2 transition-colors",
			active ? "border-[var(--accent-border)] bg-accent-soft" : "border-border-strong bg-card",
		)}
	>
		{children}
	</div>
);

RangePicker.Input = RangePickerInput;
RangePicker.displayName = 'RangePicker';

export { RangePicker };
export type { RangePickerProps };
