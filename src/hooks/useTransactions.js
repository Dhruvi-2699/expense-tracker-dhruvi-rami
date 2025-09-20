import { useState, useMemo } from "react";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const { balance, expense } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => ({
        balance: transaction.isCredited
          ? acc.balance + transaction.amount
          : acc.balance - transaction.amount,
        expense: transaction.isCredited
          ? acc.expense
          : acc.expense + transaction.amount,
      }),
      { balance: 0, expense: 0 }
    );
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...newTransaction,
        id: newTransaction.id || Date.now(),
        date: newTransaction.date || new Date().toISOString(),
      },
    ]);
  };

  const deleteTransaction = (transactionId) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  return {
    transactions,
    balance,
    expense,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
};
