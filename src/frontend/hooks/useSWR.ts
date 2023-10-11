"use client";
import useActualSWR, { SWRConfiguration } from "swr";
import { useEffect, useRef } from "react";

export const useSWR = <Data = any, Error = any>(url: string, fetcher: () => Promise<Data>, options?: SWRConfiguration<Data, Error>) => {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    isFirstLoad.current = false;
  }, []);

  const { data, error, isLoading, isValidating } = useActualSWR(url, () => fetcher(), {
    ...options,
    fallbackData: isFirstLoad.current ? options?.fallbackData : undefined,
    refreshInterval: 0,
    dedupingInterval: 60 * 1000 * 30,
  });

  return { data, error, isLoading, isValidating };
};

export type SwrOptions<T> = {
  fallbackData: T;
  keepPreviousData?: boolean;
};
