import type { BaseHTMLAttributes, FC } from "react";
import {cn} from "@internal/ui-library";

import { Text } from "@shared/pure-components/typography";


const NoActivityPlaceholderTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<Text
			as="div"
			size="13"
			weight="medium"
			tone="subtle"
			className={cn(
				'absolute flex flex-col items-center justify-center top-0 bottom-0 left-0 opacity-50'
			)} {...props}
		>
			{children}
		</Text>
	);
}

export { NoActivityPlaceholderTitle };