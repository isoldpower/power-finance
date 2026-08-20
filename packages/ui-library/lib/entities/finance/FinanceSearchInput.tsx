import * as React from "react";

import { cn } from "@/utils";

type FinanceSearchInputContextType = Omit<React.ComponentProps<"input">, "className" | "children">;

const FinanceSearchInputContext = React.createContext<FinanceSearchInputContextType | null>(null);

type FinanceSearchInputProps = FinanceSearchInputContextType & {
	className?: string;
	children: React.ReactNode;
};

function FinanceSearchInput({ className, children, ...inputProps }: FinanceSearchInputProps) {
	return (
		<FinanceSearchInputContext value={inputProps}>
			<div
				className={cn(
					"flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong bg-surface px-2.5 py-[7px] transition-[border-color] focus-within:border-[var(--accent-border)]",
					className
				)}
			>
				{children}
			</div>
		</FinanceSearchInputContext>
	);
}

function FinanceSearchInputField({ className, ...props }: React.ComponentProps<"input">) {
	const inputProps = React.use(FinanceSearchInputContext);

	if (!inputProps) {
		throw new Error("FinanceSearchInputField must be used within FinanceSearchInput");
	}

	return (
		<input
			type="search"
			className={cn(
				"min-w-0 flex-1 [font-family:inherit] border-none bg-transparent text-[13px] text-foreground outline-none placeholder:text-text-3 [&::-webkit-search-cancel-button]:hidden",
				className
			)}
			{...inputProps}
			{...props}
		/>
	);
}

export { FinanceSearchInput, FinanceSearchInputField };
export type { FinanceSearchInputProps };
