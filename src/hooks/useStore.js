import { useState, useEffect } from "react";
import { Store } from "@/lib/store";

function useStoreData(getter) {
  const [data, setData] = useState(() => getter());
  useEffect(() => {
    const unsub = Store.subscribe(() => setData(getter()));
    return unsub;
  }, [getter]);
  return data;
}

export const useEditions = () => useStoreData(Store.getEditions);
export const useMessages = () => useStoreData(Store.getMessages);
export const useTeam = () => useStoreData(Store.getTeam);
export const useSettings = () => useStoreData(Store.getSettings);
export const useActivity = () => useStoreData(Store.getActivity);