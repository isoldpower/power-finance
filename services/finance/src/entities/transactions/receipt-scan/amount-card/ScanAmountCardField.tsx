import type { FC, PropsWithChildren } from "react";


type ScanAmountCardFieldProps = PropsWithChildren;

const ScanAmountCardField: FC<ScanAmountCardFieldProps> = ({ children }) => (
	<div>
		{children}
	</div>
);

ScanAmountCardField.displayName = 'ScanAmountCardField';

export { ScanAmountCardField };
export type { ScanAmountCardFieldProps };
