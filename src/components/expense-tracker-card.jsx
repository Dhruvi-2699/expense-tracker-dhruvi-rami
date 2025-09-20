import React, { useState } from "react";
import Button from "./button";
import Popup from "./popup";
import BalanceCard from "./BalanceCard";
import TransactionList from "./TransactionList";
import { useTransactions } from "../hooks/useTransactions";
import {
  ADD_AMOUNT,
  ADD_EXPENSE,
  EXPENSE_TRACKER,
  TRACKER_SUBTITLE,
  CURRENT_BALANCE,
  TOTAL_EXPENSES,
} from "../constants";

const ExpenseTrackerWrapperCard = () => {
  const [open, setOpen] = useState(false);
  const [popupBtnText, setPopupBtnText] = useState("");
  const [isCredited, setIsCredited] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const {
    transactions,
    balance,
    expense,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

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
      deleteTransaction(editingTransaction.id);
      setOpen(false);
      setEditingTransaction(null);
    }
  };

  const handleAddTransaction = ({ amount, description }) => {
    const transactionData = {
      amount,
      description,
      isCredited,
      ...(editingTransaction && {
        id: editingTransaction.id,
        date: editingTransaction.date,
      }),
    };

    if (editingTransaction) {
      updateTransaction(transactionData);
    } else {
      addTransaction(transactionData);
    }

    setOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="expense-tracker-container mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mx-auto text-center">
          {EXPENSE_TRACKER}
        </h1>
        <p className="text-center">{TRACKER_SUBTITLE}</p>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BalanceCard label={CURRENT_BALANCE} amount={balance} />
          <BalanceCard label={TOTAL_EXPENSES} amount={expense} isExpense />
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
          <TransactionList
            transactions={transactions}
            balance={balance}
            onEdit={handleEditTransaction}
          />
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
