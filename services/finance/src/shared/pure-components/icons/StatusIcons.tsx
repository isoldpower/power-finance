import { Icons } from "@internal/ui-library";

import type { FC } from "react";


interface IconProps {
	size?: number;
	className?: string;
}

const CheckIcon: FC<IconProps> = ({ size = 13, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<polyline points="20 6 9 17 4 12" />
	</svg>
);

const AlertIcon: FC<IconProps> = ({ size = 16, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<path d="M12 9v4" />
		<path d="M12 17h.01" />
		<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
	</svg>
);

const DuplicateIcon: FC<IconProps> = ({ size = 16, className }) => (
	<Icons.Copy size={size} className={className} />
);

const QuestionIcon: FC<IconProps> = ({ size = 16, className }) => (
	<Icons.HelpCircle size={size} className={className} />
);

const RecurringIcon: FC<IconProps> = ({ size = 16, className }) => (
	<Icons.RefreshCw size={size} className={className} />
);

CheckIcon.displayName = 'CheckIcon';
AlertIcon.displayName = 'AlertIcon';
DuplicateIcon.displayName = 'DuplicateIcon';
QuestionIcon.displayName = 'QuestionIcon';
RecurringIcon.displayName = 'RecurringIcon';

export { CheckIcon, AlertIcon, DuplicateIcon, QuestionIcon, RecurringIcon };
export type { IconProps };
