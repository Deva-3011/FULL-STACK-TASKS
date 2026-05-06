/**
 * invoice_calculator.js
 * ---------------------
 * Calculates invoice totals from an array of line items.
 *
 * Generated via Prompt Engineering (Task 23):
 *   Prompt: "You are a backend developer. Write a Node.js module (ES module syntax)
 *   that calculates an invoice total given an array of line items. Each item has:
 *   name (string), quantity (number), unit_price (number), tax_rate (number 0-1).
 *   Return an object with: subtotal, total_tax, total. Round all amounts to 2
 *   decimal places. Export the function. Include JSDoc comments."
 */

/**
 * @typedef {Object} LineItem
 * @property {string} name       - Product or service name
 * @property {number} quantity   - Number of units
 * @property {number} unit_price - Price per unit (before tax)
 * @property {number} tax_rate   - Tax rate as a decimal (e.g. 0.18 for 18%)
 */

/**
 * @typedef {Object} InvoiceSummary
 * @property {number} subtotal  - Total before tax
 * @property {number} total_tax - Total tax amount
 * @property {number} total     - Grand total (subtotal + total_tax)
 */

/**
 * Calculates the invoice total for a list of line items.
 *
 * @param {LineItem[]} items - Array of line items on the invoice
 * @returns {InvoiceSummary} Calculated subtotal, total tax, and grand total
 * @throws {TypeError} If items is not an array
 */
export function calculateInvoice(items) {
  if (!Array.isArray(items)) {
    throw new TypeError("items must be an array of LineItem objects");
  }

  let rawSubtotal = 0;
  let rawTax = 0;

  for (const item of items) {
    const lineTotal = item.quantity * item.unit_price;
    const lineTax = lineTotal * item.tax_rate;
    rawSubtotal += lineTotal;
    rawTax += lineTax;
  }

  const subtotal = round2(rawSubtotal);
  const total_tax = round2(rawTax);
  const total = round2(subtotal + total_tax);

  return { subtotal, total_tax, total };
}

/**
 * Rounds a number to 2 decimal places.
 *
 * @param {number} value
 * @returns {number}
 */
function round2(value) {
  return Math.round(value * 100) / 100;
}

// ---------------------------------------------------------------------------
// Quick demo (run with: node invoice_calculator.js)
// ---------------------------------------------------------------------------
const sampleItems = [
  { name: "Web Hosting (1yr)", quantity: 1,  unit_price: 120.00, tax_rate: 0.18 },
  { name: "SSL Certificate",   quantity: 1,  unit_price: 15.99,  tax_rate: 0.18 },
  { name: "Support Hours",     quantity: 10, unit_price: 50.00,  tax_rate: 0.00 },
];

const invoice = calculateInvoice(sampleItems);
console.log("Invoice Summary:");
console.log(`  Subtotal  : $${invoice.subtotal}`);
console.log(`  Tax       : $${invoice.total_tax}`);
console.log(`  Total     : $${invoice.total}`);
