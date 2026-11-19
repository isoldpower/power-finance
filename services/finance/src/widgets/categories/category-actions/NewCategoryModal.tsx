import {
	UiDialog,
	UiDialogDescription,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import { ShowOn } from "@internal/shared";
import { ModalContent, useDisclosure } from "@shared/overlays";
import { NewCategoryForm } from "./forms/NewCategoryForm.tsx";

import type { FC, PropsWithChildren } from "react";
import type { CategoryKind } from "@entity/categories";


type NewCategoryModalProps = PropsWithChildren<{
	kind: CategoryKind;
}>;

const NewCategoryModal: FC<NewCategoryModalProps> = ({ kind, children }) => {
	const { open, setOpen, onClose } = useDisclosure();

	return (
		<UiDialog open={open} onOpenChange={setOpen}>
			<UiDialogTrigger asChild={true}>
				{children}
			</UiDialogTrigger>
			<ModalContent>
				<UiDialogHeader>
					<UiDialogTitle>
						{`New ${kind} category`}
					</UiDialogTitle>
					<UiDialogDescription>
						{`It shows up in every ${kind} category picker right away.`}
					</UiDialogDescription>
				</UiDialogHeader>
				<ShowOn condition={open}>
					<NewCategoryForm
						kind={kind}
						onCreated={onClose}
						onCancel={onClose}
					/>
				</ShowOn>
			</ModalContent>
		</UiDialog>
	);
};

NewCategoryModal.displayName = 'NewCategoryModal';

export { NewCategoryModal };
export type { NewCategoryModalProps };
