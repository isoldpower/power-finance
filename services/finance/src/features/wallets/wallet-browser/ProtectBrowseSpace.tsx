import type { BaseHTMLAttributes, FC } from "react";


interface ProtectBrowseSpaceProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	resources: unknown[];
	pageSize: number;
}

const ProtectBrowseSpace: FC<ProtectBrowseSpaceProps> = ({ 
	children,
	resources,
	pageSize,
	...props
}) => {
	return resources.length < pageSize && (
		<div className="border-t border-border px-4 py-3 text-center text-[11px] text-text-3" {...props}>
			{children}
		</div>
	);
}

export { ProtectBrowseSpace };