import { useState, useCallback } from "react";
import { Store } from "@/lib/store";

export function useAdmin() {
  const [isAuthed, setIsAuthed] = useState(() => Store.isAuthed());

  const login = useCallback((password) => {
    const result = Store.login(password);
    if (result.success) setIsAuthed(true);
    return result;
  }, []);

  const logout = useCallback(() => {
    Store.logout();
    setIsAuthed(false);
  }, []);

  return { isAuthed, login, logout };
}