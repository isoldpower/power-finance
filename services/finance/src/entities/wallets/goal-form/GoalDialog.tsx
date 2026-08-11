import { GoalDialogHeader } from "./GoalDialogHeader.tsx";
import { GoalDialogContent } from "./GoalDialogContent.tsx";
import { GoalDialogDescription } from "./GoalDialogDescription.tsx";
import { GoalDialogOptions } from "./GoalDialogOptions.tsx";
import { GoalDialogOption } from "./GoalDialogOption.tsx";
import { GoalDialogRadio } from "./GoalDialogRadio.tsx";
import { GoalDialogActions } from "./GoalDialogActions.tsx";


function GoalDialog() {
	return null;
}

GoalDialog.displayName = 'GoalDialog';
GoalDialog.Header = GoalDialogHeader;
GoalDialog.Content = GoalDialogContent;
GoalDialog.Description = GoalDialogDescription;
GoalDialog.Options = GoalDialogOptions;
GoalDialog.Option = GoalDialogOption;
GoalDialog.Radio = GoalDialogRadio;
GoalDialog.Actions = GoalDialogActions;

export { GoalDialog };
