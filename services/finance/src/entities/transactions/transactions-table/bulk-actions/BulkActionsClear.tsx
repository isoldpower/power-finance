import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type BulkActionsClearProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;

const BulkActionsClear: FC<BulkActionsClearProps> = ({
	children,
	...props
}) => (
	<button type="button" className="text-text-3 hover:underline" {...props}>
		{children}
	</button>
);

BulkActionsClear.displayName = 'BulkActionsClear';

export { BulkActionsClear };
export type { BulkActionsClearProps };
