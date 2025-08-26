import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { GameSystemProvider } from './components/GameSystem'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'
import Logo from './components/Logo'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UltimateDiscover from './UltimateDiscover'
import SimpleChat from './SimpleChat'
import BasicMatches from './BasicMatches'
import MusicWorld from './pages/MusicWorld'
import LocationDiscover from './pages/LocationDiscover'
import GameStats from './pages/GameStats'
import AIInsightsPage from './pages/AIInsightsPage'
import PremiumMembership from './pages/PremiumMembership'
import Wallet from './pages/Wallet'

// Basit Profile component
function SimpleProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            👤 Profil Sayfası
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İsim</label>
                <input 
                  type="text" 
                  placeholder="Adınız"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yaş</label>
                <input 
                  type="number" 
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                <input 
                  type="text" 
                  placeholder="İstanbul"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea 
                  rows="4"
                  placeholder="Kendinizi tanıtın..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                💾 Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Basit Admin component
function SimpleAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          🎛️ Admin Paneli
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-blue-600">12,847</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Eşleşme</p>
                <p className="text-3xl font-bold text-red-600">8,934</p>
              </div>
              <div className="text-3xl">❤️</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Günlük Mesaj</p>
                <p className="text-3xl font-bold text-green-600">45,672</p>
              </div>
              <div className="text-3xl">💬</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Premium Üye</p>
                <p className="text-3xl font-bold text-purple-600">1,567</p>
              </div>
              <div className="text-3xl">👑</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Sistem Durumu</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Server Durumu</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Çalışıyor</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database Bağlantısı</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Aktif</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Çevrimiçi Kullanıcı</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">567 kişi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// App Content Component
const AppContent = () => {
  const { colors } = useTheme()
  
  return (
    <GameSystemProvider>
      <Router>
        <div className={`min-h-screen bg-gradient-to-br ${colors.surface}`}>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/discover" element={<UltimateDiscover />} />
              <Route path="/matches" element={<BasicMatches />} />
              <Route path="/chat" element={<SimpleChat />} />
              <Route path="/admin" element={<SimpleAdmin />} />
              <Route path="/music" element={<MusicWorld />} />
              <Route path="/location" element={<LocationDiscover />} />
              <Route path="/game-stats" element={<GameStats />} />
              <Route path="/ai-insights" element={<AIInsightsPage />} />
              <Route path="/premium" element={<PremiumMembership />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameSystemProvider>
  )
}

// Ana App
function FixedApp() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default FixedApp
