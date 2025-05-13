import { TestWidgetsPage } from '@page/test-widgets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test/widgets')({
  component: TestWidgetsPage,
})
