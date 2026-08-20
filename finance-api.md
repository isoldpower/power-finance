Agreed on the principle — decoupling reads from the layout is the right call. It means the dashboard does parallel fetches instead of one blocking call, each piece caches on its own TTL, and the same endpoints get reused on other screens. Small cost: the client orchestrates and handles partial failure (which is actually a UX win — net worth can render while the ledger is still loading). Let me react to each.

1) GET /summary/insights?metrics=net_worth,cash_flow — Good. The metrics allow-list keeps it generic without becoming a UI mirror. Two notes: return each metric as a self-describing object keyed by name so partial results are unambiguous, and let range ride along since it only applies to time-series ones:

GET /summary/insights?metrics=net_worth,cash_flow&range=1M
{ "net_worth": { "value": {"amount":1824030,"currency":"USD"},
"change": {"pct":2.4,"direction":"up"},
"series": [ {"t":"2026-05-18","v":1781220}, … ] },
"cash_flow": { "in": {"amount":…}, "out": {"amount":…}, "range":"1M" } }
If a metric is unknown you 422 the bad one rather than silently dropping it.

2) GET /summary/ledger-balance — Fine, but question the split. How is ledger-balance different from net_worth? If net worth = assets−liabilities and ledger-balance = sum of cash/posted, they're genuinely different numbers and the split is right. If they overlap, fold it in as another metrics value (...&metrics=net_worth,ledger_balance) rather than a sibling route. Decoupling from UI cuts both ways — avoid a bespoke route when it's just another insight.

3) GET /transactions?cursor=0&limit=5 — Endpoint yes, but cursor=0 worries me. A numeric 0 is offset pagination wearing a cursor's name. Real cursors are opaque tokens (cursor=eyJpZCI6…) so inserts don't shift the window — exactly the case here since Add/Scan inject rows at the top. First page = omit cursor (or cursor=), and the server returns next_cursor. Keep limit=5 for the dashboard's recent-activity peek; the full table reuses the same route with a bigger limit + filters.

4) GET /wallets (no pagination) — Agreed, bounded set, no pagination. Worth deciding now: does this echo each wallet's balance, or just identity? The dashboard wallet strip shows balances, so include a balance per wallet — but note that makes it a "live" read (don't cache as aggressively as the wallet list itself). If you want the list cacheable, split identity from balance.

5) GET /currencies (no pagination) — Yes, and this one is genuinely static — cache hard (ETag + long max-age). One thought: is this the catalog of supported currencies (for pickers) or the user's active currencies + FX rates? If the UI shows converted totals, you need rates, and rates aren't static — that'd be GET /fx/rates?base=USD, separate from the currency catalog.

6) GET /actions?resolved=false&cursor=0&limit=3 — Good resource, same cursor=0 fix as #3. Naming: resolved=false reads clean. Make sure actions and notifications are truly distinct — actions = things needing a decision (approve a rule, confirm a scanned txn), notifications = passive feed. If so, keep them separate as you have. If an action is a notification with a CTA, consider GET /notifications?type=action.

7) GET /notifications?ack=false — Fine. Pair it with the write that flips it: POST /notifications/{id}/ack (or PATCH). Also give the badge a cheap count without pulling the list: GET /notifications/count?ack=false → { "count": 4 }, so the bell badge doesn't deserialize 50 rows.

8) POST /notification — SSE subscription — This is the one I'd reshape. Two issues:

Verb/semantics: opening a stream isn't creating a notification. POST /notification will read like "make a notification." SSE is a long-lived GET: GET /notifications/stream (Accept: text/event-stream). You don't POST to subscribe.
Scope of the stream: if you're already running a stream, let it carry all live dashboard deltas, not just notifications — notification.created, action.created, balance.updated, transaction.created as typed events on one connection. One socket, the client routes by event type and invalidates the relevant query. Otherwise you'll spin up a stream per widget.
GET /events/stream            // SSE, one connection
event: notification.created
event: transaction.created
event: balance.updated
So my only real edits to your list: opaque cursors not 0, SSE is a GET …/stream not POST, one event stream instead of a notifications-only one, and decide ledger-balance vs net_worth and currency-catalog vs fx-rates so you don't create routes that are really the same data.

Want to nail down the auth/scope header convention next (the Personal/Business switch affects every one of these), or move to the write paths — POST /transactions, Scan, and the ack/resolve mutations?