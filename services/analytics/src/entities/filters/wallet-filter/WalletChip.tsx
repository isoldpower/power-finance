import { useMemo } from "react";
import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface WalletChipProps {
	name: string;
	color: string;
	selected: boolean;
	onToggle: () => void;
}

const WalletChip: FC<WalletChipProps> = ({ name, color, selected, onToggle }) => {
	const swatchStyle = useMemo(() => {
		return { background: color };
	}, [color]);

	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={onToggle}
			className={cn(
				"flex h-7 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors",
				selected
					? "border-[var(--accent-border)] bg-accent-soft text-primary"
					: "border-border-strong text-text-2 hover:bg-secondary hover:text-foreground",
			)}
		>
			<span className="size-2 rounded-full" style={swatchStyle} />
			{name}
		</button>
	);
};

WalletChip.displayName = 'WalletChip';

export { WalletChip };
export type { WalletChipProps };
