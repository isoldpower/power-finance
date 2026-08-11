import { LockIcon } from "@shared/pure-components/icons";
import { FinanceBadge } from "@internal/ui-library";

import { MetaText } from "@shared/pure-components/typography";
import { SectionHeader } from "@shared/pure-components/layout";
import { useAccountsBrowser } from "@feature/accounts";

import type { FC } from "react";


const AccountsBrowserHeader: FC = () => {
	const { accountCount } = useAccountsBrowser();

	return (
		<SectionHeader>
			<SectionHeader.Title>
				<span className="flex items-center gap-2.5">
					Chart of accounts
				</span>
			</SectionHeader.Title>
			<SectionHeader.Caption>
				{accountCount} accounts
			</SectionHeader.Caption>
			<SectionHeader.Border />
			<MetaText size="10.5" tracking="0.08em">
				<FinanceBadge tone="neutral" appearance="outline" size="sm">
					<LockIcon /> Read-only
				</FinanceBadge>
			</MetaText>
		</SectionHeader>
	);
};

AccountsBrowserHeader.displayName = 'AccountsBrowserHeader';

export { AccountsBrowserHeader };
