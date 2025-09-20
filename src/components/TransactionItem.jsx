import React from "react";

const TransactionItem = ({ transaction }) => {
  return (
    <div
      className={`p-3 rounded-lg ${
        transaction.isCredited ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className={`text-lg ${
              transaction.isCredited ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.isCredited ? "▲" : "▼"}
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
          ₹{transaction.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
