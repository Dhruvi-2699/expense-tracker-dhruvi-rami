import React from "react";
import { CURRENCY_SYMBOL, UP_ARROW, DOWN_ARROW } from "../constants";

const TransactionItem = ({ transaction, onEdit }) => {
  return (
    <div
      className={`p-3 rounded-lg ${
        transaction.isCredited ? "bg-green-100" : "bg-red-100"
      } cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={() => onEdit(transaction)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className={`text-lg ${
              transaction.isCredited ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.isCredited ? UP_ARROW : DOWN_ARROW}
          </span>
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-600">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p
          className={`font-semibold ${
            transaction.isCredited ? "text-green-600" : "text-red-600"
          }`}
        >
          {CURRENCY_SYMBOL}
          {transaction.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
