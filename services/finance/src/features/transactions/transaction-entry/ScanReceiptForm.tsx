import type { FC } from "react";

import { PanelFooter } from "@entity/management";

const SCAN_FIELDS = [
	{ label: 'Merchant', value: 'Whole Foods Market', ai: true },
	{ label: 'Date', value: 'Jun 18, 2026', ai: true },
	{ label: 'Category', value: 'Groceries', ai: true },
	{ label: 'Wallet', value: 'Main Checking', ai: false },
];

interface ScanReceiptFormProps {
	onClose: () => void;
}

const ScanReceiptForm: FC<ScanReceiptFormProps> = ({ onClose }) => (
	<>
		<div className="flex-1 overflow-auto p-5">
			<div className="mb-5 flex gap-4">
				<div className="relative w-[118px] flex-none overflow-hidden rounded-[10px] border border-border bg-[#f7f5ef] shadow-[var(--shadow)]">
					<div className="fx-scanline pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--glow)]" />
					<div className="px-2.5 py-3 font-numeric text-[#3a382f]">
						<div className="text-center text-[8px] font-semibold tracking-[0.1em]">WHOLE FOODS</div>
						<div className="mb-1.5 text-center text-[6px] opacity-60">MARKET · SF</div>
						<div className="my-1 h-px bg-[#d8d4c6]" />
						<div className="my-0.5 flex justify-between text-[6.5px]"><span>Bananas</span><span>3.20</span></div>
						<div className="my-0.5 flex justify-between text-[6.5px]"><span>Oat milk</span><span>5.49</span></div>
						<div className="my-0.5 flex justify-between text-[6.5px]"><span>Sourdough</span><span>6.00</span></div>
						<div className="my-1 h-px bg-[#d8d4c6]" />
						<div className="flex justify-between text-[8px] font-semibold"><span>TOTAL</span><span>86.40</span></div>
					</div>
				</div>
				<div className="flex-1">
					<div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1 text-[11.5px] font-semibold text-pos">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
						Extracted
					</div>
					<div className="text-[12.5px] leading-relaxed text-text-2">AI read this receipt and pre-filled the fields below. <span className="text-text-3">Review before saving.</span></div>
				</div>
			</div>
			<div className="mb-3.5 flex items-center justify-between rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
				<div>
					<div className="font-numeric text-[10.5px] uppercase tracking-[0.1em] text-text-3">Amount</div>
					<div className="font-display text-3xl font-semibold text-neg">−$86.40</div>
				</div>
				<span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] text-primary">98% sure</span>
			</div>
			{SCAN_FIELDS.map((field) => (
				<div key={field.label} className="flex items-center gap-3 border-b border-border py-2.5">
					<span className="w-24 text-[11.5px] text-text-3">{field.label}</span>
					<span className="flex flex-1 items-center gap-2 text-[13.5px] font-semibold">
						{field.value}
						{field.ai ? <span className="rounded-[4px] border border-[var(--accent-border)] px-1 font-numeric text-[8.5px] font-semibold text-primary">AI</span> : null}
					</span>
					<span className="cursor-pointer text-[11px] text-text-3">edit</span>
				</div>
			))}
		</div>
		<PanelFooter submitLabel="Save transaction" cancelLabel="Discard" onClose={onClose} />
	</>
);

ScanReceiptForm.displayName = 'ScanReceiptForm';

export { ScanReceiptForm };
export type { ScanReceiptFormProps };
