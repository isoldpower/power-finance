import type { FC } from "react";

import { Text } from "./Text.tsx";
import type { TextProps } from "./Text.tsx";


type PageTitleProps = Omit<TextProps, 'size' | 'family' | 'weight' | 'tracking' | 'uppercase'>;

const PageTitle: FC<PageTitleProps> = ({ as = 'h1', ...props }) => (
	<Text
		as={as}
		family="display"
		size="2xl"
		weight="semibold"
		tracking="tight"
		{...props}
	/>
);

PageTitle.displayName = 'PageTitle';

export { PageTitle };
export type { PageTitleProps };
