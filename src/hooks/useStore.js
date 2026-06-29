import { useState, useEffect } from "react";
import { Store } from "@/lib/store";

<<<<<<< HEAD
function useAsyncEntity(fetchFn, initialValue = []) {
  const [data, setData] = useState(initialValue);
  useEffect(() => {
    let active = true;
    fetchFn().then((result) => { if (active) setData(result || initialValue); }).catch(() => {});
    return () => { active = false; };
  }, []);
  return data;
}

export const useEditions = () => useAsyncEntity(Store.getEditions);
export const useMessages = () => useAsyncEntity(Store.getMessages);
export const useTeam = () => useAsyncEntity(Store.getTeam);
export const useActivity = () => useAsyncEntity(Store.getActivity);

export function useSettings() {
  const [settings, setSettings] = useState({
    logo_url: Store.LOGO_URL,
    book_cover_mode: "auto",
    book_cover_url: "",
    book_covers: ["", "", "", ""],
    site_title: "Profit Pursuit",
    site_subtitle: "Est. 2023",
  });
  useEffect(() => {
    let active = true;
    Store.getSettings().then((result) => { if (active) setSettings(result); }).catch(() => {});
    return () => { active = false; };
  }, []);
  return settings;
}
=======
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
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
