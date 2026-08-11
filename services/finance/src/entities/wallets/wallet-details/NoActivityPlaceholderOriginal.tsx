import type { BaseHTMLAttributes, FC } from "react";
import { Text } from "@shared/pure-components/typography";


const NoActivityPlaceholderOriginal: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<Text as="div" size="13" weight="medium" tone="subtle" className="opacity-50" {...props}>
			{children}
		</Text>
	);
}

export { NoActivityPlaceholderOriginal };