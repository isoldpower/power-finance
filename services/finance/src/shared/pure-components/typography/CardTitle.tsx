import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type CardTitleProps = Omit<TextProps, 'size' | 'family' | 'weight' | 'tracking' | 'uppercase'>;

const CardTitle: FC<CardTitleProps> = ({ as = 'h3', ...props }) => (
	<Text as={as} size="sm" weight="semibold" {...props} />
);

CardTitle.displayName = 'CardTitle';

export { CardTitle };
export type { CardTitleProps };
