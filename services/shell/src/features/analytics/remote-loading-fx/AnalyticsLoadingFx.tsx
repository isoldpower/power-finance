import type {FC} from "react";

import {Suspense, useMemo} from "react";
import {ErrorBoundary} from "react-error-boundary";

interface AnalyticsLoadingFxProps {
	children: React.ReactNode;
	suspenseFallback?: React.ReactNode;
	errorFallback?: React.ReactNode;
}

const AnalyticsLoadingFx: FC<AnalyticsLoadingFxProps> = ({ children, suspenseFallback, errorFallback }) => {
	const suspenseFallbackProtected = useMemo(() => {
		return suspenseFallback ?? <div>Loading Analytics page...</div>
	}, [suspenseFallback]);
	const errorFallbackProtected = useMemo(() => {
		return errorFallback ?? <div>Something went wrong loading Analytics page</div>
	}, [errorFallback]);

	return (
		<Suspense fallback={suspenseFallbackProtected}>
			<ErrorBoundary fallback={errorFallbackProtected}>
				{children}
			</ErrorBoundary>
		</Suspense>
	)
}

AnalyticsLoadingFx.displayName = 'AnalyticsLoadingFx';

export {AnalyticsLoadingFx};
export type {AnalyticsLoadingFxProps};