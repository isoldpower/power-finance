import { useMemo } from "react";

import { clerk } from "../../auth/index.ts";
import { profileFromApi, userToDto } from "../auth-api/index.ts";

import type { UserProfile } from "../types.ts";


interface UseAccountProfileReturn {
	profile: UserProfile | null;
	isLoaded: boolean;
}

const useAccountProfile = (): UseAccountProfileReturn => {
	const { isLoaded, user } = clerk.useUser();

	return useMemo(() => ({
		profile: user ? profileFromApi(userToDto(user)) : null,
		isLoaded,
	}), [isLoaded, user]);
};

export { useAccountProfile };
export type { UseAccountProfileReturn };
