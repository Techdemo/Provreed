import React, { useContext, createContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false)

  return <ModalContext.Provider value={{
    modalOpen,
    setModalOpen
  }}>
    {children}
  </ModalContext.Provider>
}

export const useModal = () => useContext(ModalContext)