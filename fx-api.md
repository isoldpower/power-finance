# FX / Currency API contract

Both endpoints live under the `fx` resource. The frontend consumes them through a single
client interface (`IFxRESTApiClient`, `services/finance/src/features/localization/currencies-api/types.ts`);
`FxMockRESTApiClient` and `FxDjangoRESTApiClient` both implement it, so switching from mock
to real is one line in `services/finance/src/app/api/servers/useFxApi.ts`.

## `GET /fx/currencies`

The catalog of currencies the app supports. This is the **only** source of the currency list
in the frontend — the header selector, the settings picker and the wallet forms all render it.
A code the backend does not return cannot be picked anywhere in the UI.

```json
{
  "currencies": [
    { "code": "USD", "symbol": "$", "name": "US Dollar", "decimals": 2 },
    { "code": "JPY", "symbol": "¥", "name": "Yen", "decimals": 0 }
  ]
}
```

- `code` — ISO 4217, uppercase. Used as the key against `/fx/rates` and as the wallet's stored currency.
- `symbol` — display glyph. The picker renders it in a fixed 24px column, so **keep it to 1–2 characters**
  (`$`, `€`, `C$`, `M$`); longer symbols are ellipsised. The code sits right next to it, so dollar
  variants do not need disambiguating prefixes (`MXN M$`, not `Mex$`).
- `name` — short display label (the settings picker and wallet select show it next to the code).
  Prefer abbreviated forms for long names (`Br. Pound`, not `Pound Sterling`).
- `decimals` — minor-unit digits. Not yet consumed by the frontend (formatting currently comes
  from `Intl.NumberFormat`), but part of the contract so rounding can move server-side later.

Static data: cache hard (ETag + long `max-age`). The frontend caches it for 24h
(`CATALOG_STALE_TIME` in `use-currencies.ts`).

## `GET /fx/rates?base=<code>`

```json
{
  "base": "USD",
  "rates": { "USD": 1, "EUR": 0.92, "JPY": 156 },
  "asOf": "2026-07-28T10:00:00Z"
}
```

- `rates[X]` = units of `X` per 1 `base`. The frontend converts **into** the main currency by
  dividing (`use-convert-money.ts`), so this direction matters.
- `base` echoes the requested code; `asOf` is the quote timestamp.
- Every code from `/fx/currencies` should appear in `rates`. A missing code makes the frontend
  fall back to showing the amount unconverted in its original currency.
- Volatile: short cache TTL. The frontend re-queries per base with a 5 min stale time.

## Notes for the backend

- The catalog and the rate table must agree on codes — the mock serves both from one table
  (`CURRENCY_CATALOG` in `currencies-api/rest-client/mock-server.ts`); the real backend should do
  the same rather than keeping two lists.
- Settings persist `mainCurrency` client-side (localStorage). If the catalog ever drops a code a
  user has selected, the UI falls back to displaying the raw code, so removals are safe but visible.
