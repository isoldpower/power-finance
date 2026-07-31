import { useCallback } from "react";
import { useResolveAction } from "@feature/assistance";

import type { FC, ButtonHTMLAttributes } from "react";


interface ResolveActionOnClickProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
	actionId: string;
}

const ResolveActionOnClick: FC<ResolveActionOnClickProps> = ({
	children,
	disabled,
	actionId,
	...props
}) => {
	const { isPending: mutationPending, mutate } = useResolveAction();
	
	const handleButtonClick = useCallback(() => {
		mutate(actionId);
	}, [actionId, mutate]);
	
	return (
		<button type='button' onClick={handleButtonClick} disabled={mutationPending || disabled} {...props}>
			{children}
		</button>
	);
}

export { ResolveActionOnClick };