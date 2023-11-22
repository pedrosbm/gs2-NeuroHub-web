import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import UserExams from './components/userExams/userExams'
import Index from './pages/Index'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import ContaPage from './pages/ContaPage'
import ChatPage from './pages/ChatPage'

import './reset.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path='/Login' element={<LoginPage />}/>
        <Route path='/Cadastro' element={<CadastroPage/>}/>
        <Route path='/Conta' element={<ContaPage/>}/>
        <Route path='/Chat' element={<ChatPage/>}/>
      </Routes>
    </Router>
  )
}

export default App