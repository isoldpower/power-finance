import { Button, Icons, Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@internal/ui-library";
import type { FC, ReactNode } from "react";

import { useTransactionModal } from "./useTransactionModal.ts";
import type { UseTransactionModalOptions } from "./useTransactionModal.ts";


interface OpenTransactionCreationProps extends UseTransactionModalOptions{
	children: ReactNode;
}

const OpenTransactionCreation: FC<OpenTransactionCreationProps> = ({
	children,
	...options
}) => {
	const { open, openTransactionModal } = useTransactionModal(options);

	return (
		<>
			<Dialog open={open} onOpenChange={openTransactionModal}>
				<DialogTrigger asChild>
					<Button
						onClick={() => openTransactionModal(true)}
						variant="outline"
						className="bg-white/10 text-white border-white/20 hover:bg-white/20"
					>
						<Icons.Plus size={16} className="mr-1" />
						Add Transaction
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Add Transaction
						</DialogTitle>
					</DialogHeader>
					{children}
				</DialogContent>
			</Dialog>
		</>
	);
}

OpenTransactionCreation.displayName = 'OpenTransactionCreation';

export { OpenTransactionCreation };
export type { OpenTransactionCreationProps };
