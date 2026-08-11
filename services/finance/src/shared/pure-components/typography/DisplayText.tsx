import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type DisplayTextProps = Omit<TextProps, 'family' | 'weight' | 'uppercase'> & {
	size?: Extract<TextProps['size'], 'sm' | 'lg' | '13' | '14' | '15' | '17' | '19' | '26' | '2xl' | '3xl'>;
};

const DisplayText: FC<DisplayTextProps> = ({ as = 'div', size = '3xl', ...props }) => (
	<Text as={as} family="display" size={size} weight="semibold" {...props} />
);

DisplayText.displayName = 'DisplayText';

export { DisplayText };
export type { DisplayTextProps };
