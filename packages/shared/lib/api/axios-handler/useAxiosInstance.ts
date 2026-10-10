import { AxiosInstance } from "axios";
import { useMemo } from "react";
import { createAxiosInstance } from "./createAxiosInstance.ts";
import { clerk } from "../../auth/index.ts";

import type { AxiosInstanceOptions  } from "./createAxiosInstance.ts";


type UseAxiosInstanceParams = Omit<AxiosInstanceOptions, 'getToken'>;

function useAxiosInstance({ baseUrl, sandbox, demoSession }: UseAxiosInstanceParams): AxiosInstance {
	const { getToken } = clerk.useAuth();

	return useMemo(() => {
		return createAxiosInstance({ baseUrl, getToken, sandbox, demoSession });
	}, [baseUrl, getToken, sandbox, demoSession]);
}

export { useAxiosInstance };
