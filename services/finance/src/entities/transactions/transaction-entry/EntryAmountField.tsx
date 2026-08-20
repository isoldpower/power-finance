import { EntryAmountFieldBox } from "./amount-field/EntryAmountFieldBox.tsx";
import { EntryAmountFieldGlyph } from "./amount-field/EntryAmountFieldGlyph.tsx";
import { EntryAmountFieldInput } from "./amount-field/EntryAmountFieldInput.tsx";
import { EntryAmountFieldLabel } from "./amount-field/EntryAmountFieldLabel.tsx";
import { EntryAmountFieldSign } from "./amount-field/EntryAmountFieldSign.tsx";
import { EntryAmountFieldSymbol } from "./amount-field/EntryAmountFieldSymbol.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { EntryAmountFieldBoxProps } from "./amount-field/EntryAmountFieldBox.tsx";
import type { EntryAmountFieldGlyphProps } from "./amount-field/EntryAmountFieldGlyph.tsx";
import type { EntryAmountFieldInputProps } from "./amount-field/EntryAmountFieldInput.tsx";
import type { EntryAmountFieldLabelProps } from "./amount-field/EntryAmountFieldLabel.tsx";
import type { EntryAmountFieldSignProps } from "./amount-field/EntryAmountFieldSign.tsx";
import type { EntryAmountFieldSymbolProps } from "./amount-field/EntryAmountFieldSymbol.tsx";


type EntryAmountFieldProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type EntryAmountFieldObject = FC<EntryAmountFieldProps> & {
	Box: FC<EntryAmountFieldBoxProps>;
	Glyph: FC<EntryAmountFieldGlyphProps>;
	Input: FC<EntryAmountFieldInputProps>;
	Label: FC<EntryAmountFieldLabelProps>;
	Sign: FC<EntryAmountFieldSignProps>;
	Symbol: FC<EntryAmountFieldSymbolProps>;
}

const EntryAmountField: EntryAmountFieldObject = ({
	children,
	...props
}) => (
	<div {...props}>
		{children}
	</div>
);

EntryAmountField.Box = EntryAmountFieldBox;
EntryAmountField.Glyph = EntryAmountFieldGlyph;
EntryAmountField.Input = EntryAmountFieldInput;
EntryAmountField.Label = EntryAmountFieldLabel;
EntryAmountField.Sign = EntryAmountFieldSign;
EntryAmountField.Symbol = EntryAmountFieldSymbol;
EntryAmountField.displayName = 'EntryAmountField';

export { EntryAmountField };
export type { EntryAmountFieldProps };
