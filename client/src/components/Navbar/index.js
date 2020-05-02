import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useModal } from '../../context/modalContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const {
    modalOpen,
    setModalOpen
  } = useModal()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
        Provreed
        </Typography>
        <Button onClick={() => setModalOpen(!modalOpen)} color="inherit">Nieuwe offerte</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar