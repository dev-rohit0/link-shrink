// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { UserAuth } from '../context/AuthContext'
// const ProtectedRoute = ({children}) => {
//     const navigate = useNavigate()
//     const {user} = UserAuth();
//     if (!user){
//         navigate('/login')
//         return null
//     }
    
//   return children 
// }

// export default ProtectedRoute

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = UserAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  if (!user) {
    return null
  }

  return children
}

export default ProtectedRoute
