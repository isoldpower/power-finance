import { createFileRoute } from '@tanstack/react-router'
import { WalletsPage } from "@page/wallets-page";

export const Route = createFileRoute('/dashboard/wallets')({
  component: WalletsPage,
})
