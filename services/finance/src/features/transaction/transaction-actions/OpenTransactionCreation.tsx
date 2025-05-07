import { Button, Icons, Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@internal/ui-library";
import type { FC, ReactNode, ComponentProps } from "react";


interface OpenTransactionCreationProps extends ComponentProps<typeof Button> {
	children: ReactNode;
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
}

const OpenTransactionCreation: FC<OpenTransactionCreationProps> = ({
	children,
	isModalOpen,
	setIsModalOpen,
	...props
}) => {
	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button
					onClick={() => { setIsModalOpen(true); }}
					variant="outline"
					className="bg-white/10 text-white border-white/20 hover:bg-white/20"
					{...props}
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
	);
}

OpenTransactionCreation.displayName = 'OpenTransactionCreation';

export { OpenTransactionCreation };
export type { OpenTransactionCreationProps };
