import { cn, UiSkeleton } from "@internal/ui-library";
import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


type WalletFormSkeletonFieldVariant = 'name' | 'type' | 'currency' | 'balance';

interface WalletFormSkeletonFieldProps {
	variant: WalletFormSkeletonFieldVariant;
	spaced?: boolean;
}

const LABEL_BY_VARIANT: Record<WalletFormSkeletonFieldVariant, string> = {
	name: 'w-24',
	type: 'w-12',
	currency: 'w-20',
	balance: 'w-28',
};

const CONTROL_BY_VARIANT: Record<WalletFormSkeletonFieldVariant, string> = {
	name: 'h-10 rounded-[var(--radius-md)]',
	type: 'h-11 rounded-[var(--radius-md)]',
	currency: 'h-[30px] rounded-[var(--radius-sm)]',
	balance: 'h-10 rounded-[var(--radius-md)]',
};

const WalletFormSkeletonField: FC<WalletFormSkeletonFieldProps> = ({ variant, spaced = true }) => (
	<div>
		<SkeletonText size="11.5" width={LABEL_BY_VARIANT[variant]} className="mb-1.5" />
		<UiSkeleton className={cn("w-full", CONTROL_BY_VARIANT[variant], spaced && "mb-4")} />
	</div>
);

WalletFormSkeletonField.displayName = 'WalletFormSkeletonField';

export { WalletFormSkeletonField };
export type { WalletFormSkeletonFieldProps, WalletFormSkeletonFieldVariant };
