import { AiBadge, SlideOver } from "@shared/components";
import type { FC } from "react";
import { ScanReceiptForm } from "@widget/transactions";
import {useSlideOverContext} from "@shared/components/slide-over/context/use-context-value.ts";


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