import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ReceiptPaperBodyProps = PropsWithChildren;

const ReceiptPaperBody: FC<ReceiptPaperBodyProps> = ({ children }) => (
	<MetaText as="div" tone="default" className="px-2.5 py-3 text-[#3a382f]">
		{children}
	</MetaText>
);

ReceiptPaperBody.displayName = 'ReceiptPaperBody';

export { ReceiptPaperBody };
export type { ReceiptPaperBodyProps };
