import React from "react";

const FormInput = ({
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  step,
  error,
}) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
