import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useAuth } from './context/authContext';

import HomePage from './pages/Home'
import NavBar from './components/Navbar'
import LoginPage from './pages/LoginPage'

const Main = () => {
  const {
    isAuthenticated,
  } = useAuth()

  // dit hoort hier dan ook niet. Dit moet ook naar de context
  // const [sessionToken, setSessionToken] = useState(true)
    // [ ] - met elke nieuwe request die je uitvoert, check je of de token nog valide is.
    // [ ] - wanneer deze niet valide is redirect je naar login.
    // [ ] - voeg token toe als conditional in je router

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container>
        <Switch>
          {isAuthenticated && (
            <Redirect from="/login" to="/" exact />
          )}
          {!isAuthenticated && (
            <Redirect from="/" to="/login" exact />
          )}
          {!isAuthenticated && (
            <Route path="/login" component={LoginPage} />
          )}
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          {!isAuthenticated && <Redirect to="/login" exact />}
        </Switch>
      </Container>
    </React.Fragment>
  )
}

export default Main