import React from "react";

const Button = ({
  buttonText,
  onClick,
  className,
  type = "button",
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
