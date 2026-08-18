import { PanelFooter } from "@shared/forms";
import { BodyText, Text } from "@shared/pure-components/typography";
import { ShowOn } from "@shared/visibility";
import { useLocaleCurrency } from "@shared/formatting";
import { ScanReceiptForm as ScanReceiptFormAction, useReceiptScan } from "@feature/transactions";
import { ExtractedBadge, ReceiptPaper, ScanAmountCard, ScanFieldRow } from "@entity/transactions";
import { RECEIPT_BRANCH, RECEIPT_BRAND, RECEIPT_LINES, RECEIPT_TOTAL } from "./receipt-preview-config.ts";

import type { FC } from "react";


interface ScanReceiptFormProps {
	onClose: () => void;
}

const ScanReceiptForm: FC<ScanReceiptFormProps> = ({ onClose }) => {
	const { scan } = useReceiptScan();
	const formatMoney = useLocaleCurrency();
	
	return (
		<ScanReceiptFormAction onSuccess={onClose}>
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
								<ReceiptPaper.Line
									key={line.label}
									label={line.label}
									amount={line.amount}
								/>
							))}
							<ReceiptPaper.Divider />
							<ReceiptPaper.Total
								label={RECEIPT_TOTAL.label}
								amount={RECEIPT_TOTAL.amount}
							/>
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
				<ShowOn condition={scan}>
					{(scanProtected) => (<>
						<ScanAmountCard>
							<ScanAmountCard.Field>
								<ScanAmountCard.Label>
									Amount
								</ScanAmountCard.Label>
								<ScanAmountCard.Value>
									{formatMoney(
										-scanProtected.amount,
										scanProtected.currency
									)}
								</ScanAmountCard.Value>
							</ScanAmountCard.Field>
							<ScanAmountCard.Confidence>
								{Math.round(scanProtected.confidence * 100)}% sure
							</ScanAmountCard.Confidence>
						</ScanAmountCard>
						{scanProtected.fields.map((field) => (
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
					</>)}
				</ShowOn>
			</div>
			<PanelFooter 
				submitType="submit"
				submitLabel="Save transaction"
				cancelLabel="Discard"
				onClose={onClose}
			/>
		</ScanReceiptFormAction>
	);
}

ScanReceiptForm.displayName = 'ScanReceiptForm';

export { ScanReceiptForm };
