import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type OverlineProps = Omit<TextProps, 'family' | 'uppercase'> & {
	size?: Extract<TextProps['size'], '9' | '9.5' | '10' | '10.5' | '11'>;
};

const Overline: FC<OverlineProps> = ({
	as = 'div',
	size = '11',
	tone = 'subtle',
	tracking = '0.08em',
	...props
}) => (
	<Text
		as={as}
		family="numeric"
		size={size}
		tone={tone}
		tracking={tracking}
		uppercase
		{...props}
	/>
);

Overline.displayName = 'Overline';

export { Overline };
export type { OverlineProps };
