import { useMemo } from "react";

import type { LocalePickerVariant } from "./types.ts";
import type { FC } from "react";
import type { LocaleMeta } from "@entity/localization";


interface LocalePickerLabelProps {
	variant: LocalePickerVariant;
	locales: LocaleMeta[];
	children?: string;
	placeholder?: string;
}

const LocalePickerLabel: FC<LocalePickerLabelProps> = ({
	variant,
	children: value,
	locales,
	placeholder = "Select locale",
}) => {
	const currentLabel = useMemo(() => {
		const selected = locales.find((locale) => locale.tag === value);

		if (!selected) return value ?? placeholder;

		return variant === 'pill' || !selected.region
			? selected.name
			: `${selected.name} · ${selected.region}`;
	}, [locales, placeholder, value, variant]);

	return (
		<span className="truncate">
			{currentLabel}
		</span>
	);
}

export { LocalePickerLabel };
export type { LocalePickerLabelProps };
