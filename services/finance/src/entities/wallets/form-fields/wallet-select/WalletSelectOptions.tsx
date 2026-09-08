import { FinanceMenuContent } from "@internal/ui-library";

import { OPTIONS_COLLISION_PADDING, OPTIONS_MAX_HEIGHT } from "./config.ts";

import type { FC, PropsWithChildren } from "react";


type WalletSelectOptionsProps = PropsWithChildren;

const WalletSelectOptions: FC<WalletSelectOptionsProps> = ({ children }) => (
	<FinanceMenuContent
		align="start"
		collisionPadding={OPTIONS_COLLISION_PADDING}
		className={`flex w-[var(--radix-popover-trigger-width)] min-w-[220px] flex-col p-0 ${OPTIONS_MAX_HEIGHT}`}
	>
		{children}
	</FinanceMenuContent>
);

WalletSelectOptions.displayName = 'WalletSelectOptions';

export { WalletSelectOptions };
export type { WalletSelectOptionsProps };
