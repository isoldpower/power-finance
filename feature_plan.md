# Feature Plan — Untouched API Endpoints

## 1. Notifications

### Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/notifications/` | List notifications (paginated) |
| `POST` | `/api/v1/notifications/ack/` | Batch acknowledge notifications |
| `POST` | `/api/v1/notifications/{notification_id}/ack/` | Acknowledge single notification |

### Notification shape
```
{
  id: uuid
  short: string        // short title/label
  message: string      // full message body
  is_read: boolean
  payload: object | null
  created_at: datetime
}
```

### Pages / UI to implement
- **Notification bell / dropdown** (shell or finance header): badge count of unread, list of recent notifications with `short` as title and `message` as body, click to acknowledge (`POST /{id}/ack/`).
- **Notifications page** (`/notifications`): full paginated list, bulk "mark all as read" button (`POST /ack/` with batch of IDs), filter by read/unread.

---

## 2. Search / Filtering

### Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/transactions/search/` | Filter transactions |
| `POST` | `/api/v1/wallets/search/` | Filter wallets |
| `POST` | `/api/v1/webhooks/search/` | Filter webhooks |

### Request shape
```json
{
  "filter_body": {
    "<field>": { "<operator>": "<value>" }
  }
}
```
Example: `{ "filter_body": { "name": { "contains": "savings" } } }`

### Pages / UI to implement
- **Transaction search bar** (on the transactions page / dashboard): text input triggering `POST /transactions/search/` with `filter_body`. Support filtering by wallet, amount range, date range.
- **Wallet search** (on the wallets list): inline search input, calls `POST /wallets/search/` by name or balance range.
- **Webhook search** (on the settings/webhooks page): filter by URL or title.

All three share the same filter DSL — a shared `SearchInput` + `FilterBuilder` component can cover all three cases.

---

## 3. Webhook Event Subscriptions

### Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/webhooks/{id}/events/` | List event subscriptions for a webhook |
| `POST` | `/api/v1/webhooks/{id}/events/` | Subscribe to an event |
| `DELETE` | `/api/v1/webhooks/{id}/events/{subscription_id}/` | Unsubscribe from an event |

### Available event types
```
transaction.created
transaction.updated
transaction.deleted
```

### Pages / UI to implement
- **Webhook detail / edit panel** (expand the existing webhook settings UI): show current subscriptions fetched from `GET /{id}/events/`, allow toggling each of the 3 event types on/off (`POST` to subscribe, `DELETE` to unsubscribe by `subscription_id`).
- This replaces/extends the current static webhook form — subscriptions are managed separately from the webhook URL/title.
