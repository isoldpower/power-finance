import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type PopoverSettingsRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const PopoverSettingsRow: FC<PopoverSettingsRowProps> = ({
	children,
	...props
}) => (
	<div className="flex items-center justify-between gap-4" {...props}>
		{children}
	</div>
);

PopoverSettingsRow.displayName = 'PopoverSettingsRow';

export { PopoverSettingsRow };
export type { PopoverSettingsRowProps };
