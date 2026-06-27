import type { FC } from "react";
import { useState } from "react";
import { FinanceCard, FinanceBadge, UiSwitch } from "@internal/ui-library";

import { MOCK_RULES } from "./mock.ts";

const AutomationsCard: FC = () => {
	const [enabled, setEnabled] = useState<Record<string, boolean>>(
		() => Object.fromEntries(MOCK_RULES.map((rule) => [rule.id, rule.enabled]))
	);

	return (
		<FinanceCard className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Automations &amp; rules</span>
				<span className="rounded-[4px] bg-primary px-1.5 py-0.5 font-numeric text-[9px] font-semibold text-white">AI</span>
				<div className="flex-1" />
				<button type="button" className="text-[12.5px] font-semibold text-primary hover:underline">＋ New rule</button>
			</div>
			{MOCK_RULES.map((rule) => (
				<div key={rule.id} className="flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
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
						checked={enabled[rule.id]}
						onCheckedChange={(checked) => { setEnabled((prev) => ({ ...prev, [rule.id]: checked })); }}
					/>
				</div>
			))}
		</FinanceCard>
	);
};

AutomationsCard.displayName = 'AutomationsCard';

export { AutomationsCard };
