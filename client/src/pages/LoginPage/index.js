import React from 'react';
import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';

import Title from '../../components/Title/index'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <Title string="Login pagina" />
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <input name="username" ref={register({ required: true })} />
        <input name="password" ref={register({ required: true })} />
        <input type="submit" />
      </form>
    </>
  )
}

export default LoginPage
