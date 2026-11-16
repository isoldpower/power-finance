import {
	UiDialog,
	UiDialogDescription,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import { ShowOn } from "@internal/shared";
import { ModalContent, useDisclosure } from "@shared/overlays";
import { RenameCategoryForm } from "./forms/RenameCategoryForm.tsx";

import type { FC, PropsWithChildren } from "react";
import type { Category } from "@entity/categories";


type RenameCategoryModalProps = PropsWithChildren<{
	category: Category;
}>;

const RenameCategoryModal: FC<RenameCategoryModalProps> = ({ category, children }) => {
	const { open, setOpen, onClose } = useDisclosure();

	return (
		<UiDialog open={open} onOpenChange={setOpen}>
			<UiDialogTrigger asChild={true}>
				{children}
			</UiDialogTrigger>
			<ModalContent>
				<UiDialogHeader>
					<UiDialogTitle>
						Rename category
					</UiDialogTitle>
					<UiDialogDescription>
						{`Every ${category.kind} using it shows the new name.`}
					</UiDialogDescription>
				</UiDialogHeader>
				<ShowOn condition={open}>
					<RenameCategoryForm
						category={category}
						onRenamed={onClose}
						onCancel={onClose}
					/>
				</ShowOn>
			</ModalContent>
		</UiDialog>
	);
};

RenameCategoryModal.displayName = 'RenameCategoryModal';

export { RenameCategoryModal };
export type { RenameCategoryModalProps };
