import type { FC } from "react";
import { useState } from "react";
import { FinanceCard, FinanceBadge, UiSwitch, UiSkeleton, Icons } from "@internal/ui-library";

import { useAutomations, useToggleAutomation } from "@feature/automations";
import { NewRulePanel } from "./NewRulePanel.tsx";
import { DeleteRuleDialog } from "./DeleteRuleDialog.tsx";
import { ListPager } from "./ListPager.tsx";
import { ListFilterBar } from "./ListFilterBar.tsx";

const PAGE_SIZE = 5;
const PLACEHOLDER_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

const STATUS_OPTIONS = [
	{ value: 'all', label: 'All statuses' },
	{ value: 'active', label: 'Active' },
	{ value: 'paused', label: 'Paused' },
];

const AutomationsCard: FC = () => {
	const { rules, isPending } = useAutomations();
	const toggle = useToggleAutomation();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('all');

	const normalizedQuery = query.trim().toLowerCase();
	const filteredRules = rules.filter((rule) => {
		const matchesQuery = normalizedQuery === ''
			|| rule.name.toLowerCase().includes(normalizedQuery)
			|| rule.trigger.toLowerCase().includes(normalizedQuery)
			|| rule.action.toLowerCase().includes(normalizedQuery);
		const matchesStatus = status === 'all' || (status === 'active' ? rule.enabled : !rule.enabled);
		return matchesQuery && matchesStatus;
	});

	const pageCount = Math.max(1, Math.ceil(filteredRules.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount - 1);
	const pagedRules = filteredRules.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

	return (
		<FinanceCard className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Automations &amp; rules</span>
				<span className="rounded-[4px] bg-primary px-1.5 py-0.5 font-numeric text-[9px] font-semibold text-white">AI</span>
				<div className="flex-1" />
				<NewRulePanel>
					<button type="button" className="text-[12.5px] font-semibold text-primary hover:underline">＋ New rule</button>
				</NewRulePanel>
			</div>
			{isPending ? (
				PLACEHOLDER_KEYS.map((key) => (
					<div key={key} className="flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0">
						<UiSkeleton className="size-[34px] flex-none rounded-[9px]" />
						<div className="min-w-0 flex-1 space-y-1.5">
							<UiSkeleton className="h-3.5 w-1/2" />
							<UiSkeleton className="h-3 w-3/4" />
						</div>
						<UiSkeleton className="h-5 w-9 flex-none rounded-full" />
					</div>
				))
			) : (
				<>
				<ListFilterBar
					query={query}
					onQueryChange={setQuery}
					placeholder="Search rules…"
					filter={status}
					onFilterChange={setStatus}
					options={STATUS_OPTIONS}
				/>
				{filteredRules.length === 0 ? (
					<div className="px-[18px] py-6 text-center text-[13px] text-text-3">
						{rules.length === 0 ? 'No automations yet.' : 'No rules match your search.'}
					</div>
				) : null}
				{pagedRules.map((rule, index) => (
					<div key={`${safePage.toString()}-${rule.id}`} style={{ animationDelay: `${(index * 0.04).toString()}s` }} className="fx-slidein flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
						<div className="flex size-[34px] flex-none items-center justify-center rounded-[9px] border border-border bg-secondary text-[15px]">{rule.icon}</div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2 text-[13.5px] font-semibold">
								{rule.name}
								<FinanceBadge tone={rule.statusTone === 'pos' ? 'pos' : 'warn'} appearance="soft" size="sm">{rule.statusText}</FinanceBadge>
							</div>
							<div className="mt-0.5 font-numeric text-[10.5px] text-text-3">when {rule.trigger} → {rule.action}</div>
						</div>
						<FinanceBadge tone="neutral" appearance="outline" size="sm" className="hidden flex-none sm:inline-flex">{rule.frequency}</FinanceBadge>
						<UiSwitch
							checked={rule.enabled}
							disabled={toggle.isPending}
							onCheckedChange={(checked) => { toggle.mutate({ id: rule.id, enabled: checked }); }}
						/>
						<DeleteRuleDialog id={rule.id} name={rule.name}>
							<button
								type="button"
								aria-label={`Delete ${rule.name}`}
								className="flex size-7 flex-none items-center justify-center rounded-[7px] text-text-3 transition-colors hover:bg-[var(--neg-soft)] hover:text-neg"
							>
								<Icons.Trash2 size={15} />
							</button>
						</DeleteRuleDialog>
					</div>
				))}
				<ListPager page={safePage} pageSize={PAGE_SIZE} total={filteredRules.length} onPageChange={setPage} />
				</>
			)}
		</FinanceCard>
	);
};

AutomationsCard.displayName = 'AutomationsCard';

export { AutomationsCard };
