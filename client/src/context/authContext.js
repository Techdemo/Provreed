import React, { useContext, createContext, useState } from 'react';
import axios from 'axios'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  const login = ({password, username}) => {
    console.log(password, username)
    // request body
    const body = JSON.stringify({ password, username })

    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post('http://localhost:5000/api/v1/auth', body, config)
      .then(function (response) {
        console.log(response);
        console.log(response.data)
        // hier even netjes maken natuurlijk. Token true is nie best
        setToken(true)
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  return <AuthContext.Provider value={{
    token,
    setToken,
    login
  }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)