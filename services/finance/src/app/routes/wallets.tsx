import { createFileRoute } from '@tanstack/react-router'
import { WalletsPage } from "@page/wallets-page";

export const Route = createFileRoute('/wallets')({
  component: WalletsPage,
})
