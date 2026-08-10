import {
	AutomationConditionLine,
	AutomationFrequencyBadge,
	AutomationIcon,
	AutomationStatusBadge,
} from "../automation";

import { AutomationRowContainer } from "./AutomationRowContainer.tsx";
import { AutomationRowBody } from "./AutomationRowBody.tsx";
import { AutomationRowTitle } from "./AutomationRowTitle.tsx";


function AutomationRow() {
	return null;
}

AutomationRow.displayName = 'AutomationRow';
AutomationRow.Container = AutomationRowContainer;
AutomationRow.Body = AutomationRowBody;
AutomationRow.Title = AutomationRowTitle;
AutomationRow.Icon = AutomationIcon;
AutomationRow.StatusBadge = AutomationStatusBadge;
AutomationRow.ConditionLine = AutomationConditionLine;
AutomationRow.FrequencyBadge = AutomationFrequencyBadge;

export { AutomationRow };
