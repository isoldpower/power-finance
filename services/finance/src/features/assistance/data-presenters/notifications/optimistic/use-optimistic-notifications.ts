import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { NOTIFICATIONS_CACHE_KEYS } from "../../cache-config.ts";
import { NOTIFICATION_RESOURCE } from "./resource.ts";

import type { Notification, NotificationCounts } from "@entity/assistance";
import type { NotificationCachesSnapshot } from "./types.ts";


interface UseOptimisticNotificationsReturn {
	capture: () => Promise<NotificationCachesSnapshot>;
	restore: (snapshot: NotificationCachesSnapshot | undefined) => void;
	applyAcknowledge: (id: string, acknowledgedAt: string) => void;
	applySettled: (id: string, notification: Notification) => void;
}

const countAcknowledged = (counts: NotificationCounts): NotificationCounts => ({
	...counts,
	unacknowledged: Math.max(counts.unacknowledged - 1, 0),
});

const useOptimisticNotifications = (): UseOptimisticNotificationsReturn => {
	const cache = useOptimisticCache(NOTIFICATION_RESOURCE);

	const applyAcknowledge = useCallback((id: string, acknowledgedAt: string): void => {
		cache.patchPaged(id, (notification) => ({ ...notification, acknowledgedAt }));
		cache.patchSingle<NotificationCounts>(NOTIFICATIONS_CACHE_KEYS.count, countAcknowledged);
	}, [cache]);

	const applySettled = useCallback((id: string, notification: Notification): void => {
		cache.settlePaged(id, notification);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applyAcknowledge,
		applySettled,
	}), [cache.capture, cache.restore, applyAcknowledge, applySettled]);
};

export { useOptimisticNotifications };
export type { UseOptimisticNotificationsReturn };
