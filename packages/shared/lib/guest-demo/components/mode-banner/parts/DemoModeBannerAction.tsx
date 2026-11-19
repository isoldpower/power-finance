import type { FC, PropsWithChildren } from "react";


type DemoModeBannerActionProps = PropsWithChildren;

const DemoModeBannerAction: FC<DemoModeBannerActionProps> = ({ children }) => (
	<div className="flex-none">
		{children}
	</div>
);

DemoModeBannerAction.displayName = 'DemoModeBannerAction';

export { DemoModeBannerAction };
export type { DemoModeBannerActionProps };
