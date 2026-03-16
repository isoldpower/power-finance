import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from "@page/settings-page";

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})
