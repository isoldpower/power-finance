import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type PopoverBottomProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const PopoverBottom: FC<PopoverBottomProps> = ({
	children,
	...props
}) => (
	<div className="border-t border-border p-1" {...props}>
		{children}
	</div>
);

PopoverBottom.displayName = 'PopoverBottom';

export { PopoverBottom };
export type { PopoverBottomProps };
