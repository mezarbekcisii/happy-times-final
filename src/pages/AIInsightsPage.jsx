import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SmartRecommendations, calculateCompatibility } from '../components/AICompatibility'

const AIInsightsPage = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('recommendations')

  // Mock data
  const currentUser = {
    id: 'me',
    name: 'Sen',
    age: 25,
    interests: ['🎨 Sanat', '☕ Kahve', '📚 Kitap', '🎵 Müzik'],
    drinking: 'Ara sıra',
    smoking: 'İçmem',
    musicTaste: 'Indie Pop',
    online: true,
    bio: 'Yaratıcı ruhlu, sanat ve müzik sevdalısı biriyim.',
    distance: 0
  }

  const allUsers = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      interests: ['🎨 Sanat', '🎵 Müzik', '📚 Kitap', '☕ Kahve'],
      drinking: 'Ara sıra',
      smoking: 'İçmem',
      musicTaste: 'Indie Pop',
      online: true,
      bio: 'Sanat ve müzik tutkunu.',
      distance: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      interests: ['⚽ Spor', '🏥 Tıp', '🌍 Seyahat', '📖 Okuma'],
      drinking: 'Sosyal ortamlarda',
      smoking: 'İçmem',
      musicTaste: 'Rock',
      online: false,
      bio: 'Doktor ve spor sevdalısı.',
      distance: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      interests: ['🧘 Yoga', '🌱 Doğa', '📖 Felsefe', '🍃 Meditasyon'],
      drinking: 'İçmem',
      smoking: 'İçmem',
      musicTaste: 'Ambient',
      online: true,
      bio: 'Yoga eğitmeni ve doğa aşığı.',
      distance: 1,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    {
      id: 4,
      name: 'Ali Öztürk',
      age: 27,
      interests: ['💻 Teknoloji', '🎮 Gaming', '🎵 Müzik'],
      drinking: 'Ara sıra',
      smoking: 'İçmem',
      musicTaste: 'Electronic',
      online: true,
      bio: 'Yazılımcı ve teknoloji tutkunu.',
      distance: 3,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 5,
      name: 'Ayşe Kılıç',
      age: 25,
      interests: ['📸 Fotoğraf', '🌍 Seyahat', '🎨 Sanat'],
      drinking: 'Sosyal ortamlarda',
      smoking: 'İçmem',
      musicTaste: 'Pop',
      online: false,
      bio: 'Fotoğrafçı ve seyahat sevdalısı.',
      distance: 4,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    }
  ]

  const compatibilityAnalysis = allUsers.map(user => ({
    ...user,
    compatibility: calculateCompatibility(currentUser, user)
  })).sort((a, b) => b.compatibility.total - a.compatibility.total)

  const tabs = [
    { id: 'recommendations', name: 'AI Önerileri', icon: '🎯' },
    { id: 'analytics', name: 'Uyumluluk Analizi', icon: '📊' },
    { id: 'insights', name: 'Akıllı İçgörüler', icon: '🧠' }
  ]

  const personalityInsights = [
    {
      title: 'Kişilik Analizi',
      insight: 'Yaratıcı ve sanatsal zevklere sahipsiniz. Benzer ilgi alanlarına sahip kişilerle %85 daha fazla uyumlusunuz.',
      icon: '🎨',
      confidence: 92
    },
    {
      title: 'İlişki Tercihleri',
      insight: 'Samimi ve derin bağlantıları tercih ediyorsunuz. Müzik ve sanat üzerinden bağ kurmayı seviyorsunuz.',
      icon: '💭',
      confidence: 88
    },
    {
      title: 'Sosyal Davranış',
      insight: 'Orta düzeyde sosyalsiniz. Hem yalnız vakit geçirmeyi hem de kaliteli sohbetleri seviyorsunuz.',
      icon: '👥',
      confidence: 85
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/discover')}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                ←
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🤖 AI İçgörüleri
                </h1>
                <p className="text-white/70">Yapay zeka destekli eşleşme analizi</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-white font-bold">AI Confidence</div>
              <div className="text-green-400 text-xl font-bold">94%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🎯 Size Özel AI Önerileri</h2>
                <SmartRecommendations currentUser={currentUser} users={allUsers} />
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">📈 Bu Hafta Popüler</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                    <h3 className="text-white font-bold mb-2">🎨 Sanat Severler</h3>
                    <p className="text-white/80 text-sm">Sizin gibi sanat tutkunu kişiler bu hafta %40 daha aktif!</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                    <h3 className="text-white font-bold mb-2">☕ Kahve Tutkunları</h3>
                    <p className="text-white/80 text-sm">Kahve severlerin eşleşme oranı %25 daha yüksek!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">📊 Detaylı Uyumluluk Analizi</h2>
                <div className="space-y-4">
                  {compatibilityAnalysis.slice(0, 3).map((user) => (
                    <div key={user.id} className="bg-white/5 rounded-2xl p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg">{user.name}</h3>
                          <p className="text-white/70">{user.age} yaşında • {user.distance} km</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white">{user.compatibility.total}%</div>
                          <div className="text-white/60 text-sm">uyumluluk</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{user.compatibility.breakdown.interests}</div>
                          <div className="text-white/60 text-xs">İlgi Alanları</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{user.compatibility.breakdown.lifestyle}</div>
                          <div className="text-white/60 text-xs">Yaşam Tarzı</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{user.compatibility.breakdown.music}</div>
                          <div className="text-white/60 text-xs">Müzik</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">🧠 Kişisel AI İçgörüleri</h2>
                <div className="space-y-6">
                  {personalityInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-2xl p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{insight.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">{insight.title}</h3>
                          <p className="text-white/80 leading-relaxed">{insight.insight}</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="text-white/60 text-sm">AI Güvenilirlik:</span>
                            <div className="bg-white/20 rounded-full h-2 w-24 overflow-hidden">
                              <div 
                                className="bg-green-400 h-full rounded-full"
                                style={{ width: `${insight.confidence}%` }}
                              />
                            </div>
                            <span className="text-green-400 text-sm font-bold">{insight.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30">
                <h2 className="text-2xl font-bold text-white mb-6">💡 AI Tavsiyeleri</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="text-white font-bold">Profil Optimizasyonu</h4>
                      <p className="text-white/80 text-sm">Müzik zevkinizi daha detaylandırın. Bu, benzer kişilerle eşleşme şansınızı %30 artırır.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <h4 className="text-white font-bold">En İyi Aktiflik Saatleri</h4>
                      <p className="text-white/80 text-sm">19:00-22:00 arası en aktif olduğunuz saatler. Bu saatlerde %45 daha fazla eşleşme alıyorsunuz.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <h4 className="text-white font-bold">Mesajlaşma Önerisi</h4>
                      <p className="text-white/80 text-sm">Sanat ve müzik konularında başlattığınız sohbetler %60 daha uzun sürüyor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AIInsightsPage

