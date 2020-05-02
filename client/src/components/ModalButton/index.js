import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useModal } from '../../context/modalContext';

const ModalButton = ({ text }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

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