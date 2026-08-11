import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";


interface ScanReceiptFormProps {
	onSuccess?: () => void;
	children?: ReactNode;
}

function ScanReceiptForm({ onSuccess, children }: ScanReceiptFormProps) {
	// Scan receipt has no real mutation yet — the wrapper just intercepts submit
	// and closes, so the widget can stay a pure `type="submit"` form like the others.
	const handleSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSuccess?.();
	}, [onSuccess]);

	return (
		<form onSubmit={handleSubmitForm} className="flex flex-1 flex-col overflow-hidden">
			{children}
		</form>
	);
}

ScanReceiptForm.displayName = 'ScanReceiptForm';

export { ScanReceiptForm };
export type { ScanReceiptFormProps };
