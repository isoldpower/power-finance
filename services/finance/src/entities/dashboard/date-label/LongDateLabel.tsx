import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";


const LongDateLabel = () => {
	const { locale } = useSettingsContext();
	
	const dateLabel = useMemo(() => {
		const now = new Date();
		const weekday = now.toLocaleDateString(locale, { weekday: 'short' }).toUpperCase();
		const month = now.toLocaleDateString(locale, { month: 'short' }).toUpperCase();
		return `${weekday} · ${month} ${now.getDate().toString()} · ${now.getFullYear().toString()}`;
	}, [locale]);
	
	return (
		<span className="font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3">
			{dateLabel}
		</span>
	);
}

export { LongDateLabel };