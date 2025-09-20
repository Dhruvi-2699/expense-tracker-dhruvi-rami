import React, { useState, useEffect } from "react";
import Button from "./button";
import FormInput from "./FormInput";
import { DELETE, AMOUNT, DESCRIPTION, ADD_AMOUNT } from "../constants";

const Popup = ({
  popupBtnText,
  onSubmit,
  onClose,
  initialValues,
  onDelete,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

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
      return;
    }
    onSubmit({ amount: Number(amount), description });
  };

  return (
    <div className="popup-container fixed inset-0 bg-transparent flex items-center justify-center">
      <div className="popup-content bg-white p-8 rounded-xl shadow-2xl w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-base font-medium text-gray-700"
            >
              {AMOUNT}
            </label>
            <FormInput
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700"
            >
              {DESCRIPTION}
            </label>
            <FormInput
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="space-y-3 pt-4">
            <Button
              buttonText={popupBtnText}
              type="submit"
              className={`w-full text-white ${
                popupBtnText === ADD_AMOUNT
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
                className="w-full bg-gray-500 hover:bg-gray-600 text-white"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
