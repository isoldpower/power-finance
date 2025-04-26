import {createFileRoute} from '@tanstack/react-router'
import {FinancePage} from "@page/finance-page";

export const Route = createFileRoute('/finance/$')({
  component: FinancePage,
});