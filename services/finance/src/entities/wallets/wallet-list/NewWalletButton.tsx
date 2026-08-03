import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


interface NewWalletButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'> {}

const NewWalletButton: FC<NewWalletButtonProps> = ({
	children,
	...props
}) => {
	return (
		<button
			type="button"
			className={cn(
				"flex flex-row gap-2 items-center",
				"text-xs font-semibold text-primary hover:underline"
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export { NewWalletButton };