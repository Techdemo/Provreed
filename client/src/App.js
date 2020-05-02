import React from 'react';
import Main from './Main';
import { ModalProvider } from '../src/context/modalContext';
import { AuthProvider } from '../src/context/authContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ModalProvider>
          <Main />
        </ModalProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
