import {cn} from "@internal/ui-library";
import { BaseHTMLAttributes, FC } from "react";


const PostingsContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex items-center gap-2.5 rounded-[9px]",
				"border border-border-strong bg-card px-3 py-2.5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export { PostingsContainer };