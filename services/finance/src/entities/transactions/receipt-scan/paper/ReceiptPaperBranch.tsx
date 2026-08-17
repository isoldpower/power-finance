import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ReceiptPaperBranchProps = PropsWithChildren;

const ReceiptPaperBranch: FC<ReceiptPaperBranchProps> = ({ children }) => (
	<Text as="div" size="6" className="mb-1.5 text-center opacity-60">
		{children}
	</Text>
);

ReceiptPaperBranch.displayName = 'ReceiptPaperBranch';

export { ReceiptPaperBranch };
export type { ReceiptPaperBranchProps };
