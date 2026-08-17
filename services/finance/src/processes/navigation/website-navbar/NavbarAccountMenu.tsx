import {
	FinanceBadge,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
    Icons,
} from "@internal/ui-library";
import { clerk } from "@internal/shared";
import { CurrencySelector, LocaleCombobox } from "@widget/localization";
import { NavigateToSettings } from "@feature/navigation";
import { UserAvatar } from "@entity/navigation";
import {
	PopoverBottom,
	PopoverSettings,
} from "@entity/configuration";
import { Caption, CardTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


const NavbarAccountMenu: FC = () => {
	const { user } = clerk.useUser();
	
	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<button type="button" aria-label="Account" className="rounded-full">
					<UserAvatar 
						firstName={user?.firstName} 
						lastName={user?.lastName} 
					/>
				</button>
			</FinanceMenuTrigger>
			<FinanceMenuContent className="w-[340px]">
				<div className="flex items-center gap-3 border-b border-border px-3 py-3">
					<UserAvatar 
						firstName={user?.firstName}
						lastName={user?.lastName} 
						size="lg"
					/>
					<div className="min-w-0">
						<CardTitle truncate>
							Your account
						</CardTitle>
						<Caption size="11.5" truncate>
							Manage preferences
						</Caption>
					</div>
				</div>
				<PopoverSettings>
					<PopoverSettings.Row>
						<PopoverSettings.Heading>Main currency</PopoverSettings.Heading>
						<CurrencySelector variant="field" className="w-[200px]" />
					</PopoverSettings.Row>
					<PopoverSettings.Row>
						<PopoverSettings.Heading>Locale</PopoverSettings.Heading>
						<LocaleCombobox variant="field" className="w-[200px]"/>
					</PopoverSettings.Row>
				</PopoverSettings>
				<PopoverBottom>
					<NavigateToSettings className="w-full">
						<FinanceMenuItem>
							<FinanceBadge tone="neutral" appearance="outline" size="md">
								<Icons.Settings />
							</FinanceBadge>
							All settings
						</FinanceMenuItem>
					</NavigateToSettings>
				</PopoverBottom>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

NavbarAccountMenu.displayName = 'NavbarAccountMenu';

export { NavbarAccountMenu };
