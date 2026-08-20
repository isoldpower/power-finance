import { cn, UiSkeleton } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface CurrencySelectorFxProps {
	isPending: boolean;
	className?: string;
	children: ReactNode;
}

const CurrencySelectorFx: FC<CurrencySelectorFxProps> = ({
	isPending,
	className,
	children,
}) => {
	if (isPending) {
		return (
			<UiSkeleton 
				className={cn(
					"h-8 w-full rounded-[var(--radius-sm)]",
					className,
				)}
			/>
		);
	}

	return children;
};

CurrencySelectorFx.displayName = 'CurrencySelectorFx';

export { CurrencySelectorFx };
export type { CurrencySelectorFxProps };
