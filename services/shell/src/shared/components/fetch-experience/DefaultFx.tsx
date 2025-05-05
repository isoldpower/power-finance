import type { FC } from "react";

const DefaultPending: FC = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
				Loading page
			</div>
		</div>
	)
}

const DefaultError: FC = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="text-red-500">Error loading page</div>
		</div>
	)
}

DefaultPending.displayName = 'DefaultPending';
DefaultError.displayName = 'DefaultError';

export { DefaultPending, DefaultError };