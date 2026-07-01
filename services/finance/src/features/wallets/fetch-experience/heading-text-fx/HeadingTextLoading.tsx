import type { FC } from "react";
import { UiSkeleton } from "@internal/ui-library";


type HeadingTextLoadingProps = object;

const HeadingTextLoading: FC<HeadingTextLoadingProps> = () => {
	return (
		<UiSkeleton className="mt-2 h-8 w-xl" />
	);
}

HeadingTextLoading.displayName = 'HeadingTextLoading';

export { HeadingTextLoading };
export type { HeadingTextLoadingProps };