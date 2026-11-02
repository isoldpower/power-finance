import { Heading } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type DemoPreparationHeadingProps = PropsWithChildren;

const DemoPreparationHeading: FC<DemoPreparationHeadingProps> = ({ children }) => (
	<Heading as="h1" size="19">
		{children}
	</Heading>
);

DemoPreparationHeading.displayName = 'DemoPreparationHeading';

export { DemoPreparationHeading };
export type { DemoPreparationHeadingProps };
