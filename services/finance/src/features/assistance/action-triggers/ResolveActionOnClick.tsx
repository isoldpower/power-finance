import { useCallback } from "react";
import { useResolveAction } from "../data-presenters";

import type { FC, ButtonHTMLAttributes } from "react";


interface ResolveActionOnClickProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
	actionId: string;
	resolutionId: string;
}

const ResolveActionOnClick: FC<ResolveActionOnClickProps> = ({
	children,
	disabled,
	actionId,
	resolutionId,
	...props
}) => {
	const { isPending: mutationPending, mutate } = useResolveAction();

	const handleButtonClick = useCallback(() => {
		mutate({ id: actionId, resolutionId });
	}, [actionId, mutate, resolutionId]);

	return (
		<button type='button' onClick={handleButtonClick} disabled={mutationPending || disabled} {...props}>
			{children}
		</button>
	);
}

export { ResolveActionOnClick };
