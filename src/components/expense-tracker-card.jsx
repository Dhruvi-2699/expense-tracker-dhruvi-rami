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
    <div className="expense-tracker-container container border-1 border-black p-4 mx-auto my-8 bg-white w-1/3">
      <h1 className="text-2xl font-bold mx-auto text-center">
        {EXPENSE_TRACKER}
      </h1>
      <p className="text-center">{TRACKER_SUBTITLE}</p>

      <div className="my-4 flex justify-center space-x-6">
        <div className="px-6 py-3 bg-white rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-1">{CURRENT_BALANCE}</p>
          <p
            className={`text-xl font-semibold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {CURRENCY_SYMBOL}
            {balance.toFixed(2)}
          </p>
        </div>
        <div className="border-l border-gray-300"></div>
        <div className="px-6 py-3 bg-white rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-1">{TOTAL_EXPENSES}</p>
          <p className="text-xl font-semibold text-red-600">
            {CURRENCY_SYMBOL}
            {expense.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center my-4">
        <Button
          buttonText={ADD_AMOUNT}
          onClick={() => handleClick(ADD_AMOUNT)}
          className="bg-green-500 hover:bg-green-600 text-white"
        />
        <Button
          buttonText={ADD_EXPENSE}
          onClick={() => handleClick(ADD_EXPENSE)}
          className="bg-red-500 hover:bg-red-600 text-white"
        />
      </div>

      {transactions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">{TRANSACTION_HISTORY}</h2>
          {balance < 0 && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
              Warning: Your current balance is negative ({CURRENCY_SYMBOL}
              {balance.toFixed(2)})
            </div>
          )}
          <div className="space-y-2">
            {[...transactions].reverse().map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEditTransaction}
              />
            ))}
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
  );
};

export default ExpenseTrackerWrapperCard;
