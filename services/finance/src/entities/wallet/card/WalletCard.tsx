import type {FC, ReactNode} from "react";

interface WalletCardProps {
	children?: ReactNode;
}

const WalletCard: FC<WalletCardProps> = ({ children }) => {
	return (
		<div className='border rounded-lg p-4 transition-all duration-200 shadow-sm'>
			{ children }
		</div>
	)
}

WalletCard.displayName = 'WalletCard';

export { WalletCard };