import { useMemo } from "react";
import { clerk } from "@internal/shared";
import { createAxiosInstance } from "./createAxiosInstance.ts";
import type { AxiosInstanceOptions  } from "./createAxiosInstance.ts";
import { AxiosInstance } from "axios";


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