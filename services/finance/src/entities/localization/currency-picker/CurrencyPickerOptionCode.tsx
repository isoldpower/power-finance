import type { FC, ReactNode } from "react";
import { Text } from "@shared/pure-components/typography";


interface CurrencyPickerOptionCodeProps {
	children: ReactNode;
}

const CurrencyPickerOptionCode: FC<CurrencyPickerOptionCodeProps> = ({
	children,
}) => {
	return (
		<Text weight="semibold" className="w-8 shrink-0">
			{children}
		</Text>
	);
}

export { CurrencyPickerOptionCode };