import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";
import { textClass } from "@shared/pure-components/typography";


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
				cn(textClass({ size: 'xs', weight: 'semibold', tone: 'accent' }), "hover:underline")
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export { NewWalletButton };