import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import {
	Toast,
	ToastAction,
	ToastClose,
	ToastContent,
	ToastDescription,
	ToastIcon,
	ToastPortal,
	ToastProvider,
	ToastTitle,
	ToastViewport,
	toast,
	useToastManager,
} from "@/entities/shadcn";

const financeToastVariants = cva(
	// `finance-theme` re-establishes design tokens — Base UI portals the viewport to body.
	"finance-theme rounded-[var(--radius-lg)] border-border bg-card text-foreground",
	{
		variants: {
			tone: {
				default: "",
				success: "border-l-[3px] border-l-pos [&_[data-slot=toast-icon]]:text-pos",
				error: "border-l-[3px] border-l-neg [&_[data-slot=toast-icon]]:text-neg",
				warning: "border-l-[3px] border-l-warn [&_[data-slot=toast-icon]]:text-warn",
				info: "border-l-[3px] border-l-primary [&_[data-slot=toast-icon]]:text-primary",
				loading: "border-l-[3px] border-l-[var(--accent-border)] [&_[data-slot=toast-icon]]:text-primary",
			},
		},
		defaultVariants: {
			tone: "default",
		},
	}
);

type FinanceToastTone = NonNullable<VariantProps<typeof financeToastVariants>["tone"]>

const PERSIST_TIMEOUT = 0;

interface FinanceToastInput {
	title: React.ReactNode
	description?: React.ReactNode
	tone?: FinanceToastTone
	duration?: number
}

interface FinanceToastHandle {
	id: string
	dismiss: () => void
	update: (input: FinanceToastInput) => void
}

const toAddOptions = ({ tone = "default", duration, ...input }: FinanceToastInput) => ({
	...input,
	type: tone,
	timeout: duration ?? (tone === "loading" ? PERSIST_TIMEOUT : undefined),
});

function financeToast(input: FinanceToastInput): FinanceToastHandle {
	const id = toast.add(toAddOptions(input));

	return {
		id,
		dismiss: () => { toast.close(id); },
		update: (next: FinanceToastInput) => { toast.update(id, toAddOptions(next)); },
	};
}

function dismissFinanceToasts(id?: string): void {
	toast.close(id);
}

function FinanceToastList() {
	const { toasts } = useToastManager();

	return toasts.map((item) => (
		<Toast
			key={item.id}
			toast={item}
			className={cn(financeToastVariants({ tone: item.type as FinanceToastTone }))}
			style={{ boxShadow: "var(--shadow-lg)" }}
		>
			<ToastContent className="gap-3 p-3.5">
				<ToastIcon type={item.type} />
				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<ToastTitle className="text-[13.5px] font-semibold leading-snug" />
					<ToastDescription className="text-[11.5px] leading-snug text-text-2" />
				</div>
				<ToastAction />
				<ToastClose className="text-text-3 hover:text-foreground" />
			</ToastContent>
		</Toast>
	));
}

type FinanceToasterProps = React.ComponentProps<typeof ToastProvider>

function FinanceToaster({ children, limit = 5, ...props }: FinanceToasterProps) {
	return (
		<ToastProvider toastManager={toast} limit={limit} {...props}>
			{children}
			<ToastPortal>
				<ToastViewport className="finance-theme">
					<FinanceToastList />
				</ToastViewport>
			</ToastPortal>
		</ToastProvider>
	);
}

export { FinanceToaster, financeToast, dismissFinanceToasts, financeToastVariants };
export type { FinanceToasterProps, FinanceToastHandle, FinanceToastInput, FinanceToastTone };
