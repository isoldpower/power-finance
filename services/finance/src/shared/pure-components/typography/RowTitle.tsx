import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type RowTitleProps = Omit<TextProps, 'family' | 'weight' | 'tracking' | 'uppercase'> & {
	size?: Extract<TextProps['size'], '12.5' | '13' | '13.5' | '14.5'>;
};

const RowTitle: FC<RowTitleProps> = ({ as = 'div', size = '13.5', ...props }) => (
	<Text as={as} size={size} weight="semibold" {...props} />
);

RowTitle.displayName = 'RowTitle';

export { RowTitle };
export type { RowTitleProps };
