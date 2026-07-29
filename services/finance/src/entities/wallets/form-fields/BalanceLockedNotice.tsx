import type { FC } from "react";


const BalanceLockedNotice: FC = () => (
	<div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-border bg-secondary px-3 py-2.5">
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none">
			<rect x="3" y="11" width="18" height="11" rx="2" />
			<path d="M7 11V7a5 5 0 0 1 10 0v4" />
		</svg>
		<span className="text-[11.5px] leading-snug text-text-2">Balance is posted automatically from transactions and can’t be edited here.</span>
	</div>
);

BalanceLockedNotice.displayName = 'BalanceLockedNotice';

export { BalanceLockedNotice };
