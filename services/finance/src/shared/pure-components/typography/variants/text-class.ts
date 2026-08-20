import { cn } from "@internal/ui-library";

import {
	textFamilyClasses,
	textLeadingClasses,
	textSizeClasses,
	textToneClasses,
	textTrackingClasses,
	textWeightClasses,
} from './text-variants.ts';
import type {
	TextFamily,
	TextLeading,
	TextSize,
	TextTone,
	TextTracking,
	TextWeight,
} from './text-variants.ts';


interface TextClassOptions {
	size?: TextSize;
	family?: TextFamily;
	weight?: TextWeight;
	tone?: TextTone;
	tracking?: TextTracking;
	leading?: TextLeading;
	uppercase?: boolean;
	truncate?: boolean;
}

const textClass = ({
	size,
	family = 'sans',
	weight,
	tone = 'default',
	tracking = 'normal',
	leading,
	uppercase = false,
	truncate = false,
}: TextClassOptions = {}) => cn(
	size && textSizeClasses[size],
	textFamilyClasses[family],
	weight && textWeightClasses[weight],
	textToneClasses[tone],
	textTrackingClasses[tracking],
	leading && textLeadingClasses[leading],
	uppercase && 'uppercase',
	truncate && 'truncate'
);

export { textClass };
export type { TextClassOptions };
