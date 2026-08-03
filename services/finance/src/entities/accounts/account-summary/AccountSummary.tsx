import { AccountSummaryCard } from "./AccountSummaryCard.tsx";
import { AccountSummaryHero } from "./AccountSummaryHero.tsx";
import { AccountSummaryGlow } from "./AccountSummaryGlow.tsx";
import { AccountSummaryHeroRow } from "./AccountSummaryHeroRow.tsx";
import { AccountSummaryNameRow } from "./AccountSummaryNameRow.tsx";
import { AccountSummaryName } from "./AccountSummaryName.tsx";
import { AccountSummaryType } from "./AccountSummaryType.tsx";
import { AccountSummaryKind } from "./AccountSummaryKind.tsx";
import { AccountSummaryBalanceLabel } from "./AccountSummaryBalanceLabel.tsx";
import { AccountSummaryBalance } from "./AccountSummaryBalance.tsx";


function AccountSummary() {
	return null;
}

AccountSummary.displayName = 'AccountSummary';
AccountSummary.Card = AccountSummaryCard;
AccountSummary.Hero = AccountSummaryHero;
AccountSummary.Glow = AccountSummaryGlow;
AccountSummary.HeroRow = AccountSummaryHeroRow;
AccountSummary.NameRow = AccountSummaryNameRow;
AccountSummary.Name = AccountSummaryName;
AccountSummary.Type = AccountSummaryType;
AccountSummary.Kind = AccountSummaryKind;
AccountSummary.BalanceLabel = AccountSummaryBalanceLabel;
AccountSummary.Balance = AccountSummaryBalance;

export { AccountSummary };
