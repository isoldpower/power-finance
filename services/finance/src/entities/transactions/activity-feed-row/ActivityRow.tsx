import { ActivityRowContainer } from "./ActivityRowContainer.tsx";
import { ActivityRowIcon } from "./ActivityRowIcon.tsx";
import { ActivityRowTitle } from "./ActivityRowTitle.tsx";
import { ActivityRowBody } from "./ActivityRowBody.tsx";
import { ActivityRowSeparator } from "./ActivityRowSeparator.tsx";
import { ActivityRowMoney } from "./ActivityRowMoney.tsx";
import { ActivityRowDate } from "./ActivityRowDate.tsx";


function ActivityRow() {
	return null;
}

ActivityRow.displayName = 'ActivityRow';
ActivityRow.Container = ActivityRowContainer;
ActivityRow.Icon = ActivityRowIcon;
ActivityRow.Title = ActivityRowTitle;
ActivityRow.Body = ActivityRowBody;
ActivityRow.Separator = ActivityRowSeparator;
ActivityRow.Money = ActivityRowMoney;
ActivityRow.Date = ActivityRowDate;

export { ActivityRow };
