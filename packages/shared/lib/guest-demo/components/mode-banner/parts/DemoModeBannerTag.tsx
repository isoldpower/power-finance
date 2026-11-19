import { Text } from "../../../../pure-components/typography/index.ts";
import { AlertIcon } from "../../AlertIcon.tsx";

import type { FC, PropsWithChildren } from "react";


type DemoModeBannerTagProps = PropsWithChildren;

const DemoModeBannerTag: FC<DemoModeBannerTagProps> = ({ children }) => (
	<span className="flex flex-none items-center gap-1.5 text-warn">
		<AlertIcon size={14} className="flex-none" />
		<Text size="12.5" weight="semibold" tone="warning">
			{children}
		</Text>
	</span>
);

DemoModeBannerTag.displayName = 'DemoModeBannerTag';

export { DemoModeBannerTag };
export type { DemoModeBannerTagProps };
