# AS NEXUS 2 — AS DESIGN LB

Functional bilingual ERP portfolio concept for wholesale distribution. Created 8 October 2026. Fictional company, customers, products and financial data.

## Try it

Live demo (hosted on the AS Design LB website): https://asdesignlb.com/demos/erp — no password. Walkthrough video: https://asdesignlb.com/systems

Run it locally: `npm start`, then open http://127.0.0.1:4318 (set `PORT` to change it). The app is plain static files, so `dist/` can also be dropped on any static host.

Switch language with **ع / EN**. Change display currency between USD, EUR and LBP. Use the role selector to explore demonstration permissions. Data stays in the browser where you enter it; Workspace settings → reset restores the sample data.

## Connected capabilities

1. Business overview with journal-derived revenue, gross margin, cash and operating profit.
2. CRM pipeline with six stages, estimated deal values and weighted forecasting.
3. Multi-line quotations, document currency snapshots and one-time order conversion.
4. Multi-product orders, prices, line discounts and illustrative document taxes.
5. Commercial approval thresholds and explicit customer credit overrides.
6. Lot-level FEFO reservations across two warehouses. Expired and quarantined stock excluded.
7. Partial shipments and a customer policy for complete shipments.
8. Separate shipment invoices, partial payments, linked returns and cash refunds when required.
9. Original lot-cost restoration on returns, with optional quarantine.
10. Virtual kits with real component availability and reservations.
11. Stock transfers that retain lot cost and expiry.
12. Physical cycle counts, variance approval and inventory adjustment journals.
13. Purchase requests, approval, partial receipts and payments limited to received goods.
14. Min/max replenishment using stock, approved demand and incoming supply.
15. Customer statements, credit limits and account balances.
16. Expense submission, approval and cash/profit posting.
17. CSV bank statement import and matching to existing payments without double-posting.
18. P&L, receivable aging, customer gross profitability and ABC inventory value.
19. Rule-based decision explanations with source-screen links and a margin scenario model.
20. Wholesale customer portal, cart, kits and order submission into the same workflow.
21. Local event history, CSV exports, printable invoice HTML, JSON backup and restore.
22. English/Arabic RTL, responsive layouts, light/dark themes and a guided tour.

## Five-minute walkthrough

1. In **Sales orders**, create a new order for Cedar Pharmacy. Add 12 Hydra Barrier Serum and 8 Daily Mineral SPF 50. Select 11% illustrative tax.
2. Open the new order and **Review & approve**. The system evaluates unpaid balances plus approved open orders. If a credit exception is needed, only Administrator can explicitly authorize it.
3. Open **Pick, pack & ship**. Enter 5 serum and 3 SPF; tick the picking confirmation. This creates an invoice for **$179.82**, leaving the other quantities reserved.
4. In **Invoices & payments**, open that invoice and record **$100**. The remaining balance becomes **$79.82**.
5. Return one serum to saleable stock. A **$19.98** credit reduces the balance to **$59.84** and restores **$9.40** of inventory cost.
6. In **Purchasing**, receive 40 of PO-2081's 120 balm units. Only **$224** enters inventory and payables; 80 units remain open.
7. In **Bank matching**, match INV-2980's $136.80 entry to PAY-0. This adds no new journal entry.
8. Explore Analytics and the Arabic version. Use Workspace settings to back up or reset.

## Honest scope

This is a functional client-side prototype, not a production ERP. No authenticated accounts, shared database, server-side permissions, live bank/payment integrations, e-invoice provider, tax certification, or live AI model are connected. Roles are demonstration controls and can be changed in the UI. Source code contains fictional demonstration data.

USD is the accounting base. EUR and LBP rates are illustrative, editable values; they are not market rates. Document rates remain fixed after settings change. Sales prices and purchase costs are entered in USD base. Sales taxes are illustrative per-line rounded examples. Purchase tax, exchange gains/losses, tax reporting, opening balance collection, automated due-date calendars and compliance localization are not implemented.

Supplier lead times and price indices are scenario assumptions. Replenishment is a stock/demand/incoming min/max model, not a full demand forecast. Customer profitability is gross profit before shared operating expenses. Opening receivable balances have unknown ages and appear separately in aging. Warehouse picking uses a confirmation form; scanner hardware and shipping-carrier integration are future work.

The video is a silent walkthrough assembled from actual browser views and verified transaction states, with bilingual captions. It is not a production customer installation.

## Source and checks

The source ZIP includes `dist/`, `netlify.toml`, this guide and engine tests. No dependency install is necessary to serve the static app.

Run: `node --test tests/engine.test.cjs`

22 transaction tests cover balanced journals, stock/AR/AP reconciliation, FEFO, expiry, partial shipping, tax rounding, returns, quarantine, currency snapshots, procurement, counts, permissions, matching and quote conversion. Browser checks exercised multi-product creation, approval, partial shipping, payment, return, partial receipt, matching, navigation, language and responsive layouts.

For publication, serve `dist/` from any static host. On asdesignlb.com it lives in `project/public/demos/erp`. Fonts are self-hosted in `dist/fonts`, so no third-party request is made. No secrets or API keys are needed for this concept.

## Production development plan

First establish tenant-isolated organizations, real identity and server authorization, SQL storage, transaction locks, idempotent document posting, migrations and backup recovery. Then add warehouse scanning, vendor/catalog editing, real exchange rates, purchase taxes and country-specific invoicing. Add accounting review, live integrations and security evaluation before using real company transactions.

The portfolio story: **From fragmented wholesale operations to a connected commerce command center.** Present the credit-to-shipment-to-payment scenario, show financial evidence, then show the customer portal. Keep the demonstration and future production scope clear to prospective clients.

