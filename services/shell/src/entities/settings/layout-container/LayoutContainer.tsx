import {ReactNode} from "react";

interface LayoutContainerProps {
	title: string;
	children: ReactNode;
}

function LayoutContainer({
	title,
	children
}: LayoutContainerProps) {
	return (
		<div style={{ width: '100%', border: '1px solid #fff', borderRadius: '8px' }}>
			<div style={{ paddingRight: '24px', paddingLeft: '24px' }}>
				<h3>{title}</h3>
			</div>
			<hr />
			<div style={{ padding: '16px 24px' }}>
				{children}
			</div>
		</div>
	)
}

LayoutContainer.displayName = 'LayoutContainer';

export { LayoutContainer };