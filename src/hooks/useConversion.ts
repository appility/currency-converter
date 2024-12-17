import { useQuery } from "@tanstack/react-query";
import { fetchConvertedValue } from "@/services/api";

export const useConversion = (from: string, to: string, amount: number) => {
  return useQuery({
    queryKey: ["conversion", from, to, amount],
    queryFn: () => fetchConvertedValue(from, to, amount), 
    enabled: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
