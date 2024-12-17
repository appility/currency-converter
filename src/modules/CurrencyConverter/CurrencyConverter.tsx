import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FiRefreshCcw } from "react-icons/fi";
import { Button } from "@/components/ui/button"
import CurrencySelect from "@/components/shared/CurrencySelect/CurrencySelect";
import CurrencyInput from "@/components/shared/CurrencyInput/CurrencyInput";
import ErrorComponent from "@/components/shared/Error/Error";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useConversion } from "@/hooks/useConversion";
import ResultDisplay from "./ConversionResult";
import { Currency } from "@/types/Currency";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const queryClient = useQueryClient();

  const { 
    data: currencies, 
    isLoading: isLoadingCurrencies, 
    error: currenciesError
  } = useCurrencies();
  
  const { 
    data: conversionResult, 
    isLoading: isLoadingConversion, 
    error: conversionError, 
    refetch } = useConversion(fromCurrency, toCurrency, amount);

  const handleConvert = async () => {
    if(!fromCurrency || !toCurrency || !amount) return
    refetch()
  };

  const handleToCurrencyChange = (toCurrency: string) => {
    setToCurrency(toCurrency);
  }

  const handleFromCurrencyChange = (fromCurrency: string) => {
    setFromCurrency(fromCurrency);
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ["conversion", fromCurrency, toCurrency, amount] });
  }, [fromCurrency, toCurrency, amount, queryClient]);

  const isLoading = isLoadingCurrencies || isLoadingConversion

  const error = currenciesError || conversionError

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">Currency Converter</h1>
      <div className="flex items-center space-x-4 mb-4">
        <CurrencySelect
          id="from"
          currencies={currencies as Currency[]}
          selectedCurrency={fromCurrency}
          onCurrencyChange={handleFromCurrencyChange}
        />
        {/* Swap Button */}
        <Button
          data-testid={`currency-swap`}
          onClick={swapCurrencies}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <FiRefreshCcw className="text-xl" />
        </Button>
        <CurrencySelect
          id="to"
          currencies={currencies as Currency[]}
          selectedCurrency={toCurrency}
          onCurrencyChange={handleToCurrencyChange}
        />
      </div>

      {/* Amount Input */}
      <CurrencyInput amount={amount} onAmountChange={setAmount} />

      {/* Convert Button */}
      <button
        disabled={isLoading}
        onClick={handleConvert}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
       { isLoading ? "Loading..." : "Convert"}
      </button>

      { error && (
        <div className="py-3">
          <ErrorComponent heading="Oh dear!" text="Service is not available right now."/>
        </div>
      )}
      
      {(conversionResult && conversionResult?.value !== null) && (
        <div className="mt-8">
          <ResultDisplay 
            from={fromCurrency} 
            to={toCurrency} 
            amount={conversionResult.value} 
          />
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
