import type { FC } from "react";

import { ReceiptPaper, ExtractedBadge, ScanAmountCard, ScanFieldRow } from "@entity/transactions";
import { MOCK_SCAN_FIELDS, MOCK_SCAN_AMOUNT, MOCK_SCAN_CONFIDENCE } from "@feature/transactions";

const ReceiptScanPreview: FC = () => (
	<div className="flex-1 overflow-auto p-5">
		<div className="mb-5 flex gap-4">
			<ReceiptPaper />
			<div className="flex-1">
				<ExtractedBadge />
				<div className="text-[12.5px] leading-relaxed text-text-2">AI read this receipt and pre-filled the fields below. <span className="text-text-3">Review before saving.</span></div>
			</div>
		</div>
		<ScanAmountCard amountFormatted={MOCK_SCAN_AMOUNT} confidence={MOCK_SCAN_CONFIDENCE} />
		{MOCK_SCAN_FIELDS.map((field) => (
			<ScanFieldRow key={field.label} label={field.label} value={field.value} ai={field.ai} />
		))}
	</div>
);

ReceiptScanPreview.displayName = 'ReceiptScanPreview';

export { ReceiptScanPreview };
