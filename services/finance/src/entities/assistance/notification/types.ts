import type { ComponentProps } from "react";
import { FinanceNotification } from "@internal/ui-library";

type NotificationLevel = ComponentProps<typeof FinanceNotification>["level"];

interface NotificationListItem {
	id: string;
	level: NotificationLevel;
	title: string;
	body: string;
	time: string;
}

export type { NotificationListItem };