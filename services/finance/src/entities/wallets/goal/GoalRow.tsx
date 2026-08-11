import { GoalIcon } from "./GoalIcon.tsx";
import { GoalProgressBar } from "./GoalProgressBar.tsx";

import { GoalRowContainer } from "./GoalRowContainer.tsx";
import { GoalRowHead } from "./GoalRowHead.tsx";
import { GoalRowBody } from "./GoalRowBody.tsx";
import { GoalRowAmounts } from "./GoalRowAmounts.tsx";
import { GoalRowTarget } from "./GoalRowTarget.tsx";


function GoalRow() {
	return null;
}

GoalRow.displayName = 'GoalRow';
GoalRow.Container = GoalRowContainer;
GoalRow.Head = GoalRowHead;
GoalRow.Body = GoalRowBody;
GoalRow.Amounts = GoalRowAmounts;
GoalRow.Target = GoalRowTarget;
GoalRow.Icon = GoalIcon;
GoalRow.ProgressBar = GoalProgressBar;

export { GoalRow };
