import React from 'react'
import Modal from 'react-modal'
import Container from '@material-ui/core/Container';
import Title from '../components/Title'
import ModalButton from '../components/ModalButton'

import { makeStyles } from '@material-ui/core/styles';

import { useModal } from '../context/modalContext'
import { useAuth } from '../context/authContext';
import { useForm } from "react-hook-form";

import { addProposal } from '../api/index'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '75%',
    width: '75%',
  }
};

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

Modal.setAppElement('#root')

const ProposalModal = () => {
  const { register, handleSubmit, errors } = useForm();
  // const [loading, setLoading] = React.useState(false)
  const classes = useStyles();
  const {
    modalOpen,
    setModalOpen
  } = useModal()

  const {
    tokenConfig,
    token
  } = useAuth()

  const onSubmit = async data => {
    // setLoading(true)
    let post = await addProposal(data, token)
    if(post) {
      console.log('post request is gelukt')
      setModalOpen(!modalOpen)
    } else {
      console.log('kut, het is mislukt')
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Title string="New proposal"/>
      <Container maxwidth="sm">
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="prospectName">prospectName</label>
          <input name="prospectName" ref={register({ required: true })} />
          {errors.prospectName && <span>prospectName is required</span>}
          <label htmlFor="prospectChallenge">prospectChallenge</label>
          <input name="prospectChallenge" ref={register({ required: true })} />
          {errors.prospectChallenge && <span>prospectChallenge is required</span>}
          <label htmlFor="prospectServices">prospectServices</label>
          <input name="prospectServices" ref={register({ required: true })} />
          {errors.prospectServices && <span>prospectServices is required</span>}
          <input type="submit" />
        </form>
      </Container>
      <ModalButton text="Close Modal" />
    </Modal>
  )
}

export default ProposalModal