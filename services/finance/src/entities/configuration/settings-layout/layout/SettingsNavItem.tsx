import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface SettingsNavItemProps {
	active: boolean;
	onSelect: () => void;
	icon?: ReactNode;
	children: ReactNode;
}

const SettingsNavItem: FC<SettingsNavItemProps> = ({ active, onSelect, icon, children }) => (
	<button
		type="button"
		onClick={onSelect}
		aria-current={active ? 'page' : undefined}
		className={cn(
			"flex flex-none items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-left",
			"transition-colors",
			active
				? "bg-[var(--accent-soft)] text-primary"
				: "text-text-2 hover:bg-secondary hover:text-foreground"
		)}
	>
		{icon === undefined ? null : (
			<span className="flex-none">{icon}</span>
		)}
		<Text as="span" size="13" weight={active ? 'semibold' : 'medium'}>
			{children}
		</Text>
	</button>
);

SettingsNavItem.displayName = 'SettingsNavItem';

export { SettingsNavItem };
export type { SettingsNavItemProps };
