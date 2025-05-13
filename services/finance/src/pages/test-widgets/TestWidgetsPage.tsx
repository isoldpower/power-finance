import { SelectWalletToQuery, useWallet } from "@feature/wallet";
import { EditableWalletCard } from "@widget/wallet";


export default function TestWidgetsPage() {
    const { wallet, fetchStatus } = useWallet('423917d6-f9de-4c0e-a9df-74dfdbc92e1d');

    return (
        <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-lg">
                <h3>Wallet {fetchStatus}</h3>
                {wallet && <EditableWalletCard wallet={wallet} />}
            </div>
            <div className="flex flex-col gap-4 w-lg">
                <h3>Wallet {fetchStatus}</h3>
                {wallet && (
                    <SelectWalletToQuery walletId={wallet.id}>
                        <EditableWalletCard wallet={wallet} />
                    </SelectWalletToQuery>
                )}
            </div>
        </div>
    );
}