import { useMemo } from "react";
import { cn } from "@internal/ui-library";
import { InsightCardDetail } from "./card/InsightCardDetail.tsx";
import { InsightCardTitle } from "./card/InsightCardTitle.tsx";

import type { FC, PropsWithChildren } from "react";
import type { InsightCardDetailProps } from "./card/InsightCardDetail.tsx";
import type { InsightCardTitleProps } from "./card/InsightCardTitle.tsx";


type InsightCardProps = PropsWithChildren<{
	accentClassName: string;
	delay?: number;
}>;
type InsightCardObject = FC<InsightCardProps> & {
	Detail: FC<InsightCardDetailProps>;
	Title: FC<InsightCardTitleProps>;
};

const InsightCard: InsightCardObject = ({ accentClassName, delay = 0, children }) => {
	const style = useMemo(() => {
		return { animationDelay: `${delay.toString()}s` };
	}, [delay]);

	return (
		<article
			className={cn(
				"fx-rise relative flex gap-3 overflow-hidden rounded-[var(--radius-lg)] border border-border",
				"bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] px-4 py-3.5 backdrop-blur-[6px]",
			)}
			style={style}
		>
			<span className={cn("mt-1 h-8 w-1 shrink-0 rounded-full", accentClassName)} />
			<div className="flex min-w-0 flex-col gap-0.5">
				{children}
			</div>
		</article>
	);
};

InsightCard.Detail = InsightCardDetail;
InsightCard.Title = InsightCardTitle;
InsightCard.displayName = 'InsightCard';

export { InsightCard };
export type { InsightCardProps };
