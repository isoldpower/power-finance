import { SelectWalletToQuery, useWallet } from "@feature/wallet";
import { EditableWalletCard } from "@widget/wallet";


export default function TestWidgetsPage() {
    const { wallet, fetchStatus } = useWallet('77281aa7-ac2b-4d1a-87bb-212f6914c9c2');

    return (
        <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-lg">
                <h3>Wallet {fetchStatus}</h3>
                {wallet && <EditableWalletCard wallet={wallet} />}
            </div>
            <div className="flex flex-col gap-4 w-lg">
                <h3>Wallet Selectable {fetchStatus}</h3>
                {wallet && (
                    <SelectWalletToQuery walletId={wallet.id}>
                        <EditableWalletCard wallet={wallet} />
                    </SelectWalletToQuery>
                )}
            </div>
        </div>
    );
}