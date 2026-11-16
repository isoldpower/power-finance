import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type ErrorTextProps = Omit<TextProps, 'size' | 'family' | 'weight' | 'tone' | 'tracking' | 'uppercase'>;

const ErrorText: FC<ErrorTextProps> = ({ as = 'p', role = 'alert', ...props }) => (
	<Text as={as} size="11.5" tone="negative" role={role} {...props} />
);

ErrorText.displayName = 'ErrorText';

export { ErrorText };
export type { ErrorTextProps };
