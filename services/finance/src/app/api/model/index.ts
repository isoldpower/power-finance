type TokenFetcher<T = string> = () => Promise<T> | T;

type PartialResource<TNecessary, TOptional> = Partial<TOptional> & TNecessary;

interface HandlerOptions {
  baseUrl?: string
  fetchToken: TokenFetcher
}

export type * from './handler.js';
export type * from './request.js';
export type * from './response.js';
export type { TokenFetcher, HandlerOptions, PartialResource };
