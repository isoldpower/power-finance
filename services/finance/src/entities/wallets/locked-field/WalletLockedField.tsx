import { cn } from "@internal/ui-library";
import { LockedFieldBody } from "./field/LockedFieldBody.tsx";
import { LockedFieldCode } from "./field/LockedFieldCode.tsx";
import { LockedFieldHint } from "./field/LockedFieldHint.tsx";
import { LockedFieldIcon } from "./field/LockedFieldIcon.tsx";
import { LockedFieldValue } from "./field/LockedFieldValue.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { LockedFieldBodyProps } from "./field/LockedFieldBody.tsx";
import type { LockedFieldCodeProps } from "./field/LockedFieldCode.tsx";
import type { LockedFieldHintProps } from "./field/LockedFieldHint.tsx";
import type { LockedFieldValueProps } from "./field/LockedFieldValue.tsx";


type WalletLockedFieldProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type WalletLockedFieldObject = FC<WalletLockedFieldProps> & {
	Body: FC<LockedFieldBodyProps>;
	Code: FC<LockedFieldCodeProps>;
	Hint: FC<LockedFieldHintProps>;
	Icon: FC;
	Value: FC<LockedFieldValueProps>;
}

const WalletLockedField: WalletLockedFieldObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-start gap-2.5 rounded-[var(--radius-md)] border border-border",
			"bg-secondary px-3.5 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletLockedField.Body = LockedFieldBody;
WalletLockedField.Code = LockedFieldCode;
WalletLockedField.Hint = LockedFieldHint;
WalletLockedField.Icon = LockedFieldIcon;
WalletLockedField.Value = LockedFieldValue;
WalletLockedField.displayName = 'WalletLockedField';

export { WalletLockedField };
export type { WalletLockedFieldProps };
