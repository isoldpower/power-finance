import { Text } from "@internal/shared";

import type { FC } from "react";


interface ReceiptPaperTotalProps {
	label: string;
	amount: string;
}

const ReceiptPaperTotal: FC<ReceiptPaperTotalProps> = ({ label, amount }) => (
	<Text as="div" size="8" weight="semibold" className="flex justify-between">
		<span>{label}</span>
		<span>{amount}</span>
	</Text>
);

ReceiptPaperTotal.displayName = 'ReceiptPaperTotal';

export { ReceiptPaperTotal };
export type { ReceiptPaperTotalProps };
