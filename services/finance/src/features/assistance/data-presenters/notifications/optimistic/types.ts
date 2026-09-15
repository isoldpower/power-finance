import type { CachesSnapshot } from "@shared/data";
import type { Notification } from "@entity/assistance";


type NotificationCachesSnapshot = CachesSnapshot<Notification, never>;

export type { NotificationCachesSnapshot };
