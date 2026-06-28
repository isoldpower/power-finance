import type { FC } from "react";
import { FinanceCard } from "@internal/ui-library";

import { useAutomationsBrowser } from "@feature/automations";
import { NewRulePanel, DeleteRuleDialog } from "@process/planning";
import { ListFilterBar, ListPager, AutomationRow, AutomationSkeletonRow, RowDeleteButton } from "@entity/planning";

import { AUTOMATIONS_PAGE_SIZE, AUTOMATIONS_STATUS_OPTIONS } from "./config.ts";

const PLACEHOLDER_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

const AutomationsCard: FC = () => {
	const {
		isPending,
		togglePending,
		setEnabled,
		totalCount,
		filteredRules,
		pagedRules,
		page,
		setPage,
		query,
		setQuery,
		status,
		setStatus,
	} = useAutomationsBrowser(AUTOMATIONS_PAGE_SIZE);

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
				PLACEHOLDER_KEYS.map((key) => <AutomationSkeletonRow key={key} />)
			) : (
				<>
				<ListFilterBar
					query={query}
					onQueryChange={setQuery}
					placeholder="Search rules…"
					filter={status}
					onFilterChange={setStatus}
					options={AUTOMATIONS_STATUS_OPTIONS}
				/>
				{filteredRules.length === 0 ? (
					<div className="px-[18px] py-6 text-center text-[13px] text-text-3">
						{totalCount === 0 ? 'No automations yet.' : 'No rules match your search.'}
					</div>
				) : null}
				{pagedRules.map((rule, index) => (
					<AutomationRow
						key={`${page.toString()}-${rule.id}`}
						style={{ animationDelay: `${(index * 0.04).toString()}s` }}
						icon={rule.icon}
						name={rule.name}
						statusText={rule.statusText}
						statusTone={rule.statusTone}
						trigger={rule.trigger}
						action={rule.action}
						frequency={rule.frequency}
						enabled={rule.enabled}
						toggleDisabled={togglePending}
						onToggle={(checked) => { setEnabled(rule.id, checked); }}
						deleteSlot={
							<DeleteRuleDialog id={rule.id} name={rule.name}>
								<RowDeleteButton label={`Delete ${rule.name}`} />
							</DeleteRuleDialog>
						}
					/>
				))}
				<ListPager page={page} pageSize={AUTOMATIONS_PAGE_SIZE} total={filteredRules.length} onPageChange={setPage} />
				</>
			)}
		</FinanceCard>
	);
};

AutomationsCard.displayName = 'AutomationsCard';

export { AutomationsCard };
