import type { FC } from "react";

const PagePending: FC = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
				Hahahaha
			</div>
		</div>
	)
}

const PageError: FC = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="text-red-500">Oooops, something went wrong loading the page</div>
		</div>
	)
}

PagePending.displayName = 'PagePending';
PageError.displayName = 'PageError';

export { PagePending, PageError };
