import { TRANSACTION_TYPE_TONE } from "@shared/formatting";
import { TransferGlyph } from "@shared/pure-components/icons";

import type { FC } from "react";
import type { TransactionEntryType } from "@shared/formatting";
import type { EntryAmountEmphasis } from "./EntryAmountFieldBox.tsx";


interface EntryAmountFieldGlyphProps {
	type: TransactionEntryType;
	emphasis?: EntryAmountEmphasis;
}

const SIZE_BY_EMPHASIS: Record<EntryAmountEmphasis, number> = {
	default: 24,
	accent: 26,
};

const EntryAmountFieldGlyph: FC<EntryAmountFieldGlyphProps> = ({ type, emphasis = 'default' }) => (
	<TransferGlyph className={TRANSACTION_TYPE_TONE[type]} size={SIZE_BY_EMPHASIS[emphasis]} />
);

EntryAmountFieldGlyph.displayName = 'EntryAmountFieldGlyph';

export { EntryAmountFieldGlyph };
export type { EntryAmountFieldGlyphProps };
