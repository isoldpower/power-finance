import { useMemo } from "react";
import { clerk, useGuestDemoTokenGetter } from "@internal/shared";


type ApiTokenGetter = () => Promise<string | null>;

function useApiTokenGetter(): ApiTokenGetter {
	const { getToken } = clerk.useAuth();
	const guestDemoTokenGetter = useGuestDemoTokenGetter();

	return useMemo<ApiTokenGetter>(() => {
		return guestDemoTokenGetter ?? (() => getToken());
	}, [guestDemoTokenGetter, getToken]);
}

export { useApiTokenGetter };
export type { ApiTokenGetter };
