import { z } from "zod";

import { SETTINGS_SECTIONS } from "@entity/configuration";


const sections = Object.keys(SETTINGS_SECTIONS);

const searchSchema = z.object({
	current: z.enum([sections[0], ...sections.slice(1)])
		.default(sections[0])
		.catch(() => sections[0])
});

export { searchSchema };
