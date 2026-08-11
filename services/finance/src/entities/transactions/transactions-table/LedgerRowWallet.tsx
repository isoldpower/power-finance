
import type { BaseHTMLAttributes, FC } from "react";
import { BodyText } from "@shared/pure-components/typography";


const LedgerRowWallet: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<BodyText
			as="div"
			size="12.5"
			className="hidden w-[130px] md:block"
			{...props}
		>
			{children}
		</BodyText>
	);
}

LedgerRowWallet.displayName = 'LedgerRowWallet';

export { LedgerRowWallet };
