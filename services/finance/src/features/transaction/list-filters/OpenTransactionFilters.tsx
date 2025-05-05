import { Button, Dialog, DialogContent, DialogTrigger, Icons } from "@internal/ui-library";
import type { FC, ReactNode } from "react";


interface OpenTransactionFiltersProps {
	children: ReactNode;
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
}

const OpenTransactionFilters: FC<OpenTransactionFiltersProps> = ({
	children,
	setIsModalOpen,
	isModalOpen
}) => {
	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={setIsModalOpen}
		>
			<DialogTrigger asChild>
				<Button
					className="flex items-center gap-2"
					variant="outline"
					onClick={() => setIsModalOpen(true)}
				>
					<Icons.Filter size={16} />
					Filter
				</Button>
			</DialogTrigger>
			<DialogContent>
				{children}
			</DialogContent>
		</Dialog>
	);
};

OpenTransactionFilters.displayName = 'OpenTransactionFilters';

export { OpenTransactionFilters };
export type { OpenTransactionFiltersProps };