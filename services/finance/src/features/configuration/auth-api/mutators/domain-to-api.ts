import type { UserPreferencesPatch } from "@entity/configuration";
import type { PreferencesPatchBody } from "../types.ts";


const preferencesPatchToApi = (patch: UserPreferencesPatch): PreferencesPatchBody => ({
	...(patch.locale === undefined
		? {}
		: { locale: patch.locale }),
	...(patch.mainCurrency === undefined
		? {}
		: { main_currency: patch.mainCurrency }),
	...(patch.timezone === undefined
		? {}
		: { timezone: patch.timezone }),
});

export { preferencesPatchToApi };
