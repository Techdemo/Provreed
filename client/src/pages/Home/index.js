import React from 'react';
import Title from '../../components/Title/index'
import ProposalModal from '../../modules/modal'

import NavBar from '../../components/Navbar'

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Title string="dit is provreed" />
      <ProposalModal />
    </>
  )
}

export default HomePage
