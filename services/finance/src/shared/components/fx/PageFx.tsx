import type { FC } from "react";

const PagePending: FC = () => {
	console.log('mounted');

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
				Hahahaha
			</div>
		</div>
	)
}

const PageError: FC = () => {
	console.log('mounted');

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="text-red-500">Or not</div>
		</div>
	)
}

PagePending.displayName = 'PagePending';
PageError.displayName = 'PageError';

export { PagePending, PageError };
