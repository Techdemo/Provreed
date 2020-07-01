import React, { useEffect, useState } from 'react';
import Title from '../../components/Title/index'
import ProposalModal from '../../modules/modal'

import { useAuth } from '../../context/authContext'
import axios from 'axios';

const HomePage = () => {
  const {
    token
  } = useAuth()

  const [proposals, setProposals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/api/v1/proposals', {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': token
        }
      })
      setProposals(result.data.data.proposals)
    }

    fetchData()
  }, [])

  console.log(proposals)
  return (
    <>
      <Title string="dit is provreed" />
        {proposals.map(item => (
        <li key={item._id}>
          <>
            <p>Prospectname: {item.prospectName}</p>
            <p>Challenge: {item.prospectChallenge}</p>
            <p>Services: {item.prospectServices}</p>
            <p>Status: {item.proposalStatus}</p>
            <p>Created at: {item.proposalCreated}</p>
          </>
        </li>
        ))}
      <ProposalModal />
    </>
  )
}

export default HomePage
