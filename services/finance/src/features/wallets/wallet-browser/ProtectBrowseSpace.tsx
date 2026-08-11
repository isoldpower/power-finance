import type { BaseHTMLAttributes, FC } from "react";
import { Caption } from "@shared/pure-components/typography";


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
		<Caption size="11" className="border-t border-border px-4 py-3 text-center" {...props}>
			{children}
		</Caption>
	);
}

export { ProtectBrowseSpace };