import React, { useState } from "react";
import Button from "./button";
import Popup from "./popup";
import TransactionItem from "./TransactionItem";
import {
  ADD_AMOUNT,
  ADD_EXPENSE,
  CURRENCY_SYMBOL,
  EXPENSE_TRACKER,
  TRACKER_SUBTITLE,
  TRANSACTION_HISTORY,
  CURRENT_BALANCE,
  TOTAL_EXPENSES,
} from "../constants";

const ExpenseTrackerWrapperCard = () => {
  const [open, setOpen] = useState(false);
  const [popupBtnText, setPopupBtnText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isCredited, setIsCredited] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleClick = (buttonText) => {
    setOpen(true);
    setPopupBtnText(buttonText);
    setIsCredited(buttonText === ADD_AMOUNT);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setOpen(true);
    setPopupBtnText(transaction.isCredited ? ADD_AMOUNT : ADD_EXPENSE);
    setIsCredited(transaction.isCredited);
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = () => {
    if (editingTransaction) {
      setTransactions(
        transactions.filter((t) => t.id !== editingTransaction.id)
      );
      setOpen(false);
      setEditingTransaction(null);
    }
  };

  const handleAddTransaction = ({ amount, description }) => {
    // If editing, remove the old transaction first
    if (editingTransaction) {
      setTransactions(
        transactions.filter((t) => t.id !== editingTransaction.id)
      );
    }

    const newTransaction = {
      id: editingTransaction?.id || Date.now(),
      amount,
      description,
      isCredited,
      date: editingTransaction?.date || new Date().toISOString(),
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
    setOpen(false);
    setEditingTransaction(null);
  };

  // Calculate total balance
  const balance = transactions.reduce((acc, transaction) => {
    return transaction.isCredited
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const expense = transactions.reduce((acc, transaction) => {
    return transaction.isCredited ? acc : acc + transaction.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="expense-tracker-container mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mx-auto text-center">
          {EXPENSE_TRACKER}
        </h1>
        <p className="text-center">{TRACKER_SUBTITLE}</p>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="px-6 py-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">{CURRENT_BALANCE}</p>
            <p
              className={`text-xl font-semibold ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {CURRENCY_SYMBOL}
              {balance.toFixed(2)}
            </p>
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">{TOTAL_EXPENSES}</p>
            <p className="text-xl font-semibold text-red-600">
              {CURRENCY_SYMBOL}
              {expense.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center my-6">
          <Button
            buttonText={ADD_AMOUNT}
            onClick={() => handleClick(ADD_AMOUNT)}
            className="bg-green-500 hover:bg-green-600 text-white flex-1"
          />
          <Button
            buttonText={ADD_EXPENSE}
            onClick={() => handleClick(ADD_EXPENSE)}
            className="bg-red-500 hover:bg-red-600 text-white flex-1"
          />
        </div>

        {transactions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">
              {TRANSACTION_HISTORY}
            </h2>
            {balance < 0 && (
              <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                Warning: Your current balance is negative ({CURRENCY_SYMBOL}
                {balance.toFixed(2)})
              </div>
            )}
            <div className="overflow-hidden">
              <div className="h-[250px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {[...transactions].reverse().map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={handleEditTransaction}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {open && (
          <Popup
            popupBtnText={popupBtnText}
            onClose={() => {
              setOpen(false);
              setEditingTransaction(null);
            }}
            onSubmit={handleAddTransaction}
            onDelete={editingTransaction ? handleDeleteTransaction : undefined}
            initialValues={editingTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseTrackerWrapperCard;
