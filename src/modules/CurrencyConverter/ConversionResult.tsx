import React from "react";

interface ResultDisplayProps {
  from: string | undefined;
  to: string | undefined;
  amount: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ from, to, amount }) => {
  const currencyFormat = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: to,
})
  return (
    <div>
      <h2 className="text-xl font-normal text-center mb-1">
      {`Converted from ${from} to ${to}: `}
      </h2>
      <p className="text-3xl text-center">
        <strong>{currencyFormat.format(amount)}</strong>
      </p>
    </div>
  );
};

export default ResultDisplay;
