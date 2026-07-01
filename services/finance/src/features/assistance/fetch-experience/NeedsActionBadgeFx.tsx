import { UiSkeleton } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface NeedsActionBadgeFxProps {
	isPending: boolean;
	isError: boolean;
	children: ReactNode;
}

const NeedsActionBadgeFx: FC<NeedsActionBadgeFxProps> = ({
	isPending,
	isError,
	children,
}) => {
	if (isPending) {
		return (
			<NeedsActionBadgePending />
		);
	} else if (isError) {
		return null;
	}

	return children;
};

const NeedsActionBadgePending: FC = () => (
	<UiSkeleton className="my-0.5 h-3 w-2.5 rounded-sm bg-white/50" />
)

export { NeedsActionBadgeFx };