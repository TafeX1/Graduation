import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import PasswordChanged from './Pages/PasswordChanged'
import Register from './Pages/Register'
import AccountActivated from './Pages/AccountActivated'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-changed" element={<PasswordChanged />} />
        <Route path="/account-activated" element={<AccountActivated />} />
      </Routes>
    </BrowserRouter>
  )
}
