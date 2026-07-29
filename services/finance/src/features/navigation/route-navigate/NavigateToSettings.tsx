import { useRouteNavigate } from "@feature/navigation";
import {BaseHTMLAttributes, useCallback} from "react";

import type { FC } from "react";


const NavigateToSettings: FC<Omit<BaseHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>> = ({ 
	children,
	...props
}) => {
	const navigateToRoute = useRouteNavigate();

	const navigateToSettings = useCallback(() => {
		navigateToRoute('settings');
	}, [navigateToRoute]);
	
	return (
		<button type='button' onClick={navigateToSettings} {...props}>
			{children}
		</button>
	);
}

export { NavigateToSettings };