import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type LockedFieldCodeProps = PropsWithChildren;

const LockedFieldCode: FC<LockedFieldCodeProps> = ({ children }) => (
	<Text size="13" weight="semibold" tone="strong">
		{children}
	</Text>
);

LockedFieldCode.displayName = 'LockedFieldCode';

export { LockedFieldCode };
export type { LockedFieldCodeProps };
