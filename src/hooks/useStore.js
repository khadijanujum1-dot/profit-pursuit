import { useState, useEffect } from "react";
import { Store } from "@/lib/store";

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
