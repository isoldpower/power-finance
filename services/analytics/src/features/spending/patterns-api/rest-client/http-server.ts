import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type {
	IPatternsRESTApiClient,
	SpendingCalendarRequest,
	SpendingCalendarResponse,
	SpendingRhythmRequest,
	SpendingRhythmResponse,
} from "./types.ts";


class PatternsHttpRESTApiClient implements IPatternsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getCalendar(payload: SpendingCalendarRequest): Promise<SpendingCalendarResponse> {
		return request<SpendingCalendarResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/spending-calendar',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public getRhythm(payload: SpendingRhythmRequest): Promise<SpendingRhythmResponse> {
		return request<SpendingRhythmResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/spending-rhythm',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { PatternsHttpRESTApiClient };
