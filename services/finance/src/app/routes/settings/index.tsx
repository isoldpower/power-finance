import { createFileRoute } from '@tanstack/react-router'

import { SettingsPage, searchSchema } from "@page/settings-page";


export const Route = createFileRoute('/settings/')({
	staticData: { title: 'Settings' },
	component: SettingsPage,
	validateSearch: searchSchema,
});
