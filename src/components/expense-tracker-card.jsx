import React, { useState } from "react";
import Button from "./button";
import Popup from "./popup";
import TransactionItem from "./TransactionItem";

const ExpenseTrackerWrapperCard = () => {
  const [open, setOpen] = useState(false);
  const [popupBtnText, setPopupBtnText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isCredited, setIsCredited] = useState(false);

  const handleClick = (buttonText) => {
    setOpen(true);
    setPopupBtnText(buttonText);
    setIsCredited(buttonText === "Add Amount");
  };

  const handleAddTransaction = ({ amount, description }) => {
    const newTransaction = {
      id: Date.now(),
      amount,
      description,
      isCredited,
      date: new Date().toISOString(),
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
    setOpen(false);
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
        Expense Tracker
      </h1>
      <p className="text-center">Track your expenses and income</p>

      <div className="my-4 flex justify-center space-x-6">
        <div className="px-6 py-3 bg-white rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-1">Current Balance</p>
          <p className="text-xl font-semibold text-green-600">
            ₹{balance.toFixed(2)}
          </p>
        </div>
        <div className="border-l border-gray-300"></div>
        <div className="px-6 py-3 bg-white rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
          <p className="text-xl font-semibold text-red-600">
            ₹{expense.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center my-4">
        <Button
          buttonText="Add Amount"
          onClick={() => handleClick("Add Amount")}
          className="bg-green-500 hover:bg-green-600"
        />
        <Button
          buttonText="Add Expense"
          onClick={() => handleClick("Add Expense")}
          className="bg-red-500 hover:bg-red-600"
        />
      </div>

      {transactions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Transaction History</h2>
          <div className="space-y-2">
            {[...transactions].reverse().map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      )}

      {open && (
        <Popup
          popupBtnText={popupBtnText}
          onClose={() => setOpen(false)}
          onSubmit={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default ExpenseTrackerWrapperCard;
