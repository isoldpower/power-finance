import { cn } from "@internal/ui-library";

import type { ComponentProps, FC } from "react";


type SelectableCurrencyShortcutProps = ComponentProps<"button">;

const SelectableCurrencyShortcut: FC<SelectableCurrencyShortcutProps> = ({ className, children, ...props }) => {
	return (
		<button
			type="button"
			className={cn(
				"flex w-full items-center gap-2.5 rounded-[var(--radius-sm)]",
				"px-3 py-2 text-left text-[13px] hover:bg-secondary",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export { SelectableCurrencyShortcut };