import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

// interface AuthState {
//   token: string;
//   user: object;
// }

// interface SignInCredentials {
//   email: string;
//   password: string;
// }

// interface AuthContextData {
//   user: object;
//   signIn(credentials: SignInCredentials): Promise<void>;
//   signOut(): void;
// }

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
    console.log('signIn')

    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log(response.data)
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

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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