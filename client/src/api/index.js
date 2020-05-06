import axios from 'axios'

export const addProposal = (data, token) => {
  axios.post('http://localhost:5000/api/v1/proposal/new', data, {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token
    }
  })
  .then(res => {
    console.log("res in de post", res)
    return true
  })
  .catch(err => {
    console.log("error in de post", err.message)
    return false
  })
}

