import { ActivityRowContainer } from "./ActivityRowContainer.tsx";
import { ActivityRowIcon } from "./ActivityRowIcon.tsx";
import { ActivityRowBody } from "./ActivityRowBody.tsx";
import { ActivityRowSeparator } from "./ActivityRowSeparator.tsx";
import { ActivityRowMoney } from "./ActivityRowMoney.tsx";


function ActivityRow() {
	return null;
}

ActivityRow.displayName = 'ActivityRow';
ActivityRow.Container = ActivityRowContainer;
ActivityRow.Icon = ActivityRowIcon;
ActivityRow.Body = ActivityRowBody;
ActivityRow.Separator = ActivityRowSeparator;
ActivityRow.Money = ActivityRowMoney;

export { ActivityRow };
