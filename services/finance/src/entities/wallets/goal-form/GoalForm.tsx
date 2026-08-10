import { GoalFormBody } from "./GoalFormBody.tsx";
import { GoalFormIntro } from "./GoalFormIntro.tsx";
import { GoalFormField } from "./GoalFormField.tsx";
import { GoalFormNameRow } from "./GoalFormNameRow.tsx";
import { GoalFormAmountsGrid } from "./GoalFormAmountsGrid.tsx";
import { GoalFormFieldError } from "./GoalFormFieldError.tsx";
import { GoalFormEmojiGrid } from "./GoalFormEmojiGrid.tsx";
import { GoalEmojiTrigger } from "./GoalEmojiTrigger.tsx";
import { GoalEmojiOption } from "./GoalEmojiOption.tsx";


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
GoalForm.EmojiGrid = GoalFormEmojiGrid;
GoalForm.EmojiTrigger = GoalEmojiTrigger;
GoalForm.EmojiOption = GoalEmojiOption;

export { GoalForm };
