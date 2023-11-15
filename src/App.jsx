import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserExams from './components/userExams/userExams'
import Index from './pages/Index'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'

import './reset.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path='/Login' element={<LoginPage />}/>
        <Route path='/Cadastro' element={<CadastroPage/>}/>
        <Route path='/Exame' element={<Index />}/>
      </Routes>
    </Router>
  )
}

export default App