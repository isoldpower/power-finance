import type { CachesSnapshot, PagedResponse } from "@shared/data";
import type { Wallet } from "@entity/wallets";
import type { FetchWalletResponse } from "../../../wallets-api";


type WalletPageResponse = PagedResponse<Wallet>;

type WalletCachesSnapshot = CachesSnapshot<Wallet, FetchWalletResponse>;

export type { WalletCachesSnapshot, WalletPageResponse };
