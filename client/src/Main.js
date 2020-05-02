import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { useAuth } from './context/authContext';

import HomePage from './pages/Home'
import LoginPage from './pages/LoginPage'

const Main = () => {
  const {
    token
  } = useAuth()

  const [sessionToken, setSessionToken] = useState(null)

  React.useEffect(() => {
    // hier komt een check sessie token. Je checkt of er een token in je localStorage aanwezig is.
    // als er geen token aanwezig is in localStorage, dan redirect je naar login
    // is deze er wel, check of de token nog valide is.
    // als de token niet valide is, redirect dan naar Login door geen token te zetten
    // als de token wel valide is, zet hem dan in je context.
    // met elke nieuwe request die je uitvoert, check je of de token nog valide is.
    // wanneer deze niet valide is redirect je naar login.
    setSessionToken(token)
  }, [token])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Switch>
          {sessionToken && (
            <Redirect from="/login" to="/" exact />
          )}
          {!sessionToken && (
            <Redirect from="/" to="/login" exact />
          )}
          {!sessionToken && (
            <Route path="/login" component={LoginPage} />
          )}
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          {!sessionToken && <Redirect to="/login" exact />}
        </Switch>
      </Container>
    </React.Fragment>
  )
}

export default Main