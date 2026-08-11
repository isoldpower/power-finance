import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type MetaTextProps = Omit<TextProps, 'family' | 'uppercase'> & {
	size?: Extract<TextProps['size'], '9' | '9.5' | '10' | '10.5' | '11' | '12'>;
};

const MetaText: FC<MetaTextProps> = ({ as, dateTime, size = '11', tone = 'subtle', ...props }) => (
	<Text
		as={as ?? (dateTime ? 'time' : 'span')}
		family="numeric"
		size={size}
		tone={tone}
		dateTime={dateTime}
		{...props}
	/>
);

MetaText.displayName = 'MetaText';

export { MetaText };
export type { MetaTextProps };
