// Button text constants
export const ADD_AMOUNT = "Add Amount";
export const ADD_EXPENSE = "Add Expense";
export const DELETE = "Delete";

// Currency
export const CURRENCY_SYMBOL = "₹";

// UI Text
export const EXPENSE_TRACKER = "Expense Tracker";
export const TRACKER_SUBTITLE = "Track your expenses and income";
export const TRANSACTION_HISTORY = "Transaction History";
export const CURRENT_BALANCE = "Current Balance";
export const TOTAL_EXPENSES = "Total Expenses";

// Form labels
export const AMOUNT = "Amount";
export const DESCRIPTION = "Description";

// Error messages
export const INSUFFICIENT_BALANCE = (balance) =>
  `Insufficient balance. Current balance: ${CURRENCY_SYMBOL}${balance.toFixed(
    2
  )}`;
export const INVALID_AMOUNT = "Amount must be greater than 0";

// Transaction symbols
export const UP_ARROW = "▲";
export const DOWN_ARROW = "▼";
