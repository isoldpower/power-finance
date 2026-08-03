import { FinanceBadge } from "@internal/ui-library";

import { SectionHeader } from "@shared/components";
import { useAccountsBrowser } from "@feature/accounts";
import { LockIcon } from "@entity/accounts";

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
			<span className="font-numeric text-[10.5px] tracking-[0.08em] text-text-3">
				<FinanceBadge tone="neutral" appearance="outline" size="sm">
					<LockIcon /> Read-only
				</FinanceBadge>
			</span>
		</SectionHeader>
	);
};

AccountsBrowserHeader.displayName = 'AccountsBrowserHeader';

export { AccountsBrowserHeader };
