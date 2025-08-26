import React from 'react'

function TestApp() {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #FEF3C7, #FED7AA, #FECACA)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #F59E0B, #EF4444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}>
          🎉 HappyTime
        </h1>
        
        <div style={{ color: '#059669', fontSize: '1.2rem', margin: '20px 0' }}>
          ✅ React App Başarıyla Çalışıyor!
        </div>
        
        <p>Bu sayfayı görüyorsanız React çalışıyor demektir!</p>
        
        <div style={{ marginTop: '30px' }}>
          <button 
            onClick={() => alert('Button çalışıyor!')}
            style={{
              background: 'linear-gradient(45deg, #F59E0B, #EF4444)',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            🚀 Test Button
          </button>
        </div>
        
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#FEF3C7',
          borderRadius: '10px'
        }}>
          <strong>Sistem Bilgileri:</strong><br/>
          URL: {window.location.href}<br/>
          User Agent: {navigator.userAgent.substring(0, 50)}...
        </div>
      </div>
    </div>
  )
}

export default TestApp

