# Power Finance — Analytics

Module-federation remote (`analytics/remote-app`) mounted by the shell under `/analytics/*`, also runnable on its own
(`pnpm dev`, port 3001). Interactive, drill-down analytics over the finance ledger, styled with the finance design
tokens (`.finance-theme`) and built with visx.

## Pages

| Route | What it shows |
| --- | --- |
| `/overview` | KPI tiles with sparklines and period deltas, generated insights, cash-flow bars / closing balance, category donut, spending pace vs the previous period |
| `/spending` | Category breakdown (donut / radar vs previous period / radial), categories over time (stacked / streamgraph), daily spending calendar, weekday × hour rhythm heatmap, top merchants and payers |
| `/flow` | Sankey money flow (income → wallets → expenses), balance history per wallet with a brush to zoom, running surplus & deficit (threshold / lines) |

Every chart element opens the shared drill-down panel (category, day, period, counterparty, wallet) with the matching
transactions. Period presets, a custom range and the wallet filter live in one persisted store shared by all pages.

## Data

All data comes from `/api/v1/analytics/*` — see [analytics-api.md](./analytics-api.md). `CLIENT_API_MODE=mock` (default)
serves every endpoint from the in-browser mock servers, which read the finance mock ledger from local storage when it
has transactions and otherwise generate a deterministic 14-month demo ledger.

## Layout

Same FSD layering as `services/finance`: `app → pages → processes → widgets → features → entities → shared`, sliced by
domain (`filters`, `overview`, `cash-flow`, `categories`, `money-flow`, `patterns`, `balances`, `transactions`,
`navigation`). Cross-service primitives (API transport, formatting, typography, layout, motion, background) come from
`@internal/shared`; chart atoms shared by several domains live in `src/shared/charts`.
