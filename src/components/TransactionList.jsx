import React from "react";
import TransactionItem from "./TransactionItem";
import { TRANSACTION_HISTORY, CURRENCY_SYMBOL } from "../constants";

const TransactionList = ({ transactions, balance, onEdit }) => {
  return (
    <div className="mt-8 h-[400px]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">{TRANSACTION_HISTORY}</h2>
        {balance < 0 && (
          <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
            Warning: Your current balance is negative ({CURRENCY_SYMBOL}
            {balance.toFixed(2)})
          </div>
        )}
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border border-gray-100">
        <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {transactions.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No transactions yet
            </div>
          ) : (
            [...transactions]
              .reverse()
              .map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={onEdit}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
