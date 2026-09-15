type ToastId = string;

type ToastTone = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

interface ToastOptions {
	id?: ToastId;
	description?: string;
	duration?: number;
}

export type { ToastId, ToastOptions, ToastTone };
