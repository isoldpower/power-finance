import type { FC, ReactNode } from "react";


interface CurrencyPickerOptionCodeProps {
	children: ReactNode;
}

const CurrencyPickerOptionCode: FC<CurrencyPickerOptionCodeProps> = ({
	children,
}) => {
	return (
		<span className="w-8 shrink-0 font-semibold">
			{children}
		</span>
	);
}

export { CurrencyPickerOptionCode };