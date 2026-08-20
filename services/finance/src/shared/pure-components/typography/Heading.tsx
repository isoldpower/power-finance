import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type HeadingProps = Omit<TextProps, 'family' | 'weight' | 'tracking' | 'uppercase'> & {
	size?: Extract<TextProps['size'], 'base' | '15' | '17' | '19'>;
};

const Heading: FC<HeadingProps> = ({ as = 'h2', size = '17', ...props }) => (
	<Text
		as={as}
		family="display"
		size={size}
		weight="semibold"
		tracking="tight"
		{...props}
	/>
);

Heading.displayName = 'Heading';

export { Heading };
export type { HeadingProps };
