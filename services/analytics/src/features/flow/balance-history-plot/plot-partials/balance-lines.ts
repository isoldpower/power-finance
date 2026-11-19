import { TOTAL_INK } from "@shared/charts";
import { TOTAL_LINE_KEY, TOTAL_STROKE_WIDTH, WALLET_STROKE_WIDTH } from "../config.ts";

import type { BalanceHistoryView, BalanceSeriesView } from "@entity/flow";
import type { BalanceLine } from "../types.ts";


const totalLine = (view: BalanceHistoryView): BalanceLine => ({
	key: TOTAL_LINE_KEY,
	color: TOTAL_INK,
	strokeWidth: TOTAL_STROKE_WIDTH,
	isTotal: true,
	values: view.total,
});

const walletLine = (series: BalanceSeriesView): BalanceLine => ({
	key: series.key,
	color: series.wallet.color,
	strokeWidth: WALLET_STROKE_WIDTH,
	isTotal: false,
	values: series.values,
});

const toBalanceLines = (
	view: BalanceHistoryView,
	visibleWallets: BalanceSeriesView[],
	showTotal: boolean,
): BalanceLine[] => {
	const walletLines = visibleWallets.map(walletLine);

	if (!showTotal) {
		return walletLines;
	}

	return [totalLine(view), ...walletLines];
};

const keepShape = (line: BalanceLine): BalanceLine => line;

export { keepShape, toBalanceLines };
