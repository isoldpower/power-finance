import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type { DimensionsRequest, DimensionsResponse, ILedgerRESTApiClient } from "./types.ts";


class LedgerHttpRESTApiClient implements ILedgerRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getDimensions(payload: DimensionsRequest): Promise<DimensionsResponse> {
		return request<DimensionsResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/dimensions',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { LedgerHttpRESTApiClient };
