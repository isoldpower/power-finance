import type { FC, ReactNode } from "react";


interface CurrencyPickerOptionTitleProps {
	children: ReactNode;
}

const CurrencyPickerOptionTitle: FC<CurrencyPickerOptionTitleProps> = ({
	children,
}) => {
	return (
		<span className="font-numeric text-[10.5px] text-text-3">
			{children}
		</span>
	);
}

export { CurrencyPickerOptionTitle };