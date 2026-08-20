import { GoalDialogActions } from "./dialog/GoalDialogActions.tsx";
import { GoalDialogContent } from "./dialog/GoalDialogContent.tsx";
import { GoalDialogDescription } from "./dialog/GoalDialogDescription.tsx";
import { GoalDialogHeader } from "./dialog/GoalDialogHeader.tsx";
import { GoalDialogOption } from "./dialog/GoalDialogOption.tsx";
import { GoalDialogOptions } from "./dialog/GoalDialogOptions.tsx";
import { GoalDialogRadio } from "./dialog/GoalDialogRadio.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { GoalDialogActionsProps } from "./dialog/GoalDialogActions.tsx";
import type { GoalDialogContentProps } from "./dialog/GoalDialogContent.tsx";
import type { GoalDialogDescriptionProps } from "./dialog/GoalDialogDescription.tsx";
import type { GoalDialogHeaderProps } from "./dialog/GoalDialogHeader.tsx";
import type { GoalDialogOptionProps } from "./dialog/GoalDialogOption.tsx";
import type { GoalDialogOptionsProps } from "./dialog/GoalDialogOptions.tsx";
import type { GoalDialogRadioProps } from "./dialog/GoalDialogRadio.tsx";


type GoalDialogProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type GoalDialogObject = FC<GoalDialogProps> & {
	Actions: FC<GoalDialogActionsProps>;
	Content: FC<GoalDialogContentProps>;
	Description: FC<GoalDialogDescriptionProps>;
	Header: FC<GoalDialogHeaderProps>;
	Option: FC<GoalDialogOptionProps>;
	Options: FC<GoalDialogOptionsProps>;
	Radio: FC<GoalDialogRadioProps>;
}

const GoalDialog: GoalDialogObject = ({
	children,
	...props
}) => (
	<div {...props}>
		{children}
	</div>
);

GoalDialog.Actions = GoalDialogActions;
GoalDialog.Content = GoalDialogContent;
GoalDialog.Description = GoalDialogDescription;
GoalDialog.Header = GoalDialogHeader;
GoalDialog.Option = GoalDialogOption;
GoalDialog.Options = GoalDialogOptions;
GoalDialog.Radio = GoalDialogRadio;
GoalDialog.displayName = 'GoalDialog';

export { GoalDialog };
export type { GoalDialogProps };
