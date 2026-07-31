import { DuplicateIcon, QuestionIcon, RecurringIcon } from "./ActionKindIcons.tsx";

import type { ActionType } from "../types.ts";
import type { FC, FunctionComponent } from "react";
import type { ActionKindIconProps } from "./ActionKindIcons.tsx";


const ICON_BY_KIND: Record<ActionType, FunctionComponent<ActionKindIconProps>> = {
	recurring: RecurringIcon,
	duplicate: DuplicateIcon,
	uncategorized: QuestionIcon,
};

interface ActionIconProps extends ActionKindIconProps {
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
