import { useMemo } from "react";
import { AxiosInstance } from "axios";

import { createAxiosInstance } from "./createAxiosInstance.ts";
import type { AxiosInstanceOptions  } from "./createAxiosInstance.ts";
import { clerk } from "../../auth/index.ts";


type UseAxiosInstanceParams = Omit<AxiosInstanceOptions, 'getToken'>;

function useAxiosInstance({ ...params }: UseAxiosInstanceParams): AxiosInstance {
	const { getToken } = clerk.useAuth();
	
	return useMemo(() => {
		return createAxiosInstance({
			getToken,
			...params
		});
	}, [getToken, params]);
}

export { useAxiosInstance };