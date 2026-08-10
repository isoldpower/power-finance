import { GoalIcon, GoalProgressBar } from "../goal";

import { GoalRowContainer } from "./GoalRowContainer.tsx";
import { GoalRowHead } from "./GoalRowHead.tsx";
import { GoalRowBody } from "./GoalRowBody.tsx";
import { GoalRowName } from "./GoalRowName.tsx";
import { GoalRowMeta } from "./GoalRowMeta.tsx";
import { GoalRowAmounts } from "./GoalRowAmounts.tsx";
import { GoalRowSaved } from "./GoalRowSaved.tsx";
import { GoalRowTarget } from "./GoalRowTarget.tsx";


function GoalRow() {
	return null;
}

GoalRow.displayName = 'GoalRow';
GoalRow.Container = GoalRowContainer;
GoalRow.Head = GoalRowHead;
GoalRow.Body = GoalRowBody;
GoalRow.Name = GoalRowName;
GoalRow.Meta = GoalRowMeta;
GoalRow.Amounts = GoalRowAmounts;
GoalRow.Saved = GoalRowSaved;
GoalRow.Target = GoalRowTarget;
GoalRow.Icon = GoalIcon;
GoalRow.ProgressBar = GoalProgressBar;

export { GoalRow };
