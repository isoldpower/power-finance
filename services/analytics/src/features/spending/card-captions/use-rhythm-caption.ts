import { useMemo } from "react";
import { hourLabel, weekdayLabel } from "@entity/spending";
import { useMoneyFormat } from "@shared/formatting";
import { RHYTHM_DEFAULT_CAPTION } from "./config.ts";

import type { SpendingRhythm } from "@entity/spending";


const useRhythmCaption = (rhythm: SpendingRhythm | undefined): string[] => {
	const formatMoney = useMoneyFormat();

	return useMemo(() => {
		const peak = rhythm?.peak;

		if (!peak) {
			return [RHYTHM_DEFAULT_CAPTION];
		}

		const weekday = weekdayLabel(peak.weekday - 1);

		return [`Peak: ${weekday} around ${hourLabel(peak.hour)}`, formatMoney(peak.amount)];
	}, [rhythm, formatMoney]);
};

export { useRhythmCaption };
