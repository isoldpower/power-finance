import { useSearchProtected } from "@feature/navigation";
import { z } from "zod";
import { FC, ReactNode, useCallback } from "react";
import { Wallet } from "@entity/wallets";


const searchParams = z.object({
	wallet: z.string().min(1).default('none'),
});
type SearchParams = z.infer<typeof searchParams>;


interface SelectToUrlProps {
	walletId?: string;
	walletsRegistry: Wallet[];
	children: ReactNode;
}

const SelectToUrl: FC<SelectToUrlProps> = ({ 
	walletsRegistry,
	walletId,
	children,
}) => {
	const [, setSearch] = useSearchProtected<SearchParams>(searchParams);

	const selectWalletCallback = useCallback(() => {
		const walletIdProtected = walletId ?? 'none';
		
		if (
			walletIdProtected === 'none' || 
			walletsRegistry.find((wallet) => wallet.id === walletIdProtected)
		) {
			setSearch({ wallet: walletIdProtected });
		}
	}, [setSearch, walletId, walletsRegistry]);
	
	return (
		<button type="button" onClick={selectWalletCallback}>
			{children}
		</button>
	);
}

export { SelectToUrl };