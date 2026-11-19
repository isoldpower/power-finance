import type { InsightTone } from "../types.ts";


const INSIGHT_ACCENT: Record<InsightTone, string> = {
	positive: 'bg-pos',
	negative: 'bg-neg',
	neutral: 'bg-primary',
};

const insightAccent = (tone: InsightTone): string => INSIGHT_ACCENT[tone];

export { insightAccent };
