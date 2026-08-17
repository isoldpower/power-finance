import { cn } from "@internal/ui-library";
import { WalletFormFailedMessage } from "./form-failed/WalletFormFailedMessage.tsx";
import { WalletFormFailedTitle } from "./form-failed/WalletFormFailedTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { WalletFormFailedMessageProps } from "./form-failed/WalletFormFailedMessage.tsx";
import type { WalletFormFailedTitleProps } from "./form-failed/WalletFormFailedTitle.tsx";


type WalletFormFailedProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type WalletFormFailedObject = FC<WalletFormFailedProps> & {
	Message: FC<WalletFormFailedMessageProps>;
	Title: FC<WalletFormFailedTitleProps>;
}

const WalletFormFailed: WalletFormFailedObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex flex-1 flex-col items-center justify-center gap-1.5 px-8 py-16 text-center"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletFormFailed.Message = WalletFormFailedMessage;
WalletFormFailed.Title = WalletFormFailedTitle;
WalletFormFailed.displayName = 'WalletFormFailed';

export { WalletFormFailed };
export type { WalletFormFailedProps };
