import { useIsClerkProvided } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ShowOnClerkMissingProps {
	fallback: ReactNode;
	children: ReactNode;
}

const ShowOnClerkMissing: FC<ShowOnClerkMissingProps> = ({ fallback, children }) => {
	const clerkProvided = useIsClerkProvided();

	if (clerkProvided) {
		return fallback;
	}

	return children;
};

ShowOnClerkMissing.displayName = 'ShowOnClerkMissing';

export { ShowOnClerkMissing };
export type { ShowOnClerkMissingProps };
