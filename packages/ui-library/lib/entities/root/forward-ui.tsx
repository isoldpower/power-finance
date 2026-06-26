import * as React from "react";

export function forwardUi<T extends React.ElementType>(Component: T, displayName: string): T {
	const Wrapped = React.forwardRef<
		React.ComponentRef<T>,
		React.ComponentPropsWithoutRef<T>
	>((props, ref) => {
		const InternalComponent = Component as React.ElementType;
		
		return (
			<InternalComponent ref={ref} {...props} />
		);
	});
	
	Wrapped.displayName = displayName;
	return Wrapped as unknown as T;
}
