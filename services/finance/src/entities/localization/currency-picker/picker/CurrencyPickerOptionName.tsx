import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerOptionNameProps = PropsWithChildren;

const CurrencyPickerOptionName: FC<CurrencyPickerOptionNameProps> = ({ children }) => (
	<MetaText size="10.5">
		{children}
	</MetaText>
);

CurrencyPickerOptionName.displayName = 'CurrencyPickerOptionName';

export { CurrencyPickerOptionName };
export type { CurrencyPickerOptionNameProps };
