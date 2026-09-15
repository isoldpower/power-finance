import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceToaster, financeToast } from "./FinanceToast.tsx";
import { FinanceButton } from "./FinanceButton.tsx";

const meta = {
	title: "Finance/FinanceToast",
	component: FinanceToaster,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`FinanceToaster` renders transient toasts in the finance design language — the shadcn Toast component (Base UI) composed and restyled with the `.finance-theme` tokens. Toasts stack, peek and expand on hover; swipe to dismiss.",
					"Mount it once at the app root, then fire toasts from anywhere with `financeToast({ title, tone })`. It returns a handle whose `update` rewrites the same toast in place — that is how a request's pending toast becomes its success or error toast.",
					"`tone` becomes the Base UI toast `type`, which picks both the icon and the accent rail: `success`, `error`, `warning`, `info`, `loading`, or `default`.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta<typeof FinanceToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const Showcase = () => (
	<div className="finance-theme flex flex-wrap gap-2 p-6">
		<FinanceButton onClick={() => financeToast({ title: "Transaction added" })}>
			Default
		</FinanceButton>
		<FinanceButton
			variant="secondary"
			onClick={() => financeToast({ tone: "success", title: "Transaction created", description: "Groceries · -$42.10" })}
		>
			Success
		</FinanceButton>
		<FinanceButton
			variant="secondary"
			onClick={() => financeToast({ tone: "error", title: "Couldn't create transaction", description: "The wallet is no longer available." })}
		>
			Error
		</FinanceButton>
		<FinanceButton
			variant="secondary"
			onClick={() => financeToast({ tone: "warning", title: "Wallet balance is low", description: "Checking · $12.40 left" })}
		>
			Warning
		</FinanceButton>
		<FinanceButton
			variant="secondary"
			onClick={() => financeToast({ tone: "info", title: "Statement is ready" })}
		>
			Info
		</FinanceButton>
		<FinanceButton
			variant="ghost"
			onClick={() => {
				const handle = financeToast({ tone: "loading", title: "Creating transaction…" });
				setTimeout(() => { handle.update({ tone: "success", title: "Transaction created" }); }, 1200);
			}}
		>
			Pending → settled
		</FinanceButton>
		<FinanceToaster />
	</div>
);

export const Default: Story = {
	parameters: { docs: { description: { story: "Every tone, plus a pending toast that is updated in place into a success toast." } } },
	render: () => <Showcase />,
};
