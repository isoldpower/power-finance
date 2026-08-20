import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface ReceiptPaperLineProps {
	label: string;
	amount: string;
}

const ReceiptPaperLine: FC<ReceiptPaperLineProps> = ({ label, amount }) => (
	<Text as="div" size="6.5" className="my-0.5 flex justify-between">
		<span>{label}</span>
		<span>{amount}</span>
	</Text>
);

ReceiptPaperLine.displayName = 'ReceiptPaperLine';

export { ReceiptPaperLine };
export type { ReceiptPaperLineProps };
