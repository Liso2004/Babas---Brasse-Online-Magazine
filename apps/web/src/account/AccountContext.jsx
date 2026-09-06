import { createContext, useContext, useEffect, useState } from "react";

const ACCOUNT_STORAGE_KEY = "urban-anarchy-account";
const AccountContext = createContext(null);

function readStoredAccount() {
  try {
    const stored = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(readStoredAccount);

  useEffect(() => {
    if (account) window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
    else window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
  }, [account]);

  function createProfile(profile) {
    setAccount({ name: profile.name.trim(), email: profile.email.trim().toLowerCase() });
  }

  function signOut() {
    setAccount(null);
  }

  return <AccountContext.Provider value={{ account, isLoggedIn: Boolean(account), createProfile, signOut }}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const value = useContext(AccountContext);
  if (!value) throw new Error("useAccount must be used inside AccountProvider");
  return value;
}
