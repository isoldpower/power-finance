import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type MoneyInOriginalConvertedProps = PropsWithChildren;

const MoneyInOriginalConverted: FC<MoneyInOriginalConvertedProps> = ({ children }) => (
	<MetaText size="10.5">
		≈ {children}
	</MetaText>
);

MoneyInOriginalConverted.displayName = 'MoneyInOriginalConverted';

export { MoneyInOriginalConverted };
export type { MoneyInOriginalConvertedProps };
