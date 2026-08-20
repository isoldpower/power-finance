import { cn } from "@internal/ui-library";
import { BalanceCompositionFormula } from "./composition/BalanceCompositionFormula.tsx";
import { BalanceCompositionHint } from "./composition/BalanceCompositionHint.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { BalanceCompositionFormulaProps } from "./composition/BalanceCompositionFormula.tsx";
import type { BalanceCompositionHintProps } from "./composition/BalanceCompositionHint.tsx";


type BalanceCompositionProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type BalanceCompositionObject = FC<BalanceCompositionProps> & {
	Formula: FC<BalanceCompositionFormulaProps>;
	Hint: FC<BalanceCompositionHintProps>;
}

const BalanceComposition: BalanceCompositionObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

BalanceComposition.Formula = BalanceCompositionFormula;
BalanceComposition.Hint = BalanceCompositionHint;
BalanceComposition.displayName = 'BalanceComposition';

export { BalanceComposition };
export type { BalanceCompositionProps };
