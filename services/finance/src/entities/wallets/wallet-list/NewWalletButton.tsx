import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type NewWalletButtonProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;

const NewWalletButton: FC<NewWalletButtonProps> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"flex flex-row items-center gap-2",
			textClass({ size: 'xs', weight: 'semibold', tone: 'accent' }),
			"hover:underline"
		)}
		{...props}
	>
		{children}
	</button>
);

NewWalletButton.displayName = 'NewWalletButton';

export { NewWalletButton };
export type { NewWalletButtonProps };
