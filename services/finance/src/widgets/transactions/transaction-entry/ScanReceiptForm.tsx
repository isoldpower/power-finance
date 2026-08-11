import type { FC } from "react";

import { ScanReceiptForm as ScanReceiptFormWrapper } from "@feature/transactions";
import { ReceiptScanPreview } from "./ReceiptScanPreview.tsx";
import { PanelFooter } from "@shared/forms";


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
