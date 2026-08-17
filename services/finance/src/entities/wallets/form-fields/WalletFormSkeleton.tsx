import { cn } from "@internal/ui-library";
import { WalletFormSkeletonBody } from "./form-skeleton/WalletFormSkeletonBody.tsx";
import { WalletFormSkeletonField } from "./form-skeleton/WalletFormSkeletonField.tsx";
import { WalletFormSkeletonFooter } from "./form-skeleton/WalletFormSkeletonFooter.tsx";
import { WalletFormSkeletonPreview } from "./form-skeleton/WalletFormSkeletonPreview.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { WalletFormSkeletonBodyProps } from "./form-skeleton/WalletFormSkeletonBody.tsx";
import type { WalletFormSkeletonFieldProps } from "./form-skeleton/WalletFormSkeletonField.tsx";


type WalletFormSkeletonProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type WalletFormSkeletonObject = FC<WalletFormSkeletonProps> & {
	Body: FC<WalletFormSkeletonBodyProps>;
	Field: FC<WalletFormSkeletonFieldProps>;
	Footer: FC;
	Preview: FC;
}

const WalletFormSkeleton: WalletFormSkeletonObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex flex-1 flex-col overflow-hidden"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletFormSkeleton.Body = WalletFormSkeletonBody;
WalletFormSkeleton.Field = WalletFormSkeletonField;
WalletFormSkeleton.Footer = WalletFormSkeletonFooter;
WalletFormSkeleton.Preview = WalletFormSkeletonPreview;
WalletFormSkeleton.displayName = 'WalletFormSkeleton';

export { WalletFormSkeleton };
export type { WalletFormSkeletonProps };
