import type { FC } from "react";
import { AppLoader } from "@internal/ui-library";

const PagePending: FC = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<AppLoader />
		</div>
	)
}

const PageError: FC = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="text-red-500">Failed to load the page</div>
		</div>
	)
}

PagePending.displayName = 'PagePending';
PageError.displayName = 'PageError';

export { PagePending, PageError };