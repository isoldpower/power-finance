import type { FC } from "react";
import { MetaText, Text } from "@shared/pure-components/typography";

const ReceiptPaper: FC = () => (
	<div className="relative w-[118px] flex-none overflow-hidden rounded-[10px] border border-border bg-[#f7f5ef] shadow-[var(--shadow)]">
		<div className="fx-scanline pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--glow)]" />
		<MetaText as="div" tone="default" className="px-2.5 py-3 text-[#3a382f]">
			<Text as="div" size="8" weight="semibold" tracking="0.1em" className="text-center">WHOLE FOODS</Text>
			<Text as="div" size="6" className="mb-1.5 text-center opacity-60">MARKET · SF</Text>
			<div className="my-1 h-px bg-[#d8d4c6]" />
			<Text as="div" size="6.5" className="my-0.5 flex justify-between"><span>Bananas</span><span>3.20</span></Text>
			<Text as="div" size="6.5" className="my-0.5 flex justify-between"><span>Oat milk</span><span>5.49</span></Text>
			<Text as="div" size="6.5" className="my-0.5 flex justify-between"><span>Sourdough</span><span>6.00</span></Text>
			<div className="my-1 h-px bg-[#d8d4c6]" />
			<Text as="div" size="8" weight="semibold" className="flex justify-between"><span>TOTAL</span><span>86.40</span></Text>
		</MetaText>
	</div>
);

ReceiptPaper.displayName = 'ReceiptPaper';

export { ReceiptPaper };
