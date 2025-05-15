import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route,Navigate} from 'react-router'
import User from './pages/user/user.jsx'
import Home from './pages/home/home.jsx'
import Course from './pages/home/course/course.jsx'
import Plan from './pages/home/plan/plan.jsx'
import axios from 'axios'
import { PlanProvider } from './context/PlanContext.jsx'

function App() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <PlanProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/home" element={<Home/>} >
          <Route index element={<Navigate to="course" replace />} />
          <Route path="course" element={<Course />} />
          <Route path="plan" element={<Plan />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </PlanProvider>
  )
}

export default App
