import { FinanceComboboxItem, Icons } from "@internal/ui-library";
import { cn, MetaText, Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface PreferenceOptionProps {
	value: string;
	lead?: ReactNode;
	title: string;
	titleColumn?: boolean;
	caption: string;
	selected: boolean;
	onSelect: () => void;
}

const PreferenceOption: FC<PreferenceOptionProps> = ({
	value,
	lead,
	title,
	titleColumn = false,
	caption,
	selected,
	onSelect,
}) => (
	<FinanceComboboxItem value={value} onSelect={onSelect}>
		{lead}
		<Text weight="semibold" truncate={!titleColumn} className={cn(titleColumn && "w-8 shrink-0")}>
			{title}
		</Text>
		<MetaText size="10.5" truncate className="min-w-0">
			{caption}
		</MetaText>
		<Text tone="accent" className="ml-auto flex w-3 justify-center">
			<Icons.Check aria-hidden size={14} className={cn(!selected && "invisible")} />
		</Text>
	</FinanceComboboxItem>
);

PreferenceOption.displayName = 'PreferenceOption';

export { PreferenceOption };
export type { PreferenceOptionProps };
