import { cn } from "@internal/ui-library";
import { MoneyInOriginalAmount } from "./stack/MoneyInOriginalAmount.tsx";
import { MoneyInOriginalConverted } from "./stack/MoneyInOriginalConverted.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { MoneyInOriginalAmountProps } from "./stack/MoneyInOriginalAmount.tsx";
import type { MoneyInOriginalConvertedProps } from "./stack/MoneyInOriginalConverted.tsx";


type MoneyInOriginalProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	align?: 'start' | 'end';
}>;
type MoneyInOriginalObject = FC<MoneyInOriginalProps> & {
	Amount: FC<MoneyInOriginalAmountProps>;
	Converted: FC<MoneyInOriginalConvertedProps>;
}

const MoneyInOriginal: MoneyInOriginalObject = ({
	children,
	align = 'end',
	...props
}) => (
	<div
		className={cn(
			"flex flex-col leading-tight",
			align === 'end' ? "items-end" : "items-start"
		)}
		{...props}
	>
		{children}
	</div>
);

MoneyInOriginal.Amount = MoneyInOriginalAmount;
MoneyInOriginal.Converted = MoneyInOriginalConverted;
MoneyInOriginal.displayName = 'MoneyInOriginal';

export { MoneyInOriginal };
export type { MoneyInOriginalProps };
