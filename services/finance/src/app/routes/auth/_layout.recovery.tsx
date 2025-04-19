import { createFileRoute } from '@tanstack/react-router'
import { RecoveryPage } from "@src/pages/auth";

export const Route = createFileRoute('/auth/_layout/recovery')({
  component: RecoveryPage,
})
