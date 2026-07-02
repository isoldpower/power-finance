import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod";

import { SettingsPage } from "@page/settings-page";
import { SETTINGS_SECTIONS } from "@entity/configuration";

const optionsArray = Object.keys(SETTINGS_SECTIONS);

const searchSchema = z.object({
	current: z.enum([optionsArray[0], ...optionsArray.slice(1)])
		.default(optionsArray[0])
		.catch(() => optionsArray[0])
});

type SearchSchema = z.infer<typeof searchSchema>;

export const Route = createFileRoute('/finance/settings/')({
  	component: SettingsPage,
	validateSearch: searchSchema,
});

export type { SearchSchema };
