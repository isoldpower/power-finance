import { useRef } from "react";
import { cn } from "@internal/ui-library";
import { TransferGlyph } from "@shared/pure-components/icons";

import type { FC } from "react";
import type { EntryAmountEmphasis } from "./EntryAmountFieldBox.tsx";
import type { TransactionEntryType } from "../../types.ts";


interface EntryAmountFieldGlyphProps {
	type: TransactionEntryType;
	emphasis?: EntryAmountEmphasis;
}

const EntryAmountFieldGlyph: FC<EntryAmountFieldGlyphProps> = ({
	type,
	emphasis = 'default',
}) => {
	const SIZE_BY_EMPHASIS = useRef<Record<EntryAmountEmphasis, number>>({
		default: 24,
		accent: 26,
	});
	
	return (
		<TransferGlyph
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
