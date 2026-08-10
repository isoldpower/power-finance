import { useCallback } from "react";

import { useDeleteAutomation } from "../data-presenters";

import type { FC, ReactNode } from "react";


interface DeleteRuleApi {
	isPending: boolean;
	deleteRule: (onDeleted: () => void) => void;
}

interface DeleteRuleDialogProps {
	id: string;
	children: ((api: DeleteRuleApi) => ReactNode) | ReactNode;
}

const DeleteRuleDialog: FC<DeleteRuleDialogProps> = ({ id, children }) => {
	const deleteAutomation = useDeleteAutomation();

	const deleteRule = useCallback((onDeleted: () => void) => {
		deleteAutomation.mutate(id, { onSuccess: onDeleted });
	}, [deleteAutomation, id]);

	return typeof children === 'function'
		? children({ deleteRule, isPending: deleteAutomation.isPending })
		: children;
}

DeleteRuleDialog.displayName = 'DeleteRuleDialog';

export { DeleteRuleDialog };
export type { DeleteRuleDialogProps, DeleteRuleApi };
