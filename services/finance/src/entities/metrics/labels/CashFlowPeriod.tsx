import { BodyText } from "@shared/pure-components/typography";
import { rangeVerbose } from "../visual-map";

import type { FC } from "react";


interface CashFlowPeriodProps {
	period: string;
}

const CashFlowPeriod: FC<CashFlowPeriodProps> = ({ period }) => (
	<BodyText as="span" size="13">
		Net {rangeVerbose(period).toLowerCase()}
	</BodyText>
);

CashFlowPeriod.displayName = 'CashFlowPeriod';

export { CashFlowPeriod };
export type { CashFlowPeriodProps };
