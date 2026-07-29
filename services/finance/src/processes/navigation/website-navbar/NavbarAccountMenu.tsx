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
	PopoverSettingHeading,
	PopoverSettingRow,
	PopoverSettingsContainer,
	PopoverHeading,
	PopoverDescription,
	PopoverBottom,
} from "@entity/configuration";

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
						<PopoverHeading>
							Your account
						</PopoverHeading>
						<PopoverDescription>
							Manage preferences
						</PopoverDescription>
					</div>
				</div>
				<PopoverSettingsContainer>
					<PopoverSettingRow>
						<PopoverSettingHeading>Main currency</PopoverSettingHeading>
						<CurrencySelector variant="field" className="w-[200px]" />
					</PopoverSettingRow>
					<PopoverSettingRow>
						<PopoverSettingHeading>Locale</PopoverSettingHeading>
						<LocaleCombobox variant="field" className="w-[200px]"/>
					</PopoverSettingRow>
				</PopoverSettingsContainer>
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
