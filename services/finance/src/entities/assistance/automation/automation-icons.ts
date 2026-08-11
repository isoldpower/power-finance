import { Icons } from "@internal/ui-library";

import type { LucideIcon } from "lucide-react";


const AUTOMATION_ICONS = {
	tag: Icons.Tag,
	transfer: Icons.ArrowLeftRight,
	alert: Icons.Bell,
	report: Icons.ChartColumn,
	receipt: Icons.ReceiptText,
	schedule: Icons.CalendarClock,
	rule: Icons.Settings2,
} satisfies Record<string, LucideIcon>;

type AutomationIconName = keyof typeof AUTOMATION_ICONS;

const DEFAULT_AUTOMATION_ICON: AutomationIconName = 'rule';

const resolveAutomationIcon = (icon: string): LucideIcon => {
	const registry: Record<string, LucideIcon | undefined> = AUTOMATION_ICONS;

	return registry[icon] ?? AUTOMATION_ICONS[DEFAULT_AUTOMATION_ICON];
};

export { AUTOMATION_ICONS, DEFAULT_AUTOMATION_ICON, resolveAutomationIcon };
export type { AutomationIconName };
