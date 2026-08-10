import { GoalDialogHeader } from "./GoalDialogHeader.tsx";
import { GoalDialogContent } from "./GoalDialogContent.tsx";
import { GoalDialogTitle } from "./GoalDialogTitle.tsx";
import { GoalDialogDescription } from "./GoalDialogDescription.tsx";
import { GoalDialogOptions } from "./GoalDialogOptions.tsx";
import { GoalDialogOption } from "./GoalDialogOption.tsx";
import { GoalDialogRadio } from "./GoalDialogRadio.tsx";
import { GoalDialogOptionTitle } from "./GoalDialogOptionTitle.tsx";
import { GoalDialogOptionHint } from "./GoalDialogOptionHint.tsx";
import { GoalDialogActions } from "./GoalDialogActions.tsx";


function GoalDialog() {
	return null;
}

GoalDialog.displayName = 'GoalDialog';
GoalDialog.Header = GoalDialogHeader;
GoalDialog.Content = GoalDialogContent;
GoalDialog.Title = GoalDialogTitle;
GoalDialog.Description = GoalDialogDescription;
GoalDialog.Options = GoalDialogOptions;
GoalDialog.Option = GoalDialogOption;
GoalDialog.Radio = GoalDialogRadio;
GoalDialog.OptionTitle = GoalDialogOptionTitle;
GoalDialog.OptionHint = GoalDialogOptionHint;
GoalDialog.Actions = GoalDialogActions;

export { GoalDialog };
