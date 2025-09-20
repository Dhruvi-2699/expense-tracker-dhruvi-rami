import React, { useState } from "react";
import Button from "./button";

const Popup = ({ popupBtnText, onSubmit, onClose }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    setError("");
    onSubmit({ amount: Number(amount), description });
    setAmount("");
    setDescription("");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  return (
    <div className="popup-container fixed inset-0 bg-transparent flex items-center justify-center">
      <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Amount"
              required
              min="0"
              step="0.01"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Description"
              rows="3"
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button
              buttonText={popupBtnText}
              type="submit"
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
