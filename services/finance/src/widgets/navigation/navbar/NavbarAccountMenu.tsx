import type { FC } from "react";
import {
	FinanceAvatar,
	FinanceBadge,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";

import { PreferredCurrencySelection } from "@widget/configuration/currency-preference/PreferredCurrencySelection.tsx";
import { GlobalLocaleSelection } from "@widget/configuration/locale-preference/GlobalLocaleSelection.tsx";

interface NavbarAccountMenuProps {
	onOpenSettings: () => void;
}

const NavbarAccountMenu: FC<NavbarAccountMenuProps> = ({ onOpenSettings }) => {
	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				{/* TODO wire to backend user */}
				<button type="button" aria-label="Account" className="rounded-full">
					<FinanceAvatar initials="AR" />
				</button>
			</FinanceMenuTrigger>
			<FinanceMenuContent className="w-[340px]">
				<div className="flex items-center gap-3 border-b border-border px-3 py-3">
					<FinanceAvatar size="lg" initials="AR" />
					<div className="min-w-0">
						<div className="truncate text-sm font-semibold">Your account</div>
						<div className="truncate text-[11.5px] text-text-3">Manage preferences</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 px-3 py-3 [&_h3]:whitespace-nowrap [&_h3]:text-[13px] [&_h3]:font-medium [&_h3]:text-text-2">
					<PreferredCurrencySelection />
					<GlobalLocaleSelection />
				</div>
				<div className="border-t border-border p-1">
					<FinanceMenuItem onClick={onOpenSettings}>
						<FinanceBadge tone="neutral" appearance="outline" size="sm">⚙</FinanceBadge>
						All settings
					</FinanceMenuItem>
				</div>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

NavbarAccountMenu.displayName = 'NavbarAccountMenu';

export { NavbarAccountMenu };
export type { NavbarAccountMenuProps };
