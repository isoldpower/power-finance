import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NeedsActionHeaderDescriptorProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>
>;

const NeedsActionHeaderDescriptor: FC<NeedsActionHeaderDescriptorProps> = ({
	children,
	...props
}) => (
	<MetaText size="11" className="hidden sm:block" {...props}>
		{children}
	</MetaText>
);

NeedsActionHeaderDescriptor.displayName = 'NeedsActionHeaderDescriptor';

export { NeedsActionHeaderDescriptor };
export type { NeedsActionHeaderDescriptorProps };
