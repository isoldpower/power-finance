import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerOptionCodeProps = PropsWithChildren;

const CurrencyPickerOptionCode: FC<CurrencyPickerOptionCodeProps> = ({ children }) => (
	<Text weight="semibold" className="w-8 shrink-0">
		{children}
	</Text>
);

CurrencyPickerOptionCode.displayName = 'CurrencyPickerOptionCode';

export { CurrencyPickerOptionCode };
export type { CurrencyPickerOptionCodeProps };
