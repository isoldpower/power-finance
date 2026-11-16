import { useMemo } from "react";
import { cn, FinanceCard } from "@internal/ui-library";
import { KpiTileDelta } from "./tile/KpiTileDelta.tsx";
import { KpiTileFootnote } from "./tile/KpiTileFootnote.tsx";
import { KpiTileLabel } from "./tile/KpiTileLabel.tsx";
import { KpiTileSparkline } from "./tile/KpiTileSparkline.tsx";
import { KpiTileValue } from "./tile/KpiTileValue.tsx";

import type { FC, PropsWithChildren } from "react";
import type { KpiTileDeltaProps } from "./tile/KpiTileDelta.tsx";
import type { KpiTileFootnoteProps } from "./tile/KpiTileFootnote.tsx";
import type { KpiTileLabelProps } from "./tile/KpiTileLabel.tsx";
import type { KpiTileSparklineProps } from "./tile/KpiTileSparkline.tsx";
import type { KpiTileValueProps } from "./tile/KpiTileValue.tsx";


type KpiTileProps = PropsWithChildren<{
	delay?: number;
}>;
type KpiTileObject = FC<KpiTileProps> & {
	Delta: FC<KpiTileDeltaProps>;
	Footnote: FC<KpiTileFootnoteProps>;
	Label: FC<KpiTileLabelProps>;
	Sparkline: FC<KpiTileSparklineProps>;
	Value: FC<KpiTileValueProps>;
};

const KpiTile: KpiTileObject = ({ delay = 0, children }) => {
	const style = useMemo(() => {
		return { animationDelay: `${delay.toString()}s` };
	}, [delay]);

	return (
		<FinanceCard
			className={cn(
				"fx-rise relative flex flex-col gap-1.5 overflow-hidden px-[18px] pb-3 pt-4",
				"transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-[var(--shadow-lg)]",
			)}
			style={style}
		>
			{children}
		</FinanceCard>
	);
};

KpiTile.Delta = KpiTileDelta;
KpiTile.Footnote = KpiTileFootnote;
KpiTile.Label = KpiTileLabel;
KpiTile.Sparkline = KpiTileSparkline;
KpiTile.Value = KpiTileValue;
KpiTile.displayName = 'KpiTile';

export { KpiTile };
export type { KpiTileProps };
