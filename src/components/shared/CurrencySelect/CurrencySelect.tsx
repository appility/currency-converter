import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Currency } from "@/types/Currency";

interface CurrencySelectProps {
  id: string
  currencies: Currency[];
  selectedCurrency?: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  id,
  currencies,
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <Select
    data-testid={`currency-select-${id}`}
    value={selectedCurrency}
    onValueChange={(value) => onCurrencyChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a currency" />
      </SelectTrigger>
      <SelectContent>
        {(currencies && currencies.length) && currencies.map(({ code, short_code, symbol, name }) => (
          <SelectItem key={code} value={short_code} data-testid={`currency-option-${short_code}`}>
            <span>{`${symbol} - `}</span>
            <span>{`${name}`}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
