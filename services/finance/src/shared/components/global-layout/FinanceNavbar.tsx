import type { FC } from "react";
import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { getFinanceRoute, getIsEmbedded } from "@internal/shared";
import {
	cn,
	FinanceSegmented,
	FinanceSegmentedItem,
	FinanceIconButton,
	FinanceAvatar,
	FinanceBadge,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
	FinanceNotification,
} from "@internal/ui-library";

import { PreferredCurrencySelection, GlobalLocaleSelection } from "@widget/settings";
import { useNotifications, useNotificationsCount } from "@feature/notifications";

import { NavbarSearch } from "./NavbarSearch.tsx";

type TabKey = 'dashboard' | 'management' | 'planning';

const TABS: { key: TabKey; label: string }[] = [
	{ key: 'dashboard', label: 'Dashboard' },
	{ key: 'management', label: 'Management' },
	{ key: 'planning', label: 'Planning' },
];

const resolveActiveTab = (pathname: string): TabKey => {
	if (pathname.includes('/management')) return 'management';
	if (pathname.includes('/planning')) return 'planning';
	return 'dashboard';
};

const FinanceNavbar: FC = () => {
	const isEmbedded = getIsEmbedded();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const activeTab = resolveActiveTab(pathname);
	const { notifications } = useNotifications({ limit: 8 });
	const { count: unreadCount } = useNotificationsCount(false);
	const [navMenuOpen, setNavMenuOpen] = useState(false);

	const activeLabel = TABS.find((tab) => tab.key === activeTab)?.label ?? 'Dashboard';

	const onTabChange = (value: string) => {
		if (!value) return;
		void navigate({ to: getFinanceRoute(value as TabKey) });
	};

	return (
		<header
			className={cn(
				"sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] py-2.5 pr-[22px] backdrop-blur-[14px]",
				isEmbedded ? "pl-16" : "pl-[22px]"
			)}
		>
			<Link to={getFinanceRoute('dashboard')} className="flex items-center gap-2.5">
				<span className="flex size-6 items-center justify-center rounded-[7px] bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]">
					<span className="size-[9px] rounded-[2px] bg-white/90" />
				</span>
				<span className="font-display text-base font-semibold tracking-[-0.01em]">Finance</span>
			</Link>

			<div className="hidden md:block">
				<FinanceSegmented value={activeTab} onValueChange={onTabChange}>
					{TABS.map((tab) => (
						<FinanceSegmentedItem key={tab.key} value={tab.key} className="h-7">
							{tab.label}
						</FinanceSegmentedItem>
					))}
				</FinanceSegmented>
			</div>

			<div className="md:hidden">
				<FinanceMenu open={navMenuOpen} onOpenChange={setNavMenuOpen}>
					<FinanceMenuTrigger asChild>
						<button
							type="button"
							aria-label="Navigation"
							className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border-strong bg-card px-3 py-1.5 text-[13px] font-semibold"
						>
							{activeLabel}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>
					</FinanceMenuTrigger>
					<FinanceMenuContent align="start" className="w-44 p-1">
						{TABS.map((tab) => (
							<FinanceMenuItem
								key={tab.key}
								onClick={() => { setNavMenuOpen(false); onTabChange(tab.key); }}
								className={cn(tab.key === activeTab && "text-primary")}
							>
								{tab.label}
							</FinanceMenuItem>
						))}
					</FinanceMenuContent>
				</FinanceMenu>
			</div>

			<div className="flex-1" />

			<NavbarSearch />

			<FinanceMenu>
				<FinanceMenuTrigger asChild>
					<FinanceIconButton aria-label="Notifications">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
							<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
						</svg>
						{unreadCount > 0 ? (
							<span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-[1.5px] border-[var(--surface)] bg-neg px-1 text-[10px] font-semibold text-white">
								{unreadCount}
							</span>
						) : null}
					</FinanceIconButton>
				</FinanceMenuTrigger>
				<FinanceMenuContent className="w-[340px] p-0">
					<div className="flex items-center justify-between border-b border-border px-4 py-3">
						<span className="text-sm font-semibold">Notifications</span>
						<Link to={getFinanceRoute('settings')} className="text-xs font-semibold text-primary">
							Manage
						</Link>
					</div>
					<div className="flex max-h-[340px] flex-col gap-2 overflow-y-auto p-2">
						{notifications.length === 0 ? (
							<div className="px-2 py-6 text-center text-[13px] text-text-3">No notifications.</div>
						) : (
							notifications.map((notification) => (
								<FinanceNotification
									key={notification.id}
									level={notification.level}
									title={notification.title}
									subtitle={notification.body}
									time={notification.time}
								/>
							))
						)}
					</div>
				</FinanceMenuContent>
			</FinanceMenu>

			<FinanceMenu>
				<FinanceMenuTrigger asChild>
					{/* TODO wire to backend user */}
					<button type="button" aria-label="Account" className="rounded-full">
						<FinanceAvatar initials="AR" />
					</button>
				</FinanceMenuTrigger>
				<FinanceMenuContent className="w-[340px]">
					<div className="flex items-center gap-3 border-b border-border px-3 py-3">
						<FinanceAvatar size="lg" initials="AR" />
						<div className="min-w-0">
							<div className="truncate text-sm font-semibold">Your account</div>
							<div className="truncate text-[11.5px] text-text-3">Manage preferences</div>
						</div>
					</div>
					<div className="flex flex-col gap-3 px-3 py-3 [&_h3]:whitespace-nowrap [&_h3]:text-[13px] [&_h3]:font-medium [&_h3]:text-text-2">
						<PreferredCurrencySelection />
						<GlobalLocaleSelection />
					</div>
					<div className="border-t border-border p-1">
						<FinanceMenuItem onClick={() => void navigate({ to: getFinanceRoute('settings') })}>
							<FinanceBadge tone="neutral" appearance="outline" size="sm">⚙</FinanceBadge>
							All settings
						</FinanceMenuItem>
					</div>
				</FinanceMenuContent>
			</FinanceMenu>
		</header>
	);
};

FinanceNavbar.displayName = 'FinanceNavbar';

export { FinanceNavbar };
