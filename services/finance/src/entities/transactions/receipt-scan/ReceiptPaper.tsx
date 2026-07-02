import type { FC } from "react";

const ReceiptPaper: FC = () => (
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
);

ReceiptPaper.displayName = 'ReceiptPaper';

export { ReceiptPaper };
