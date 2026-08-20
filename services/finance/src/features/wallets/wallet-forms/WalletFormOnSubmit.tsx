import { useCallback } from "react";
import { NEW_WALLET_GRADIENT } from "@entity/wallets";
import { buildWalletDraft, buildWalletPatch } from "./wallet-fields.ts";
import { useWalletsListMethods, useWalletMethods } from "../data-presenters";

import type { FC, FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import type { PanelWallet } from "@entity/wallets";
import type { CreateWalletResponse, UpdateWalletResponse } from "../wallets-api";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


interface WalletFormOnSubmitProps {
	handleSubmit: UseFormHandleSubmit<WalletFormSchema>;
	wallet?: PanelWallet;
	children?: ReactNode;
	className?: string;
	onBeforeEdit?: () => void;
	onSuccess?: (result: CreateWalletResponse | UpdateWalletResponse) => void;
	onError?: (error: unknown) => void;
}

const WalletFormOnSubmit: FC<WalletFormOnSubmitProps> = ({
	handleSubmit,
	wallet,
	children,
	className,
	onBeforeEdit,
	onSuccess,
	onError,
}) => {
	const { meta } = useWalletsListMethods();
	const { updateWallet } = useWalletMethods(wallet?.id ?? '');

	const onSubmit = useCallback(async (data: WalletFormSchema) => {
		if (wallet) {
			return await updateWallet(buildWalletPatch(data));
		}

		return await meta.createMutation.mutateAsync(
			buildWalletDraft(data, NEW_WALLET_GRADIENT, parseFloat(data.balance) || 0)
		);
	}, [wallet, updateWallet, meta]);

	const wrappedOnSubmit = useCallback(async (data: WalletFormSchema) => {
		if (onBeforeEdit) onBeforeEdit();

		try {
			const payload = await onSubmit(data);
			if (onSuccess) onSuccess(payload);
		} catch (error: unknown) {
			console.error(error);
			if (onError) onError(error);
		}
	}, [onBeforeEdit, onSubmit, onSuccess, onError]);

	const handleSubmitForm = useCallback((
		event: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(wrappedOnSubmit)(event).catch(console.error);
	}, [handleSubmit, wrappedOnSubmit]);

	return (
		<form onSubmit={handleSubmitForm} className={className}>
			{children}
		</form>
	);
}

WalletFormOnSubmit.displayName = 'WalletFormOnSubmit';

export { WalletFormOnSubmit };
export type { WalletFormOnSubmitProps };
