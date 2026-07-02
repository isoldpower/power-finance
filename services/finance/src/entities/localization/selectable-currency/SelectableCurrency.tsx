import { cn } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";


type SelectableCurrencyProps = ComponentProps<"button">;

const SelectableCurrency: FC<SelectableCurrencyProps> = ({ className, children, ...props }) => {
	return (
		<button
			type="button"
			className={cn(
				"hidden items-center gap-1.5 rounded-[var(--radius-sm)]",
				"border border-border-strong px-3 py-1.5 text-[12.5px] font-semibold",
				"transition-colors hover:bg-secondary sm:flex",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export { SelectableCurrency };