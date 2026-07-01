import { Suspense } from "react";
import type { ReactNode, FC } from "react";
import { ErrorBoundary } from "react-error-boundary";


interface WalletCardBoundariesProps {
	pending: ReactNode;
	error: ReactNode;
	children?: ReactNode;
	status: 'pending' | 'error' | 'success';
}

const WalletCardBoundaries: FC<WalletCardBoundariesProps> = ({
	pending,
	error,
	status,
	children,
 }) => {
	if (status === 'pending') {
		return pending;
	} else if (status === 'error') {
		return error;
	}

	return (
		<ErrorBoundary fallback={error}>
			<Suspense fallback={pending}>
				{children}
			</Suspense>
		</ErrorBoundary>
	);
}

WalletCardBoundaries.displayName = 'WalletCardBoundaries';

export { WalletCardBoundaries };
export type { WalletCardBoundariesProps };