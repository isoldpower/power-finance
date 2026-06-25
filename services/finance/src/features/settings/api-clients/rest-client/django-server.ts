import {
	IWebhookRESTApiClient, WebhookDeleteRequest, WebhookDeleteResponse, WebhookGetRequest, WebhookGetResponse,
	WebhookListRequest,
	WebhookListResponse,
	WebhookPostRequest,
	WebhookPostResponse, WebhookRotateRequest, WebhookRotateResponse, WebhookUpdateRequest, WebhookUpdateResponse
} from "./types.ts";
import { AxiosInstance } from "axios";


class WebhookDjangoRESTApiClient implements IWebhookRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}
	
	private resolvePostfix(params: object | undefined): string {
		let requestPostfix = '';
		if (params && Object.keys(params).length > 0) {
			const urlParams = new URLSearchParams(Object.entries(params));
			requestPostfix = `?${urlParams.toString()}`;
		}
		
		return requestPostfix;
	}

	public post(
		request: WebhookPostRequest
	): Promise<WebhookPostResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.post<WebhookPostResponse>(`/${postfix}`, request.data)
			.then((response) => response.data);
	}

	public list(
		request: WebhookListRequest
	): Promise<WebhookListResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<WebhookListResponse>(`/${postfix}`)
			.then((response) => response.data);
	}
	
	public delete(
		request: WebhookDeleteRequest
	): Promise<WebhookDeleteResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.delete<WebhookDeleteResponse>(`/${request.id}/${postfix}`)
			.then((response) => response.data);
	}
	
	public get(
		request: WebhookGetRequest
	): Promise<WebhookGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<WebhookGetResponse>(`/${request.id}/${postfix}`)
			.then((response) => response.data);
	}
	
	public rotateSecret(
		request: WebhookRotateRequest
	): Promise<WebhookRotateResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.post<WebhookRotateResponse>(`/${request.data.id}/secret/${postfix}`)
			.then((response) => response.data);
	}
	
	public patch(
		request: WebhookUpdateRequest
	): Promise<WebhookUpdateResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.patch<WebhookUpdateResponse>(`/${request.id}/${postfix}`, request.data)
			.then((response) => response.data);
	}
}

export { WebhookDjangoRESTApiClient };
