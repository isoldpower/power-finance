import { Button, Icons } from "@internal/ui-library";
import type { FC, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@internal/ui-library";

interface OpenTransactionModalProps {
	children: ReactNode;
	newTransactionOpen: boolean;
	setNewTransactionOpen: (open: boolean) => void;
}

const OpenTransactionModal: FC<OpenTransactionModalProps> = ({
	children,
	newTransactionOpen,
	setNewTransactionOpen
}) => {
	return (
		<>
			<Dialog open={newTransactionOpen} onOpenChange={setNewTransactionOpen}>
				<DialogTrigger asChild>
					<Button
						onClick={() => setNewTransactionOpen(true)}
						variant="outline"
						className="bg-white/10 text-white border-white/20 hover:bg-white/20"
					>
						<Icons.Plus size={16} className="mr-1" />
						Add Transaction
					</Button>
				</DialogTrigger>
				<DialogContent>
					{children}
				</DialogContent>
			</Dialog>
		</>
	);
}

OpenTransactionModal.displayName = 'OpenTransactionModal';

export { OpenTransactionModal };
export type { OpenTransactionModalProps };
