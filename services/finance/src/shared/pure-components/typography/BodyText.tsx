import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type BodyTextProps = Omit<TextProps, 'family' | 'weight' | 'tracking' | 'uppercase'> & {
	size?: Extract<TextProps['size'], '11.5' | '12.5' | '13' | '15'>;
};

const BodyText: FC<BodyTextProps> = ({ as = 'p', size = '13', tone = 'muted', ...props }) => (
	<Text as={as} size={size} tone={tone} {...props} />
);

BodyText.displayName = 'BodyText';

export { BodyText };
export type { BodyTextProps };
