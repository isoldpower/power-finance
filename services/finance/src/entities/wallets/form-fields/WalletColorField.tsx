import { FinanceColorPicker } from "@internal/ui-library";
import { WALLET_COLORS } from "../visual-map";

import type { FC } from "react";


interface WalletColorFieldProps {
	value: string;
	onChange: (color: string) => void;
	disabled?: boolean;
	className?: string;
}

const WalletColorField: FC<WalletColorFieldProps> = ({
	value,
	onChange,
	disabled = false,
	className,
}) => (
	<FinanceColorPicker
		value={value}
		onValueChange={onChange}
		colors={WALLET_COLORS}
		disabled={disabled}
		label="Wallet colour"
		className={className}
	/>
);

WalletColorField.displayName = 'WalletColorField';

export { WalletColorField };
export type { WalletColorFieldProps };
