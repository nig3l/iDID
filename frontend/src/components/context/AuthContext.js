import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSession({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
