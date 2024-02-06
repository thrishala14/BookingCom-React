import  { useContext } from 'react'
import LoginContext from '../components/LoginContext'

const useAuth = () => {
  return useContext(LoginContext)
}

export default useAuth