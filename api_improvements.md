# API Improvements

## 1. `GET /transactions/` — return `TransactionDetailed` instead of `TransactionPreview`

**Problem:** List returns `{ source_wallet_id }` (ID only). Each rendered transaction card calls `GET /transactions/{id}/` individually to get `source_wallet` name and amount details — N requests for N transactions.

**Fix:** Embed the full `source_wallet` object in every list item, matching the single-GET response shape. Eliminates all per-transaction detail fetches.

**Impact:** N → 1 request per transaction list load.

---

## 2. `GET /wallets/` — return `WalletDetailed` instead of `WalletPreview`

**Problem:** After listing wallets, each wallet card calls `GET /wallets/{id}/` individually to get fresh detailed data and drive stale/error UI states — N requests for N wallets.

**Fix:** Return `WalletDetailed` from the list endpoint. Frontend seeds `useWallet` query cache from list data instead of re-fetching per card.

**Impact:** N → 1 request per wallet list load.

---

## 3. `GET /transactions/` — support `wallet_id` filter param

**Problem:** All transactions are fetched and then filtered client-side by `source_wallet_id`. Fetches the entire transaction history to show a single wallet's transactions.

**Fix:** Accept `?wallet_id=<uuid>` query param and filter server-side.

**Impact:** Removes full-history payload for wallet-scoped views.

---

## 4. `GET /transactions/` — enforce pagination (`limit`, `offset`)

**Problem:** Frontend fetches all transactions in one request. The backend already returns `meta.total/offset/limit` but the frontend never sends pagination params.

**Fix:** Frontend sends `?limit=20&offset=0` and pages on demand. Backend already has the infrastructure.

**Impact:** Payload size bounded regardless of transaction history length.

---

## 5. Analytics — single batch endpoint `GET /analytics/summary/`

**Problem:** Dashboard fires 5 separate requests on every load (categories, money flow, expenditure, balance history, heatmap).

**Fix:** Single `GET /analytics/summary/` endpoint returns all datasets in one response envelope. Frontend makes one call and distributes results.

**Impact:** 5 → 1 request per dashboard load.
