import { WalletFormFailed, WalletFormSkeleton } from "@entity/wallets";

import type { FC, ReactNode } from "react";
import type { CurrencyMeta } from "@entity/localization";


interface WalletCurrenciesFxProps {
	currencies: CurrencyMeta[];
	isPending: boolean;
	isError: boolean;
	children: ((currencies: CurrencyMeta[]) => ReactNode) | ReactNode;
}

const WalletCurrenciesFx: FC<WalletCurrenciesFxProps> = ({ isError, isPending, currencies, children }) => {
	if (isPending) {
		return (
			<WalletFormSkeleton>
				<WalletFormSkeleton.Body>
					<WalletFormSkeleton.Preview />
					<WalletFormSkeleton.Field variant="name" />
					<WalletFormSkeleton.Field variant="type" />
					<WalletFormSkeleton.Field variant="currency" />
					<WalletFormSkeleton.Field variant="balance" spaced={false} />
				</WalletFormSkeleton.Body>
				<WalletFormSkeleton.Footer />
			</WalletFormSkeleton>
		);
	} else if (isError || currencies.length === 0) {
		return (
			<WalletFormFailed>
				<WalletFormFailed.Title>
					Something went wrong
				</WalletFormFailed.Title>
				<WalletFormFailed.Message>
					We couldn&apos;t load the currency list.
				</WalletFormFailed.Message>
			</WalletFormFailed>
		);
	}

	return typeof children === 'function'
		? children(currencies)
		: children;
}

export { WalletCurrenciesFx };
export type { WalletCurrenciesFxProps };
