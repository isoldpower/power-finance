import { FinanceMenu, FinanceMenuContent, FinanceMenuTrigger } from "@internal/ui-library";
import { PopoverSettings, useAccountPreferences, useAccountProfile } from "@internal/shared";
import { AccountHeader, UserAvatar } from "@entity/shell";
import { CurrencyPreference, LocalePreference, PreferenceSkeleton } from "@widget/shell";
import { ProtectCurrenciesPending, useAccountMenuDisclosure } from "@feature/shell";

import type { FC } from "react";


const AccountMenu: FC = () => {
	const { profile } = useAccountProfile();
	const { selectLocale, selectMainCurrency, isSaving } = useAccountPreferences();
	const { open, setOpen } = useAccountMenuDisclosure();
	const firstName = profile?.identity.firstName;
	const lastName = profile?.identity.lastName;

	return (
		<FinanceMenu open={open} onOpenChange={setOpen}>
			<FinanceMenuTrigger asChild>
				<button type="button" aria-label="Account" className="rounded-full">
					<UserAvatar firstName={firstName} lastName={lastName} />
				</button>
			</FinanceMenuTrigger>
			<FinanceMenuContent className="w-[340px]">
				<AccountHeader>
					<UserAvatar firstName={firstName} lastName={lastName} size="lg" />
					<AccountHeader.Identity title="Your account" caption="Manage preferences" />
				</AccountHeader>
				<PopoverSettings>
					<PopoverSettings.Row>
						<PopoverSettings.Heading>
							Main currency
						</PopoverSettings.Heading>
						<ProtectCurrenciesPending fallback={<PreferenceSkeleton className="w-[200px]" />}>
							{(currencies) => (
								<CurrencyPreference
									currencies={currencies}
									isSaving={isSaving}
									onSelect={selectMainCurrency}
									className="w-[200px]"
								/>
							)}
						</ProtectCurrenciesPending>
					</PopoverSettings.Row>
					<PopoverSettings.Row>
						<PopoverSettings.Heading>
							Locale
						</PopoverSettings.Heading>
						<LocalePreference
							isSaving={isSaving}
							onSelect={selectLocale}
							className="w-[200px]"
						/>
					</PopoverSettings.Row>
				</PopoverSettings>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

AccountMenu.displayName = 'AccountMenu';

export { AccountMenu };
