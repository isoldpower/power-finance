import type { FC, PropsWithChildren } from "react";


type DemoPreparationActionsProps = PropsWithChildren;

const DemoPreparationActions: FC<DemoPreparationActionsProps> = ({ children }) => (
	<div className="flex justify-end">
		{children}
	</div>
);

DemoPreparationActions.displayName = 'DemoPreparationActions';

export { DemoPreparationActions };
export type { DemoPreparationActionsProps };
