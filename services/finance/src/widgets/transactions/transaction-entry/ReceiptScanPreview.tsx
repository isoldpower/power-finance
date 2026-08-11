import type { FC } from "react";

import { ReceiptPaper, ExtractedBadge, ScanAmountCard, ScanFieldRow } from "@entity/transactions";
import { useReceiptScan } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/formatting";
import { BodyText, Text } from "@shared/pure-components/typography";


const ReceiptScanPreview: FC = () => {
	const { scan } = useReceiptScan();
	const formatMoney = useLocaleCurrency();

	return (
		<div className="flex-1 overflow-auto p-5">
			<div className="mb-5 flex gap-4">
				<ReceiptPaper />
				<div className="flex-1">
					<ExtractedBadge />
					<BodyText as="div" size="12.5" leading="relaxed">AI read this receipt and pre-filled the fields below. <Text tone="subtle">Review before saving.</Text></BodyText>
				</div>
			</div>
			{scan ? (
				<>
					<ScanAmountCard
						amountFormatted={formatMoney(-scan.amount, scan.currency)}
						confidence={`${Math.round(scan.confidence * 100).toString()}% sure`}
					/>
					{scan.fields.map((field) => (
						<ScanFieldRow key={field.label} label={field.label} value={field.value} ai={field.ai} />
					))}
				</>
			) : null}
		</div>
	);
};

ReceiptScanPreview.displayName = 'ReceiptScanPreview';

export { ReceiptScanPreview };
