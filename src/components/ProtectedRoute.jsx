import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const {user} = UserAuth();
    if (!user){
        return navigate('/')
    }
    
  return children 
}

export default ProtectedRoute