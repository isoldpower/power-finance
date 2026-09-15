import type { FinanceToastHandle } from "@internal/ui-library";

import type { ToastId } from "./types.ts";


const handles = new Map<ToastId, FinanceToastHandle>();

const rememberToast = (id: ToastId, handle: FinanceToastHandle): void => {
	handles.set(id, handle);
};

const recallToast = (id: ToastId | undefined): FinanceToastHandle | undefined =>
	id === undefined ? undefined : handles.get(id);

const forgetToast = (id: ToastId | undefined): void => {
	if (id === undefined) {
		handles.clear();
		return;
	}

	handles.delete(id);
};

export { forgetToast, recallToast, rememberToast };
