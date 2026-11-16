import { BodyText } from "../../../../pure-components/typography/index.ts";

import type { FC, PropsWithChildren } from "react";


type DemoPreparationDescriptionProps = PropsWithChildren;

const DemoPreparationDescription: FC<DemoPreparationDescriptionProps> = ({ children }) => (
	<BodyText className="-mt-3">
		{children}
	</BodyText>
);

DemoPreparationDescription.displayName = 'DemoPreparationDescription';

export { DemoPreparationDescription };
export type { DemoPreparationDescriptionProps };
