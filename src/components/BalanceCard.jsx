import React from "react";
import { CURRENCY_SYMBOL } from "../constants";

const BalanceCard = ({ label, amount, isExpense }) => {
  return (
    <div className="px-6 py-4 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p
        className={`text-xl font-semibold ${
          isExpense
            ? "text-red-600"
            : amount >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {CURRENCY_SYMBOL}
        {amount.toFixed(2)}
      </p>
    </div>
  );
};

export default BalanceCard;
