import { useCallback } from "react";

import { SlideOver } from "@shared/overlays";
import { useSlideOverContext } from "@shared/overlays";
import { AddTransactionForm } from "@widget/transactions";

import type { FC } from "react";


interface CreateTransactionProcessProps {
	scanPanelId: string;
}

const CreateTransactionProcess: FC<CreateTransactionProcessProps> = ({ scanPanelId }) => {
	const { onClose, onSwitch } = useSlideOverContext();

	const handleScanReceipt = useCallback(() => {
		onSwitch(scanPanelId);
	}, [onSwitch, scanPanelId]);

	return (
		<>
			<SlideOver.Heading>
				<SlideOver.Title>
					New transaction
				</SlideOver.Title>
				<SlideOver.Collapse>
					✕
				</SlideOver.Collapse>
			</SlideOver.Heading>
			<AddTransactionForm onClose={onClose} onScanReceipt={handleScanReceipt} />
		</>
	);
}

CreateTransactionProcess.displayName = 'CreateTransactionProcess';

export { CreateTransactionProcess };
export type { CreateTransactionProcessProps };
