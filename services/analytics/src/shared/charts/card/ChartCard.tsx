import { cn, FinanceCard } from "@internal/ui-library";
import { ChartCardActions } from "./parts/ChartCardActions.tsx";
import { ChartCardBody } from "./parts/ChartCardBody.tsx";
import { ChartCardCaption } from "./parts/ChartCardCaption.tsx";
import { ChartCardHeader } from "./parts/ChartCardHeader.tsx";
import { ChartCardHeadline } from "./parts/ChartCardHeadline.tsx";
import { ChartCardTitle } from "./parts/ChartCardTitle.tsx";

import type { FC } from "react";
import type { FinanceCardProps } from "@internal/ui-library";
import type { ChartCardActionsProps } from "./parts/ChartCardActions.tsx";
import type { ChartCardBodyProps } from "./parts/ChartCardBody.tsx";
import type { ChartCardCaptionProps } from "./parts/ChartCardCaption.tsx";
import type { ChartCardHeaderProps } from "./parts/ChartCardHeader.tsx";
import type { ChartCardHeadlineProps } from "./parts/ChartCardHeadline.tsx";
import type { ChartCardTitleProps } from "./parts/ChartCardTitle.tsx";


type ChartCardProps = FinanceCardProps;
type ChartCardObject = FC<ChartCardProps> & {
	Actions: FC<ChartCardActionsProps>;
	Body: FC<ChartCardBodyProps>;
	Caption: FC<ChartCardCaptionProps>;
	Header: FC<ChartCardHeaderProps>;
	Headline: FC<ChartCardHeadlineProps>;
	Title: FC<ChartCardTitleProps>;
};

const ChartCard: ChartCardObject = ({ className, children, ...props }) => (
	<FinanceCard className={cn("relative flex flex-col gap-4 px-6 py-[22px]", className)} {...props}>
		{children}
	</FinanceCard>
);

ChartCard.Actions = ChartCardActions;
ChartCard.Body = ChartCardBody;
ChartCard.Caption = ChartCardCaption;
ChartCard.Header = ChartCardHeader;
ChartCard.Headline = ChartCardHeadline;
ChartCard.Title = ChartCardTitle;
ChartCard.displayName = 'ChartCard';

export { ChartCard };
export type { ChartCardProps };
