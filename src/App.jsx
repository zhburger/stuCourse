import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router'
import User from './pages/user/user.jsx'
import Home from './pages/home/home.jsx'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
