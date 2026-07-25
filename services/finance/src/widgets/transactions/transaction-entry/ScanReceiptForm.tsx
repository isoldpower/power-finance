import type { FC } from "react";

import { ScanReceiptForm as ScanReceiptFormWrapper } from "@feature/transactions/transaction-entry";
import { ReceiptScanPreview } from "./ReceiptScanPreview.tsx";
import { PanelFooter } from "@shared/components";


interface ScanReceiptFormProps {
	onClose: () => void;
}

const ScanReceiptForm: FC<ScanReceiptFormProps> = ({ onClose }) => (
	<ScanReceiptFormWrapper onSuccess={onClose}>
		<ReceiptScanPreview />
		<PanelFooter 
			submitType="submit"
			submitLabel="Save transaction"
			cancelLabel="Discard"
			onClose={onClose}
		/>
	</ScanReceiptFormWrapper>
);

ScanReceiptForm.displayName = 'ScanReceiptForm';

export { ScanReceiptForm };
