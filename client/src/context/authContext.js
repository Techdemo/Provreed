import React, { useContext, createContext, useState } from 'react';
import axios from 'axios'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isAuthenticated, setAuth] = useState(true)

  const login = ({password, username}) => {
    // request body
    const body = JSON.stringify({ password, username })

    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios
      .post('http://localhost:5000/api/v1/auth', body, config)
        .then(function (response) {
          setToken(response.data.token)
          setUserId(response.data.user.id)
          setAuth(!isAuthenticated)
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
  }

  const loadUser = () => {
    axios
      .get('http://localhost:5000/api/v1/auth/user', tokenConfig())
      .then(res => {
        console.log("in de context", res.data)
        return res.data
      })
      .catch(error => {
        console.log(error.response.data);
      })
  }

 // Setup config/headers and token
  const tokenConfig = () => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    if (token) {
      config.headers['x-auth-token'] = token
    }

    return config
  }



  return <AuthContext.Provider value={{
    token,
    setToken,
    login,
    isAuthenticated,
    loadUser
  }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)