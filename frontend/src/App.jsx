// npm install react-hot-toast

import { Toaster } from 'react-hot-toast';
import React from 'react'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import PageNoteFound from './components/PageNoteFound'

const App = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  return (
    <div  className='w-full h-screen '>
      <Routes>
        <Route path='/' element={token ? <Home/>: <Navigate to={"/login"} /> } />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='*' element={<PageNoteFound/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
