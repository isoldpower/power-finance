import { cloneElement } from "react";

import type { FC, MouseEventHandler, ReactElement } from "react";


interface PreservedButtonProps {
	callback: MouseEventHandler<HTMLButtonElement>;
	children: ReactElement<{ 
		type: string;
		role: string;
		onClick: MouseEventHandler;
	}>;
}

const PreservedButton: FC<PreservedButtonProps> = ({
	callback,
	children,
}) => {
	return cloneElement(children, {
		...children.props,
		type: 'button',
		role: 'button',
		onClick: callback,
	});
}

PreservedButton.displayName = 'PreservedButton';

export { PreservedButton };