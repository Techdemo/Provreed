import React from 'react'
import Button from '@material-ui/core/Button';

import { useModal } from '../../context/modalContext';

const ModalButton = ({ text }) => {
  const {
    modalOpen,
    setModalOpen
  } = useModal()

  return (
    <Button onClick={() => setModalOpen(!modalOpen)} variant="outlined" color="primary">
      {text}
    </Button>
  )
}

export default ModalButton