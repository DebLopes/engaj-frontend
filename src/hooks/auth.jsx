import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Engaj:token');
    const user = localStorage.getItem('@Engaj:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = async ({ email, password }) => {
     const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Engaj:token', token);
    localStorage.setItem('@Engaj:user', JSON.stringify(user));

    setData({ token, user });
  };

  const signOut = useCallback(() => {
    localStorage.removeItem('@Engaj:token');
    localStorage.removeItem('@Engaj:user');

    setData({});
  }, []);

  const updateUser = useCallback(
    (user) => {
      localStorage.setItem('@Engaj:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };