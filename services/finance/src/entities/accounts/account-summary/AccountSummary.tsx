import { FinanceCard } from "@internal/ui-library";
import { AccountSummaryBalance } from "./summary/AccountSummaryBalance.tsx";
import { AccountSummaryGlow } from "./summary/AccountSummaryGlow.tsx";
import { AccountSummaryHero } from "./summary/AccountSummaryHero.tsx";
import { AccountSummaryHeroRow } from "./summary/AccountSummaryHeroRow.tsx";
import { AccountSummaryNameRow } from "./summary/AccountSummaryNameRow.tsx";
import { AccountSummaryType } from "./summary/AccountSummaryType.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AccountSummaryBalanceProps } from "./summary/AccountSummaryBalance.tsx";
import type { AccountSummaryGlowProps } from "./summary/AccountSummaryGlow.tsx";
import type { AccountSummaryHeroProps } from "./summary/AccountSummaryHero.tsx";
import type { AccountSummaryHeroRowProps } from "./summary/AccountSummaryHeroRow.tsx";
import type { AccountSummaryNameRowProps } from "./summary/AccountSummaryNameRow.tsx";
import type { AccountSummaryTypeProps } from "./summary/AccountSummaryType.tsx";


type AccountSummaryProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AccountSummaryObject = FC<AccountSummaryProps> & {
	Balance: FC<AccountSummaryBalanceProps>;
	Glow: FC<AccountSummaryGlowProps>;
	Hero: FC<AccountSummaryHeroProps>;
	HeroRow: FC<AccountSummaryHeroRowProps>;
	NameRow: FC<AccountSummaryNameRowProps>;
	Type: FC<AccountSummaryTypeProps>;
}

const AccountSummary: AccountSummaryObject = ({
	children,
	...props
}) => (
	<FinanceCard className="overflow-hidden" {...props}>
		{children}
	</FinanceCard>
);

AccountSummary.Balance = AccountSummaryBalance;
AccountSummary.Glow = AccountSummaryGlow;
AccountSummary.Hero = AccountSummaryHero;
AccountSummary.HeroRow = AccountSummaryHeroRow;
AccountSummary.NameRow = AccountSummaryNameRow;
AccountSummary.Type = AccountSummaryType;
AccountSummary.displayName = 'AccountSummary';

export { AccountSummary };
export type { AccountSummaryProps };
