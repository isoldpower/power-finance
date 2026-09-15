import { dismissFinanceToasts, financeToast } from "@internal/ui-library";

import { forgetToast, recallToast, rememberToast } from "./toast-registry.ts";

import type { ToastId, ToastOptions, ToastTone } from "./types.ts";


const show = (tone: ToastTone, message: string, options?: ToastOptions): ToastId => {
	const input = {
		tone,
		title: message,
		description: options?.description,
		duration: options?.duration,
	};

	const pending = recallToast(options?.id);
	const handle = pending ?? financeToast(input);

	if (pending !== undefined) {
		pending.update(input);
	}

	if (options?.id === undefined) {
		return handle.id;
	}

	if (tone === 'loading') {
		rememberToast(options.id, handle);
	} else {
		forgetToast(options.id);
	}

	return options.id;
};

const notify = {
	pending: (message: string, options?: ToastOptions): ToastId => show('loading', message, options),
	success: (message: string, options?: ToastOptions): ToastId => show('success', message, options),
	error: (message: string, options?: ToastOptions): ToastId => show('error', message, options),
	warning: (message: string, options?: ToastOptions): ToastId => show('warning', message, options),
	info: (message: string, options?: ToastOptions): ToastId => show('info', message, options),
	dismiss: (id?: ToastId): void => {
		dismissFinanceToasts(id);
		forgetToast(id);
	},
};

export { notify };
