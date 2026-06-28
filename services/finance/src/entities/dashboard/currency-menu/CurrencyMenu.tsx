import type { FC } from "react";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
} from "@internal/ui-library";

interface CurrencyMeta {
	code: string;
	symbol: string;
	name: string;
}

interface CurrencyMenuProps {
	currencies: CurrencyMeta[];
	mainCurrency: string;
	onSelect: (code: string) => void;
	className?: string;
}

const CurrencyMenu: FC<CurrencyMenuProps> = ({ currencies, mainCurrency, onSelect, className }) => (
	<FinanceMenu>
		<FinanceMenuTrigger asChild>
			<button
				type="button"
				className={cn(
					"hidden items-center gap-1.5 rounded-[var(--radius-sm)] border border-border-strong px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-secondary sm:flex",
					className
				)}
			>
				{mainCurrency} <span className="text-[10px] text-text-3">▾</span>
			</button>
		</FinanceMenuTrigger>
		<FinanceMenuContent align="end" className="min-w-[190px] p-1">
			{currencies.map((currency) => (
				<button
					key={currency.code}
					type="button"
					onClick={() => { onSelect(currency.code); }}
					className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-left text-[13px] hover:bg-secondary"
				>
					<span className="w-3.5 font-display font-semibold">{currency.symbol}</span>
					<span className="w-8 font-semibold">{currency.code}</span>
					<span className="font-numeric text-[10.5px] text-text-3">{currency.name}</span>
					<span className="ml-auto w-3 text-center font-semibold text-primary">{mainCurrency === currency.code ? '✓' : ''}</span>
				</button>
			))}
		</FinanceMenuContent>
	</FinanceMenu>
);

CurrencyMenu.displayName = 'CurrencyMenu';

export { CurrencyMenu };
export type { CurrencyMenuProps, CurrencyMeta };
