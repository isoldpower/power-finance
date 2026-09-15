import { useRef } from "react";
import { cn } from "@internal/ui-library";
import { TransferGlyph, TransferInGlyph, TransferOutGlyph } from "@shared/pure-components/icons";

import type { FC } from "react";
import type { EntryAmountEmphasis } from "./EntryAmountFieldBox.tsx";
import type { TransactionEntryType, TransferDirection } from "../../types.ts";


interface EntryAmountFieldGlyphProps {
	type: TransactionEntryType;
	direction?: TransferDirection;
	emphasis?: EntryAmountEmphasis;
}

const GLYPH_BY_DIRECTION: Record<TransferDirection, FC<{ className?: string; size?: number }>> = {
	out: TransferOutGlyph,
	in: TransferInGlyph,
};

const EntryAmountFieldGlyph: FC<EntryAmountFieldGlyphProps> = ({
	type,
	direction,
	emphasis = 'default',
}) => {
	const SIZE_BY_EMPHASIS = useRef<Record<EntryAmountEmphasis, number>>({
		default: 24,
		accent: 26,
	});
	const Glyph = direction === undefined ? TransferGlyph : GLYPH_BY_DIRECTION[direction];

	return (
		<Glyph
			className={cn(
				type === 'expense' && 'text-neg',
				type === 'income' && 'text-pos',
				type === 'transfer' && 'text-primary'
			)}
			size={SIZE_BY_EMPHASIS.current[emphasis]}
		/>
	);
};

EntryAmountFieldGlyph.displayName = 'EntryAmountFieldGlyph';

export { EntryAmountFieldGlyph };
export type { EntryAmountFieldGlyphProps };
