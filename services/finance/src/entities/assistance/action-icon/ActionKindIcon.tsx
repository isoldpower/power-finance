import { DuplicateIcon, QuestionIcon, RecurringIcon } from "@shared/pure-components/icons";

import type { ActionType } from "../types.ts";
import type { FC, FunctionComponent } from "react";
import type { IconProps } from "@shared/pure-components/icons";


const ICON_BY_KIND: Record<ActionType, FunctionComponent<IconProps>> = {
	recurring: RecurringIcon,
	duplicate: DuplicateIcon,
	uncategorized: QuestionIcon,
};

interface ActionIconProps extends IconProps {
	kind: ActionType;
}

const ActionKindIcon: FC<ActionIconProps> = ({ kind, ...iconProps }) => {
	const IconElement = ICON_BY_KIND[kind];

	return (
		<IconElement {...iconProps} />
	);
};

ActionKindIcon.displayName = 'ActionKindIcon';

export { ActionKindIcon };
export type { ActionIconProps };
