import type { ComponentProps, FC } from "react";

import { cn, FinanceMoney } from "@internal/ui-library";
import { MetaText } from "@shared/pure-components/typography";


type FinanceMoneyProps = ComponentProps<typeof FinanceMoney>;

interface MoneyInOriginalProps {
	children: number;
	currency: string;
	convert: (money: { amount: number; currency: string }) => { formatted: string; converted: boolean };
	format: (amount: number, currency: string) => string;
	tone?: FinanceMoneyProps['tone'];
	size?: FinanceMoneyProps['size'];
	align?: 'start' | 'end';
	className?: string;
}

const MoneyInOriginal: FC<MoneyInOriginalProps> = ({ children, currency, convert, format, tone, size, align = 'end', className }) => {
	const main = convert({ amount: children, currency });
	
	return (
		<div
			className={cn(
				"flex flex-col leading-tight",
				align === 'end' ? "items-end" : "items-start",
				className
			)}
		>
			<FinanceMoney tone={tone} size={size}>
				{format(children, currency)}
			</FinanceMoney>
			<MetaText size="10.5">
				≈ {main.formatted}
			</MetaText>
		</div>
	);
};

MoneyInOriginal.displayName = 'MoneyInOriginal';

export { MoneyInOriginal };
export type { MoneyInOriginalProps };
