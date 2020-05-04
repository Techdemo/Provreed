import React from 'react';
import Title from '../../components/Title/index';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    console.log('data submitted', data)
  }

  return (
    <>
      <Title string="Login pagina" />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <input name="username" ref={register({ required: true })} />
        <input name="password" ref={register({ required: true })} />
        {errors.username && <span>username is required</span>}
        {errors.password && <span>password is required</span>}
        <input type="submit" />
      </form>
    </>
  )
}

export default LoginPage
