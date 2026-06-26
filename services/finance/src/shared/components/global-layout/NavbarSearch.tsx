import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getFinanceRoute, type FinanceRoutes } from "@internal/shared";
import { cn } from "@internal/ui-library";

import { useWalletsList } from "@feature/wallet";

interface PageEntry {
	route: keyof FinanceRoutes;
	label: string;
	hint: string;
}

const PAGES: PageEntry[] = [
	{ route: 'dashboard', label: 'Dashboard', hint: 'Net worth, cash flow, activity' },
	{ route: 'management', label: 'Management', hint: 'Wallets, transactions, ledger' },
	{ route: 'planning', label: 'Planning', hint: 'Goals, automations, AI' },
	{ route: 'settings', label: 'Settings', hint: 'Preferences and account' },
];

interface ResultItem {
	key: string;
	label: string;
	meta: string;
	to: string;
}

const NavbarSearch: FC = () => {
	const navigate = useNavigate();
	const { wallets } = useWalletsList();
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setOpen(true);
				inputRef.current?.focus();
			}
			if (event.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKeyDown);
		return () => { window.removeEventListener('keydown', onKeyDown); };
	}, []);

	const pageResults = useMemo<ResultItem[]>(() => {
		const needle = query.trim().toLowerCase();
		return PAGES
			.filter((page) => `${page.label} ${page.hint}`.toLowerCase().includes(needle))
			.map((page) => ({ key: page.route, label: page.label, meta: page.hint, to: getFinanceRoute(page.route) }));
	}, [query]);

	const walletResults = useMemo<ResultItem[]>(() => {
		const needle = query.trim().toLowerCase();
		return wallets
			.filter((wallet) => wallet.name.toLowerCase().includes(needle))
			.slice(0, 6)
			.map((wallet) => ({
				key: wallet.id,
				label: wallet.name,
				meta: `${wallet.balance.currency}${wallet.credit ? ' · Credit' : ''}`,
				to: getFinanceRoute('management'),
			}));
	}, [query, wallets]);

	const hasResults = pageResults.length > 0 || walletResults.length > 0;

	const select = (to: string) => {
		setOpen(false);
		setQuery('');
		inputRef.current?.blur();
		void navigate({ to });
	};

	const renderGroup = (heading: string, items: ResultItem[]) => (
		items.length > 0 ? (
			<div className="p-1">
				<div className="px-2 pb-1 pt-1.5 font-numeric text-[9.5px] uppercase tracking-[0.1em] text-text-3">{heading}</div>
				{items.map((item) => (
					<button
						key={item.key}
						type="button"
						onMouseDown={(event) => { event.preventDefault(); select(item.to); }}
						className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-left text-[13px] hover:bg-secondary"
					>
						<span className="font-medium">{item.label}</span>
						<span className="ml-auto truncate pl-2 font-numeric text-[11px] text-text-3">{item.meta}</span>
					</button>
				))}
			</div>
		) : null
	);

	return (
		<div className="relative hidden md:block">
			<div className={cn(
				"flex items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-[13px] transition-colors md:min-w-[230px]",
				open ? "border-[var(--accent-border)]" : "border-border-strong"
			)}>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
					<circle cx="11" cy="11" r="7" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
				<input
					ref={inputRef}
					value={query}
					onChange={(event) => { setQuery(event.target.value); }}
					onFocus={() => { setOpen(true); }}
					onBlur={() => { setOpen(false); }}
					placeholder="Search…"
					className="min-w-0 flex-1 border-none bg-transparent text-foreground outline-none placeholder:text-[var(--text-3)]"
				/>
				<span className="rounded-[4px] border border-border px-1.5 font-numeric text-[10px] text-text-3">⌘K</span>
			</div>

			{open ? (
				<div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[360px] w-[320px] overflow-y-auto rounded-[var(--radius-md)] border border-border-strong bg-popover text-foreground shadow-[var(--shadow-lg)]">
					{hasResults ? (
						<>
							{renderGroup('Pages', pageResults)}
							{renderGroup('Wallets', walletResults)}
						</>
					) : (
						<div className="px-3 py-6 text-center text-[13px] text-text-3">No results found.</div>
					)}
				</div>
			) : null}
		</div>
	);
};

NavbarSearch.displayName = 'NavbarSearch';

export { NavbarSearch };
