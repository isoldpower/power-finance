import { createElement } from "react";
import { cn } from "@internal/ui-library";

import type { FC, HTMLAttributes } from "react";

import { textClass } from "./variants";
import type {
	TextFamily,
	TextLeading,
	TextSize,
	TextTone,
	TextTracking,
	TextWeight,
} from "./variants";


type TextElement =
	| 'span'
	| 'div'
	| 'p'
	| 'label'
	| 'strong'
	| 'b'
	| 'em'
	| 'small'
	| 'time'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6';

interface TextProps extends HTMLAttributes<HTMLElement> {
	as?: TextElement;
	size?: TextSize;
	family?: TextFamily;
	weight?: TextWeight;
	tone?: TextTone;
	tracking?: TextTracking;
	leading?: TextLeading;
	uppercase?: boolean;
	truncate?: boolean;
	htmlFor?: string;
	dateTime?: string;
}

const Text: FC<TextProps> = ({
	as = 'span',
	size,
	family = 'sans',
	weight,
	tone = 'default',
	tracking = 'normal',
	leading,
	uppercase = false,
	truncate = false,
	className,
	children,
	...props
}) => createElement(
	as,
	{
		className: cn(
			textClass({ size, family, weight, tone, tracking, leading, uppercase, truncate }),
			className
		),
		...props,
	},
	children
);

Text.displayName = 'Text';

export { Text };
export type { TextProps, TextElement };
