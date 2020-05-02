import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Title = ({string}) => {
  const classes = useStyles();

  return (
    <Typography variant="h3" className={classes.title}>
    {string}
    </Typography>
  )
}

export default Title