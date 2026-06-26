import type { AxiosInstance } from "axios";

import type {
	IFxRESTApiClient,
	FxRatesGetRequest,
	FxRatesGetResponse,
} from "../types.ts";


class FxDjangoRESTApiClient implements IFxRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public getRates(request: FxRatesGetRequest): Promise<FxRatesGetResponse> {
		const params = new URLSearchParams({ base: request.params.base });

		return this.axiosInstance.get<FxRatesGetResponse>(`/rates/?${params.toString()}`)
			.then((response) => response.data);
	}
}

export { FxDjangoRESTApiClient };
