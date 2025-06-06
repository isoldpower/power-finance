import { Children } from "react";
import type { LiHTMLAttributes, ReactNode } from "react";


interface ListProps extends LiHTMLAttributes<HTMLUListElement> {
	children?: ReactNode;
	elementProps?: ((index: number) => LiHTMLAttributes<HTMLLIElement>) | LiHTMLAttributes<HTMLLIElement>;
}

const List: React.FC<ListProps> = ({
	children,
	elementProps,
	...props
}) => {
	return (
		<ul {...props}>
			{Children.toArray(children).map((child, index) => {
				const overrideProps = typeof elementProps === 'function'
					? elementProps(index)
					: elementProps;

				return (
					<li key={`list-item-${index.toString()}`} {...overrideProps}>`
						{child}
					</li>
				)
			})}
		</ul>
	)
}

List.displayName = 'List';

export { List };
export type { ListProps };