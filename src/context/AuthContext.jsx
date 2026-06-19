import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'loveclarinha:isLoggedIn';
const VALID_USER = 'Clarinha';
const VALID_PASSWORD = 'Coxinha_67';

function normalizeUsername(value) {
  return value.trim().normalize('NFKC').toLowerCase();
}

function normalizePassword(value) {
  return value.trim().normalize('NFKC').toLowerCase();
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );

  function login(username, password) {
    const isValid =
      normalizeUsername(username) === normalizeUsername(VALID_USER) &&
      normalizePassword(password) === normalizePassword(VALID_PASSWORD);

    if (isValid) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsLoggedIn(true);
    }

    return isValid;
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
  }

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
