import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type CaptionProps = Omit<TextProps, 'family' | 'weight' | 'tracking' | 'uppercase'> & {
	size?: Extract<TextProps['size'], '9' | '10' | '10.5' | '11' | '11.5' | '12' | '12.5' | '13' | 'xs'>;
};

const Caption: FC<CaptionProps> = ({ as = 'p', size = '12.5', tone = 'subtle', ...props }) => (
	<Text as={as} size={size} tone={tone} {...props} />
);

Caption.displayName = 'Caption';

export { Caption };
export type { CaptionProps };
