import { Button, Icons, Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@internal/ui-library";
import type { FC, ReactNode } from "react";


interface OpenTransactionCreationProps {
	children: ReactNode;
	newTransactionOpen: boolean;
	setNewTransactionOpen: (open: boolean) => void;
}

const OpenTransactionCreation: FC<OpenTransactionCreationProps> = ({
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
