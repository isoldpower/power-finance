import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ReceiptPaperBrandProps = PropsWithChildren;

const ReceiptPaperBrand: FC<ReceiptPaperBrandProps> = ({ children }) => (
	<Text as="div" size="8" weight="semibold" tracking="0.1em" className="text-center">
		{children}
	</Text>
);

ReceiptPaperBrand.displayName = 'ReceiptPaperBrand';

export { ReceiptPaperBrand };
export type { ReceiptPaperBrandProps };
