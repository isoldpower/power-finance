import { createFileRoute } from '@tanstack/react-router'
import { TransactionsPage, searchSchema } from "@page/transactions-page";

export const Route = createFileRoute('/finance/dashboard/transactions')({
  component: TransactionsPage,
	validateSearch: searchSchema
})
