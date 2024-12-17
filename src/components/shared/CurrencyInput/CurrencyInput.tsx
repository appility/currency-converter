import React from "react";

interface CurrencyInputProps {
  amount: number | undefined;
  onAmountChange: (amount: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ amount, onAmountChange }) => {
  return (
    <input
      type="number"
      className="p-3 border rounded-lg w-full mb-4"
      value={amount === 0 ? "" : amount}
      onChange={(e) => onAmountChange(parseFloat(e.target.value))}
      placeholder="Enter amount"
    />
  );
};

export default CurrencyInput;
