import { LockIcon } from "@shared/pure-components/icons";
import { FinanceBadge } from "@internal/ui-library";

import { SectionHeader } from "@shared/pure-components/layout";
import { useAccountsBrowser } from "@feature/accounts";

import type { FC } from "react";


const AccountsBrowserHeader: FC = () => {
	const { accountCount } = useAccountsBrowser();

	return (
		<SectionHeader>
			<SectionHeader.Title>
				Chart of accounts
			</SectionHeader.Title>
			<FinanceBadge tone="neutral" appearance="outline" size="sm">
				<LockIcon /> Read-only
			</FinanceBadge>
			<SectionHeader.Border />
			<SectionHeader.Caption>
				{accountCount} accounts
			</SectionHeader.Caption>
		</SectionHeader>
	);
};

AccountsBrowserHeader.displayName = 'AccountsBrowserHeader';

export { AccountsBrowserHeader };
