import { ExtractedBadge, ReceiptPaper, ScanAmountCard, ScanFieldRow } from "@entity/transactions";
import { useReceiptScan } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/formatting";
import { BodyText, Text } from "@shared/pure-components/typography";
import { RECEIPT_BRAND, RECEIPT_BRANCH, RECEIPT_LINES, RECEIPT_TOTAL } from "./receipt-preview-config.ts";

import type { FC } from "react";


const ReceiptScanPreview: FC = () => {
	const { scan } = useReceiptScan();
	const formatMoney = useLocaleCurrency();

	return (
		<div className="flex-1 overflow-auto p-5">
			<div className="mb-5 flex gap-4">
				<ReceiptPaper>
					<ReceiptPaper.Scanline />
					<ReceiptPaper.Body>
						<ReceiptPaper.Brand>
							{RECEIPT_BRAND}
						</ReceiptPaper.Brand>
						<ReceiptPaper.Branch>
							{RECEIPT_BRANCH}
						</ReceiptPaper.Branch>
						<ReceiptPaper.Divider />
						{RECEIPT_LINES.map((line) => (
							<ReceiptPaper.Line key={line.label} label={line.label} amount={line.amount} />
						))}
						<ReceiptPaper.Divider />
						<ReceiptPaper.Total label={RECEIPT_TOTAL.label} amount={RECEIPT_TOTAL.amount} />
					</ReceiptPaper.Body>
				</ReceiptPaper>
				<div className="flex-1">
					<ExtractedBadge />
					<BodyText as="div" size="12.5" leading="relaxed">
						AI read this receipt and pre-filled the fields below.
						{' '}
						<Text tone="subtle">Review before saving.</Text>
					</BodyText>
				</div>
			</div>
			{scan ? (
				<>
					<ScanAmountCard>
						<ScanAmountCard.Field>
							<ScanAmountCard.Label>
								Amount
							</ScanAmountCard.Label>
							<ScanAmountCard.Value>
								{formatMoney(-scan.amount, scan.currency)}
							</ScanAmountCard.Value>
						</ScanAmountCard.Field>
						<ScanAmountCard.Confidence>
							{Math.round(scan.confidence * 100)}% sure
						</ScanAmountCard.Confidence>
					</ScanAmountCard>
					{scan.fields.map((field) => (
						<ScanFieldRow key={field.label}>
							<ScanFieldRow.Label>
								{field.label}
							</ScanFieldRow.Label>
							<ScanFieldRow.Value>
								{field.value}
								{field.ai ? (
									<ScanFieldRow.AiBadge>
										AI
									</ScanFieldRow.AiBadge>
								) : null}
							</ScanFieldRow.Value>
							<ScanFieldRow.Action>
								edit
							</ScanFieldRow.Action>
						</ScanFieldRow>
					))}
				</>
			) : null}
		</div>
	);
};

ReceiptScanPreview.displayName = 'ReceiptScanPreview';

export { ReceiptScanPreview };
