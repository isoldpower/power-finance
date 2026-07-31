import { Icons } from "@internal/ui-library";

import type {FC} from "react";


interface ActionKindIconProps {
	size?: number;
	className?: string;
}

const DuplicateIcon: FC<ActionKindIconProps> = ({ size = 16, className }) => (
	<Icons.Copy size={size} className={className} />
);

const QuestionIcon: FC<ActionKindIconProps> = ({ size = 16, className }) => (
	<Icons.HelpCircle size={size} className={className} />
);

const RecurringIcon: FC<ActionKindIconProps> = ({ size = 16, className }) => (
	<Icons.RefreshCw size={size} className={className} />
);

RecurringIcon.displayName = 'RecurringIcon';
QuestionIcon.displayName = 'QuestionIcon';
DuplicateIcon.displayName = 'DuplicateIcon';

export { DuplicateIcon, RecurringIcon, QuestionIcon };
export type { ActionKindIconProps };
