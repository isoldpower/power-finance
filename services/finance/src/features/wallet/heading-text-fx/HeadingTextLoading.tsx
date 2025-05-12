import type { FC } from "react";
import { Skeleton } from "@internal/ui-library";


type HeadingTextLoadingProps = object;

const HeadingTextLoading: FC<HeadingTextLoadingProps> = () => {
	return (
		<Skeleton className="mt-2 h-8 w-xl" />
	);
}

HeadingTextLoading.displayName = 'HeadingTextLoading';

export { HeadingTextLoading };
export type { HeadingTextLoadingProps };