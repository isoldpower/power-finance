import { cn, FinanceMenuTrigger } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletSelectVariant = 'boxed' | 'plain';
type WalletSelectTriggerProps = PropsWithChildren<{
	variant?: WalletSelectVariant;
	className?: string;
}>;

const WalletSelectTrigger: FC<WalletSelectTriggerProps> = ({
	children,
	variant = 'boxed',
	className,
}) => (
	<FinanceMenuTrigger asChild>
		<button
			type="button"
			className={cn(
				textClass({ size: '13', weight: 'semibold', tone: 'strong' }),
				"flex w-full items-center gap-2.5 outline-none",
				variant === 'boxed' && cn(
					"rounded-[var(--radius-md)] border border-border-strong bg-card",
					"px-3.5 py-2.5 hover:bg-secondary"
				),
				className
			)}
		>
			{children}
		</button>
	</FinanceMenuTrigger>
);

WalletSelectTrigger.displayName = 'WalletSelectTrigger';

export { WalletSelectTrigger };
export type { WalletSelectTriggerProps, WalletSelectVariant };
