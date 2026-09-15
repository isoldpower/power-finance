import { cn } from "@internal/ui-library";
import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type TransactionDialogProps = PropsWithChildren;

type TransactionDialogPartProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

type TransactionDialogObject = FC<TransactionDialogProps> & {
	Actions: FC<TransactionDialogPartProps>;
	Description: FC<TransactionDialogPartProps>;
};

const TransactionDialogActions: FC<TransactionDialogPartProps> = ({ children, ...props }) => (
	<div className={cn("mt-5 flex gap-2.5")} {...props}>
		{children}
	</div>
);

const TransactionDialogDescription: FC<TransactionDialogPartProps> = ({ children, ...props }) => (
	<BodyText as="div" size="13" leading="relaxed" className="mt-1.5" {...props}>
		{children}
	</BodyText>
);

const TransactionDialog: TransactionDialogObject = ({ children }) => (
	<>{children}</>
);

TransactionDialog.Actions = TransactionDialogActions;
TransactionDialog.Description = TransactionDialogDescription;
TransactionDialog.displayName = 'TransactionDialog';

export { TransactionDialog };
export type { TransactionDialogPartProps, TransactionDialogProps };
