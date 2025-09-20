import React from "react";

const Button = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-black border p-2 w-full mx-auto my-2"
    >
      {buttonText}
    </button>
  );
};

export default Button;
