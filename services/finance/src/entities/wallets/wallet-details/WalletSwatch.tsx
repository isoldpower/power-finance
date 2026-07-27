import {FC} from "react";
import {cn} from '@internal/ui-library';


interface WalletSwatchProps {
	size: 'lg' | 'md'
	color: string
}

const WalletSwatch: FC<WalletSwatchProps> = ({ size, color }) => {
	return (
		<div
			className={cn(
				size === 'md' && "h-[26px] w-[38px] rounded-[6px]",
				size === 'lg' && "h-11 w-16 rounded-[9px]",
				"flex-none shadow-[var(--shadow)]"
			)}
			style={{ background: color }}
		/>
	);
}

export { WalletSwatch };