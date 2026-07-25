import { useSlideOverContext } from "@shared/components/slide-over/context/use-context-value.ts";
import { CreateWalletForm } from "@widget/wallets";


const CreateWalletProcess = () => {
	const { onClose } = useSlideOverContext();

	return (
		<CreateWalletForm onClose={onClose} />
	);
}

export { CreateWalletProcess };