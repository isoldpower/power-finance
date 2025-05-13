import { FC, ReactNode, useCallback } from "react";
import { useWalletSelection } from "./useWalletSelection.tsx";
import { cn } from "@internal/ui-library";


interface SelectWalletToQueryProps {
    walletId: string;
    disabled?: boolean;
    children: ReactNode;
}

const SelectWalletToQuery: FC<SelectWalletToQueryProps> = ({ 
    walletId,
    children,
    disabled = false
}) => {
    const { selected, setSelected } = useWalletSelection({ searchKey: 'selectedWallet' });
    
	const handleSelect = useCallback(() => {
		setSelected(selected === walletId
			? 'all'
			: walletId
		);
	}, [setSelected, walletId, selected]);

    return (
        <div className={cn("relative")}>
            {!disabled && (
                <div
                    role="button"
                    className={cn(
                        "absolute inset-0 z-10",
                        "rounded-lg hover:cursor-pointer",
                        selected === walletId && "outline outline-gray-600"
                    )}
                    onClick={handleSelect} />
            )}
            {children}
        </div>
    )
}

export { SelectWalletToQuery };