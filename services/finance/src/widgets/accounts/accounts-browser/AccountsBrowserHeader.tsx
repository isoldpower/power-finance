import type { FC } from "react";
import { FinanceBadge } from "@internal/ui-library";

import { SectionHeader } from "@shared/components";
import {
	SectionHeaderBorder,
	SectionHeaderCaption,
	SectionHeaderTitle,
} from "@shared/components/section-header/SectionHeader.tsx";
import { useAccountsBrowser } from "@feature/accounts/browse-accounts/BrowseAccountsContext.tsx";


const AccountsBrowserHeader: FC = () => {
	const { accountCount } = useAccountsBrowser();

	return (
		<SectionHeader>
			<SectionHeaderTitle>
				<span className="flex items-center gap-2.5">
					Chart of accounts
				</span>
			</SectionHeaderTitle>
			<SectionHeaderCaption>
				{accountCount} accounts
			</SectionHeaderCaption>
			<SectionHeaderBorder />
			<span className="font-numeric text-[10.5px] tracking-[0.08em] text-text-3">
				<FinanceBadge tone="neutral" appearance="outline" size="sm">🔒 Read-only</FinanceBadge>
			</span>
		</SectionHeader>
	);
};

AccountsBrowserHeader.displayName = 'AccountsBrowserHeader';

export { AccountsBrowserHeader };
