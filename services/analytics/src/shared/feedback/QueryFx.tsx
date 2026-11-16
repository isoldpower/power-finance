import type { ReactNode } from "react";


interface QueryFxProps<T> {
	isPending: boolean;
	isError: boolean;
	data: T | undefined;
	pending: ReactNode;
	error: ReactNode;
	empty?: ReactNode;
	isEmpty?: (data: T) => boolean;
	children: (data: T) => ReactNode;
}

function QueryFx<T>({
	isPending,
	isError,
	data,
	pending,
	error,
	empty,
	isEmpty,
	children,
}: QueryFxProps<T>): ReactNode {
	if (isPending && data === undefined) {
		return pending;
	}
	if (isError || data === undefined) {
		return error;
	}
	if (empty !== undefined && isEmpty?.(data) === true) {
		return empty;
	}

	return children(data);
}

QueryFx.displayName = 'QueryFx';

export { QueryFx };
export type { QueryFxProps };
