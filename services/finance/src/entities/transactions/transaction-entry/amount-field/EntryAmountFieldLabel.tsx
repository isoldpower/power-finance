import { Overline } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type EntryAmountFieldLabelProps = PropsWithChildren;

const EntryAmountFieldLabel: FC<EntryAmountFieldLabelProps> = ({ children }) => (
	<Overline as="span" size="10" tracking="normal" className="mb-1 block">
		{children}
	</Overline>
);

EntryAmountFieldLabel.displayName = 'EntryAmountFieldLabel';

export { EntryAmountFieldLabel };
export type { EntryAmountFieldLabelProps };
