import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "@/services/api";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 7 * 24 * 60 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
