import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Discover from './pages/Discover'
import Matches from './pages/Matches'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

