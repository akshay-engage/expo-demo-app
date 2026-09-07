import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type UserContextValue = {
  /** The logged-in user's name, or null when browsing as a guest / logged out. */
  name: string | null;
  /** True once the user has either logged in or chosen to skip login. */
  isReady: boolean;
  /** Log in with a display name. */
  login: (name: string) => void;
  /** Continue without a name (guest). */
  skip: () => void;
  /** Clear the session and return to guest/logged-out state. */
  logout: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const [name, setName] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((value: string) => {
    setName(value.trim());
    setIsReady(true);
  }, []);

  const skip = useCallback(() => {
    setName(null);
    setIsReady(true);
  }, []);

  const logout = useCallback(() => {
    setName(null);
    setIsReady(false);
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({ name, isReady, login, skip, logout }),
    [name, isReady, login, skip, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error('useUser must be used within a <UserProvider />');
  }
  return value;
}
