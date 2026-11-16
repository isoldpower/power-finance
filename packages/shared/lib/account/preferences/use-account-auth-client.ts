import { useMemo } from "react";

import { clerk } from "../../auth/index.ts";
import { AuthClerkRESTApiClient } from "../auth-api/index.ts";

import type { IAuthRESTApiClient } from "../auth-api/index.ts";


const useAccountAuthClient = (): IAuthRESTApiClient => {
	const { user } = clerk.useUser();

	return useMemo(() => new AuthClerkRESTApiClient(() => user ?? null), [user]);
};

export { useAccountAuthClient };
