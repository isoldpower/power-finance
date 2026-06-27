import type { ComponentProps, FC } from "react";
import { cn, FinanceMoney } from "@internal/ui-library";

type FinanceMoneyProps = ComponentProps<typeof FinanceMoney>;

interface MoneyInOriginalProps {
	amount: number;
	currency: string;
	convert: (money: { amount: number; currency: string }) => { formatted: string; converted: boolean };
	format: (amount: number, currency: string) => string;
	tone?: FinanceMoneyProps['tone'];
	size?: FinanceMoneyProps['size'];
	align?: 'start' | 'end';
	className?: string;
}

// Shows an amount in its own currency, with the converted (target/main) currency as a hint.
// `convert`/`format` are passed in so this presentational component stays free of feature imports.
const MoneyInOriginal: FC<MoneyInOriginalProps> = ({ amount, currency, convert, format, tone, size, align = 'end', className }) => {
	const main = convert({ amount, currency });
	return (
		<div className={cn("flex flex-col leading-tight", align === 'end' ? "items-end" : "items-start", className)}>
			<FinanceMoney tone={tone} size={size}>{format(amount, currency)}</FinanceMoney>
			{main.converted ? (
				<span className="font-numeric text-[10.5px] text-text-3">≈ {main.formatted}</span>
			) : null}
		</div>
	);
};

MoneyInOriginal.displayName = 'MoneyInOriginal';

export { MoneyInOriginal };
export type { MoneyInOriginalProps };
