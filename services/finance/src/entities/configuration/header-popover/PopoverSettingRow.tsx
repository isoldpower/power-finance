import type { FC, BaseHTMLAttributes } from "react";


const PopoverSettingRow: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<div className="flex gap-4 items-center justify-between" {...props}>
		{children}
	</div>
);

export { PopoverSettingRow };