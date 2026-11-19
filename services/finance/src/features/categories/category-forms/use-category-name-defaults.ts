import { useMemo } from "react";

import type { CategoryRef } from "@entity/categories";
import type { CategoryNameSchema } from "./schemas.ts";


const useCategoryNameDefaults = (
	category?: CategoryRef
): CategoryNameSchema => {
	const name = category?.name ?? '';

	return useMemo(() => {
		return ({ name } satisfies CategoryNameSchema);
	}, [name]);
};

export { useCategoryNameDefaults };
