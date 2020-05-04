import React from 'react'
import Modal from 'react-modal'

import Title from '../components/Title'
import ModalButton from '../components/ModalButton'

import { useModal } from '../context/modalContext'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const ProposalModal = () => {
  const {
    modalOpen,
  } = useModal()

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Title string="New proposal"/>
      <ModalButton text="Close Modal" />
    </Modal>
  )
}

export default ProposalModal