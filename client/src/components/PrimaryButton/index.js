import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const PrimaryButton = ({text}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        {text}
      </Button>
    </div>
  )
}

export default PrimaryButton