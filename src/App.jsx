import React from 'react'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'
import Account from './pages/Account'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthContextProvider>
      
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        
        {/* {<Route path='/home' element={<Home/>} />} */}
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
      {/* <AuthContextProvider>
      </AuthContextProvider> */}
    </AuthContextProvider>
  )
}

export default App