import { AlertIcon, DuplicateIcon, QuestionIcon, RecurringIcon } from "@shared/pure-components/icons";
import { useMemo } from "react";

import type { FC } from "react";
import type { IconProps } from "@shared/pure-components/icons";


interface ActionKindIconProps extends IconProps {
	kind: string;
}

const ActionKindIcon: FC<ActionKindIconProps> = ({ kind, ...iconProps }) => {
	const IconElement = useMemo(() => {
		return {
			recurring: RecurringIcon,
			insufficient_funds: AlertIcon,
			duplicate: DuplicateIcon,
			uncategorized: QuestionIcon,
		}[kind] ?? QuestionIcon;
	}, [kind]);

	return (
		<IconElement {...iconProps} />
	);
};

ActionKindIcon.displayName = 'ActionKindIcon';

export { ActionKindIcon };
export type { ActionKindIconProps };
