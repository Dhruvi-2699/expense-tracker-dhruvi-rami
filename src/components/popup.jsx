import React, { useState, useEffect } from "react";
import Button from "./button";
import FormInput from "./FormInput";
import { DELETE, AMOUNT, DESCRIPTION, INVALID_AMOUNT } from "../constants";

const Popup = ({
  popupBtnText,
  onSubmit,
  onClose,
  initialValues,
  onDelete,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Set initial values when editing
  useEffect(() => {
    if (initialValues) {
      setAmount(initialValues.amount.toString());
      setDescription(initialValues.description);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      setError(INVALID_AMOUNT);
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
          <FormInput
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder={AMOUNT}
            required
            min="0"
            step="0.01"
            error={error}
          />

          <FormInput
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={DESCRIPTION}
            required
          />

          <div className="space-y-3">
            <Button
              buttonText={popupBtnText}
              type="submit"
              className={`w-full ${
                initialValues?.isCredited
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            />
            {onDelete && (
              <Button
                buttonText={DELETE}
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="w-full bg-gray-500 hover:bg-gray-600"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
