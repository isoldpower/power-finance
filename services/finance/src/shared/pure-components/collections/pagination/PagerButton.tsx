import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


type PagerButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const PagerButton: FC<PagerButtonProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<button
			type="button"
			className={cn(
				"flex size-7 items-center justify-center rounded-[7px] border border-border-strong",
				"text-text-2 transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40",
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export { PagerButton };
export type { PagerButtonProps };
