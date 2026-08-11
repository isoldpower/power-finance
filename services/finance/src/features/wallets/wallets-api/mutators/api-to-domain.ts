import type { WalletKindDto } from "../types.ts";
import type { WalletKind } from "@entity/wallets";


const walletKindFromApi = (dto: WalletKindDto): WalletKind => ({
	id: dto.id,
	label: dto.label,
	credit: dto.credit,
});

export { walletKindFromApi };
