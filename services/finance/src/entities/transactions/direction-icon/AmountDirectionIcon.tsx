import { resolveDirectionIcon } from "../visual-map";

import type { FC } from "react";
import type { AmountDirectionIconProps as DirectionGlyphProps } from "@shared/pure-components/icons";
import type { TransactionType } from "../types.ts";


interface AmountDirectionIconProps extends DirectionGlyphProps {
	type: TransactionType;
}

const AmountDirectionIcon: FC<AmountDirectionIconProps> = ({ type, ...iconProps }) => {
	const IconElement = resolveDirectionIcon(type);

	return (
		<IconElement {...iconProps} />
	);
};

AmountDirectionIcon.displayName = 'AmountDirectionIcon';

export { AmountDirectionIcon };
export type { AmountDirectionIconProps };
