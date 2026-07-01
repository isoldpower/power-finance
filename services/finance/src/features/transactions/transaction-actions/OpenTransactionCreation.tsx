import { UiButton, Icons, UiDialog, UiDialogContent, UiDialogTrigger, UiDialogHeader, UiDialogTitle } from "@internal/ui-library";
import type { FC, ReactNode, ComponentProps } from "react";


interface OpenTransactionCreationProps extends ComponentProps<typeof UiButton> {
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
		<UiDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<UiDialogTrigger asChild>
				<UiButton
					onClick={() => { setIsModalOpen(true); }}
					variant="outline"
					{...props}
				>
					<Icons.Plus size={16} className="mr-1" />
					Add Transaction
				</UiButton>
			</UiDialogTrigger>
			<UiDialogContent>
				<UiDialogHeader>
					<UiDialogTitle>
						Add Transaction
					</UiDialogTitle>
				</UiDialogHeader>
				{children}
			</UiDialogContent>
		</UiDialog>
	);
}

OpenTransactionCreation.displayName = 'OpenTransactionCreation';

export { OpenTransactionCreation };
export type { OpenTransactionCreationProps };
