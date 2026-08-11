import { GoalFormBody } from "./GoalFormBody.tsx";
import { GoalFormIntro } from "./GoalFormIntro.tsx";
import { GoalFormField } from "./GoalFormField.tsx";
import { GoalFormNameRow } from "./GoalFormNameRow.tsx";
import { GoalFormAmountsGrid } from "./GoalFormAmountsGrid.tsx";
import { GoalFormFieldError } from "./GoalFormFieldError.tsx";
import { GoalFormIconGrid } from "./GoalFormIconGrid.tsx";
import { GoalIconTrigger } from "./GoalIconTrigger.tsx";
import { GoalIconOption } from "./GoalIconOption.tsx";


function GoalForm() {
	return null;
}

GoalForm.displayName = 'GoalForm';
GoalForm.Body = GoalFormBody;
GoalForm.Intro = GoalFormIntro;
GoalForm.Field = GoalFormField;
GoalForm.NameRow = GoalFormNameRow;
GoalForm.AmountsGrid = GoalFormAmountsGrid;
GoalForm.FieldError = GoalFormFieldError;
GoalForm.IconGrid = GoalFormIconGrid;
GoalForm.IconTrigger = GoalIconTrigger;
GoalForm.IconOption = GoalIconOption;

export { GoalForm };
