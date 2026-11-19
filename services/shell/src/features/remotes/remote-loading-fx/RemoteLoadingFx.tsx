import type {FC} from "react";

import {Suspense, useMemo} from "react";
import {ErrorBoundary} from "react-error-boundary";
import { RemoteLoadingScreen } from "@entity/remotes";

interface RemoteLoadingFxProps {
	children: React.ReactNode;
	suspenseFallback?: React.ReactNode;
	errorFallback?: React.ReactNode;
}

const RemoteLoadingFx: FC<RemoteLoadingFxProps> = ({ children, suspenseFallback, errorFallback }) => {
	const suspenseFallbackProtected = useMemo(() => {
		return suspenseFallback ?? <RemoteLoadingScreen title="page" />
	}, [suspenseFallback]);
	const errorFallbackProtected = useMemo(() => {
		return errorFallback ?? <div>Something went wrong loading remote page</div>
	}, [errorFallback]);

	return (
		<Suspense fallback={suspenseFallbackProtected}>
			<ErrorBoundary fallback={errorFallbackProtected}>
				{children}
			</ErrorBoundary>
		</Suspense>
	)
}

RemoteLoadingFx.displayName = 'RemoteLoadingFx';

export {RemoteLoadingFx};
export type {RemoteLoadingFxProps};