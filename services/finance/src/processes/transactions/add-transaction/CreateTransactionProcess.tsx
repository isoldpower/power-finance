import { SlideOver } from "@shared/components";

import type { FC } from "react";
import { AddTransactionForm } from "@widget/transactions";
import { useSlideOverContext } from "@shared/components/slide-over/context/use-context-value.ts";


const CreateTransactionProcess: FC = () => {
	const { onClose, onSwitch } = useSlideOverContext();
	
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
			<AddTransactionForm onClose={onClose} onSwitch={onSwitch} />
		</>
	);
}

export { CreateTransactionProcess };