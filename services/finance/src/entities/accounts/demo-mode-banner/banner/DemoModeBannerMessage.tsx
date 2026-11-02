import { BodyText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type DemoModeBannerMessageProps = PropsWithChildren;

const DemoModeBannerMessage: FC<DemoModeBannerMessageProps> = ({ children }) => (
	<BodyText as="span" size="12.5" leading="snug" className="min-w-0 flex-1">
		{children}
	</BodyText>
);

DemoModeBannerMessage.displayName = 'DemoModeBannerMessage';

export { DemoModeBannerMessage };
export type { DemoModeBannerMessageProps };
