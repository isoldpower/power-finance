import { AiBadge } from "@shared/pure-components/badges";
import { SlideOver } from "@shared/overlays";
import { useSlideOverContext } from "@shared/overlays";
import { ScanReceiptForm } from "@widget/transactions";

import type { FC } from "react";


const ScanReceiptProcess: FC = () => {
	const { onClose } = useSlideOverContext();
	
	return (
		<>
			<SlideOver.Heading>
				<SlideOver.Title>
					<span className="flex items-center gap-2">
						Scan receipt <AiBadge />
					</span>
				</SlideOver.Title>
				<SlideOver.Collapse>
					✕
				</SlideOver.Collapse>
			</SlideOver.Heading>
			<ScanReceiptForm onClose={onClose} />
		</>
	);
}

export { ScanReceiptProcess };