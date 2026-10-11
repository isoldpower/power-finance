import { AxiosInstance } from "axios";
import { useMemo } from "react";
import { createAxiosInstance } from "./createAxiosInstance.ts";
import { clerk } from "../../auth/index.ts";

import type { AxiosInstanceOptions  } from "./createAxiosInstance.ts";


type UseAxiosInstanceParams = Omit<AxiosInstanceOptions, 'getToken'> & {
	getToken?: AxiosInstanceOptions['getToken'];
};

function useAxiosInstance({ baseUrl, sandbox, demoSession, getToken }: UseAxiosInstanceParams): AxiosInstance {
	const { getToken: getClerkToken } = clerk.useAuth();
	const resolvedGetToken = getToken ?? getClerkToken;

	return useMemo(() => {
		return createAxiosInstance({
			baseUrl,
			getToken:
			resolvedGetToken,
			sandbox,
			demoSession
		});
	}, [baseUrl, resolvedGetToken, sandbox, demoSession]);
}

export { useAxiosInstance };
