import {
	cn,
	FinanceSelect,
	FinanceSelectContent,
	FinanceSelectItem,
	FinanceSelectTrigger,
} from "@internal/ui-library";

import { AutomationGlyph, resolveAutomationIcon } from "@entity/assistance";
import { RULE_FIELD_TEXT, RULE_ICON_OPTIONS } from "./config.ts";

import type { FC } from "react";


interface RuleIconSelectProps {
	value: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleIconSelect: FC<RuleIconSelectProps> = ({ value, disabled, onChange }) => (
	<FinanceSelect value={value} disabled={disabled} onValueChange={onChange}>
		<FinanceSelectTrigger
			className={cn("h-10 w-[62px] flex-none justify-center gap-1 px-2.5 font-normal", RULE_FIELD_TEXT)}
			aria-label="Rule icon"
		>
			<AutomationGlyph size={14} className="text-text-2">
				{resolveAutomationIcon(value)}
			</AutomationGlyph>
		</FinanceSelectTrigger>
		<FinanceSelectContent>
			{RULE_ICON_OPTIONS.map((option) => (
				<FinanceSelectItem
					key={option.value}
					value={option.value}
					className={cn(RULE_FIELD_TEXT, "font-normal data-[state=checked]:font-normal")}
				>
					<span className="flex items-center gap-2">
						<AutomationGlyph size={15}>
							{resolveAutomationIcon(option.value)}
						</AutomationGlyph>
						{option.label}
					</span>
				</FinanceSelectItem>
			))}
		</FinanceSelectContent>
	</FinanceSelect>
);

RuleIconSelect.displayName = 'RuleIconSelect';

export { RuleIconSelect };
export type { RuleIconSelectProps };
