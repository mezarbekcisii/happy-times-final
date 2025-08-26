import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Basit Home component
function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FEF3C7, #FED7AA, #FECACA)',
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #F59E0B, #EF4444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          🎉 HappyTime
        </h1>
        
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#7C2D12', marginBottom: '40px' }}>
          Mutlu anların sosyal platformu
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <FeatureCard 
            icon="👤"
            title="Profil Yönetimi"
            description="Detaylı profil oluşturma ve fotoğraf yükleme"
          />
          <FeatureCard 
            icon="💫"
            title="Akıllı Eşleşme"
            description="Tinder-style swipe sistemi ile eşleşme"
          />
          <FeatureCard 
            icon="💬"
            title="Canlı Sohbet"
            description="Gerçek zamanlı mesajlaşma ve video arama"
          />
          <FeatureCard 
            icon="📖"
            title="Hikayeler"
            description="Instagram-style story paylaşım sistemi"
          />
          <FeatureCard 
            icon="👑"
            title="Premium Üyelik"
            description="Özel özellikler ve ayrıcalıklar"
          />
          <FeatureCard 
            icon="🎛️"
            title="Admin Panel"
            description="Kapsamlı yönetim ve analitik sistemi"
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button onClick={() => alert('Kayıt ol sayfası yakında!')}>
            🚀 Kayıt Ol
          </Button>
          <Button onClick={() => alert('Giriş yap sayfası yakında!')}>
            🔑 Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  )
}

// Basit Profile component
function Profile() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FEF3C7, #FED7AA, #FECACA)',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '30px' }}>
          👤 Profil Sayfası
        </h1>
        <p style={{ textAlign: 'center' }}>Profil yönetimi özellikleri burada olacak!</p>
      </div>
    </div>
  )
}

// Basit Admin component
function Admin() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FEF3C7, #FED7AA, #FECACA)',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '30px' }}>
          🎛️ Admin Paneli
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <StatCard title="Toplam Kullanıcı" value="12,847" icon="👥" />
          <StatCard title="Aktif Eşleşme" value="8,934" icon="❤️" />
          <StatCard title="Günlük Mesaj" value="45,672" icon="💬" />
          <StatCard title="Premium Üye" value="1,567" icon="👑" />
        </div>
      </div>
    </div>
  )
}

// Helper components
function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      padding: '30px',
      background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
      borderRadius: '15px',
      textAlign: 'center',
      border: '1px solid #FCD34D'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: '#92400E' }}>
        {title}
      </h3>
      <p style={{ color: '#7C2D12' }}>{description}</p>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
      borderRadius: '10px',
      textAlign: 'center',
      border: '1px solid #93C5FD'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>{value}</div>
      <div style={{ fontSize: '0.9rem', color: '#3B82F6' }}>{title}</div>
    </div>
  )
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(45deg, #F59E0B, #EF4444)',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)'
        e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)'
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0px)'
        e.target.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

// Ana component
function SimpleApp() {
  return (
    <Router>
      <div>
        {/* Basit Navigation */}
        <nav style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          padding: '15px 0',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '1000',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px'
          }}>
            <Link to="/" style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #F59E0B, #EF4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none'
            }}>
              🎉 HappyTime
            </Link>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <NavLink to="/">🏠 Ana Sayfa</NavLink>
              <NavLink to="/profile">👤 Profil</NavLink>
              <NavLink to="/admin">🎛️ Admin</NavLink>
            </div>
          </div>
        </nav>

        {/* Ana içerik */}
        <main style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color: '#7C2D12',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => {
        e.target.style.background = '#FEF3C7'
        e.target.style.color = '#92400E'
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'transparent'
        e.target.style.color = '#7C2D12'
      }}
    >
      {children}
    </Link>
  )
}

export default SimpleApp

