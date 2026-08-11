import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listKinds } from "../../wallets-api/methods/list-kinds.ts";
import { walletKindFromApi } from "../../wallets-api/mutators/api-to-domain.ts";
import { useApiContext } from "@app/api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import type { WalletKind } from "@entity/wallets";
import type { ListKindsResponse } from "../../wallets-api/methods/list-kinds.ts";


type UseWalletKindsOptions = Omit<UseQueryOptions<ListKindsResponse>, 'queryKey' | 'queryFn'>;

type UseWalletKindsReturn = UseQueryResult & {
	kinds: WalletKind[];
};

const useWalletKinds = (options?: UseWalletKindsOptions): UseWalletKindsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListKindsResponse>({
		queryKey: [WALLETS_CACHE_KEYS.kinds],
		queryFn: () => listKinds({ handler: apiContext.walletServers.rest }),
		...options ?? {}
	});

	const kinds = useMemo(() => (query.data?.data ?? []).map(walletKindFromApi), [query.data]);

	return { ...query, kinds };
};

export { useWalletKinds };
export type { UseWalletKindsOptions, UseWalletKindsReturn };
