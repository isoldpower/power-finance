import { ScanReceiptContainer } from "./ScanReceiptContainer.tsx";
import { ScanReceiptTitle } from "./ScanReceiptTitle.tsx";
import { ScanReceiptParagraph } from "./ScanReceiptParagraph.tsx";


function ScanReceiptCta(){
	return null;
}

ScanReceiptCta.displayName = 'ScanReceiptCta';
ScanReceiptCta.Container = ScanReceiptContainer;
ScanReceiptCta.Title = ScanReceiptTitle;
ScanReceiptCta.Paragraph = ScanReceiptParagraph;

export { ScanReceiptCta };
