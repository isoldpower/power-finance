import { UiButton, UiDialog, UiDialogContent, UiDialogTrigger, Icons } from "@internal/ui-library";
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
		<UiDialog
			open={isModalOpen}
			onOpenChange={setIsModalOpen}
		>
			<UiDialogTrigger asChild>
				<UiButton
					className="flex items-center gap-2"
					variant="outline"
					onClick={() => { setIsModalOpen(true); }}
				>
					<Icons.Filter size={16} />
					Filter
				</UiButton>
			</UiDialogTrigger>
			<UiDialogContent>
				{children}
			</UiDialogContent>
		</UiDialog>
	);
};

OpenTransactionFilters.displayName = 'OpenTransactionFilters';

export { OpenTransactionFilters };
export type { OpenTransactionFiltersProps };