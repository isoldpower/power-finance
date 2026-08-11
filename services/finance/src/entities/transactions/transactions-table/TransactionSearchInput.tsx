import { cn } from "@internal/ui-library";
import type { FC } from "react";
import { textClass } from "@shared/pure-components/typography";

interface TransactionSearchInputProps {
	value: string;
	onValueChange: (value: string) => void;
	onClear: () => void;
}

const TransactionSearchInput: FC<TransactionSearchInputProps> = ({ value, onValueChange, onClear }) => (
	<div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-3 py-2 focus-within:border-[var(--accent-border)]">
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
			<circle cx="11" cy="11" r="7" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
		<input
			value={value}
			onChange={(event) => { onValueChange(event.target.value); }}
			placeholder="Search description, amount, note…"
			className={cn(textClass({ size: '13' }), "min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-[var(--text-3)]")}
		/>
		{value ? (
			<button type="button" onClick={onClear} className={textClass({ size: 'sm', leading: 'none', tone: 'subtle' })}>✕</button>
		) : null}
	</div>
);

TransactionSearchInput.displayName = 'TransactionSearchInput';

export { TransactionSearchInput };
export type { TransactionSearchInputProps };
