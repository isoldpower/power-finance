export { WalletsDjangoRESTApiClient } from './django-server.ts';
export { WalletsMockRESTApiClient, WALLET_SEARCH_FIELDS } from './mock-server.ts';
export { WALLETS_STORAGE_KEY } from './storage.ts';

export type {
	IWalletsRESTApiClient,
	WalletDeleteRequest,
	WalletDeleteResponse,
	WalletGetRequest,
	WalletGetResponse,
	WalletListRequest,
	WalletListResponse,
	WalletPatchRequest,
	WalletPatchResponse,
	WalletPostRequest,
	WalletPostResponse,
	WalletSearchRequest,
	WalletSearchResponse,
} from './types.ts';
export type { StoredWallet } from './storage.ts';
