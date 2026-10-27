# AS NEXUS 2 — Competitor research and product decisions

Researched 08 October 2026. Sources below are vendor documentation and product pages. This is a feature comparison, not a claim of equivalence with the full products.

| Competitor | Verified capability | Product decision for AS NEXUS |
|---|---|---|
| Odoo | Lot selection by earliest removal date, plus configurable minimum/maximum replenishment | Add actual lot-level reservations, expiry exclusion, FEFO allocation and a replenishment workbench |
| ERPNext | Multi-line sales orders, reservations, document currency/exchange rate, order-to-cash flow | Separate quotes, orders, shipments, invoices and payments; preserve exchange-rate snapshots |
| Microsoft Business Central | Partial shipments with a customer-level partial/complete preference | Ship selected quantities and leave an explicit backorder; honor complete-shipment settings |
| Oracle NetSuite | Warehouse-guided fulfillment and allocation across locations | Focused picking workspace and cross-warehouse allocation details |
| Zoho Inventory | Virtual kits retain stock at component level | Sell curated sets and expand them into real component reservations and costs |
| SAP Business One | Connected purchasing, goods receipts, payable documents, financials and analytics | Tie receipt, stock valuation and payable postings together; expose related documents |
| ERPNext | Payment reconciliation allocates existing payments and does not create another bank movement | Add statement matching against existing payment records and prevent duplicate matching |

## Primary sources

- [Odoo — FEFO removal](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/shipping_receiving/removal_strategies/fefo.html)
- [Odoo — Replenishment report](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/warehouses_storage/replenishment/report.html)
- [ERPNext — Sales Order](https://docs.frappe.io/erpnext/sales-order)
- [ERPNext — Payment Reconciliation](https://docs.frappe.io/erpnext/payment-reconciliation)
- [Microsoft — Process partial shipments](https://learn.microsoft.com/en-ca/dynamics365/business-central/sales-how-send-partial-shipments)
- [Oracle NetSuite — Order fulfillment](https://www.netsuite.com/portal/products/erp/warehouse-fulfillment/order-fulfillment.shtml)
- [Zoho Inventory — Composite items](https://www.zoho.com/us/inventory/help/items/composite-items.html)
- [SAP Business One — Features](https://www.sap.com/australia/products/erp/business-one/features.html)

## Priorities

The demo focuses on commerce and distribution. Working processes take precedence over unrelated feature menus. CRM, quotations, approvals, fulfillment, stock, purchasing, receivables, expenses, matching and reports must share one dataset.

Commercial document rates, prices, discounts and costs are stored with each transaction. The demo's exchange rates and tax percentages are editable illustrative settings, not live market data or a certified tax implementation.

## Hosting

[Netlify's official CLI documentation](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) supports anonymous trial deployment. Unclaimed trial projects are removed after one hour. An authenticated account or timely claim is needed for a lasting Netlify project.
