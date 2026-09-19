import type { FC, PropsWithChildren } from "react";


type CurrencyPickerLabelProps = PropsWithChildren;

const CurrencyPickerLabel: FC<CurrencyPickerLabelProps> = ({ children }) => (
	<span className="truncate">
		{children}
	</span>
);

CurrencyPickerLabel.displayName = 'CurrencyPickerLabel';

export { CurrencyPickerLabel };
export type { CurrencyPickerLabelProps };
