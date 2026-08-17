import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerRowWalletProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LedgerRowWallet: FC<LedgerRowWalletProps> = ({
	children,
	...props
}) => (
	<BodyText as="div" size="12.5" className="hidden w-[130px] md:block" {...props}>
		{children}
	</BodyText>
);

LedgerRowWallet.displayName = 'LedgerRowWallet';

export { LedgerRowWallet };
export type { LedgerRowWalletProps };
