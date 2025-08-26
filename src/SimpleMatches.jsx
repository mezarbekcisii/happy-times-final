import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SimpleMatches = () => {
  const [activeTab, setActiveTab] = useState('matches')

  // Mock matches data
  const matches = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      location: 'İstanbul',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      matchedAt: '2 gün önce',
      lastMessage: 'Merhaba! Nasılsın?',
      compatibility: 95
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Ankara',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      matchedAt: '1 gün önce',
      lastMessage: 'Yarın buluşalım mı?',
      compatibility: 87
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'İzmir',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      matchedAt: '3 saat önce',
      lastMessage: null,
      compatibility: 92
    }
  ]

  // Mock likes data
  const likes = [
    {
      id: 4,
      name: 'Ayşe Kara',
      age: 28,
      location: 'Bursa',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
      type: 'super',
      likedAt: '2 saat önce'
    },
    {
      id: 5,
      name: 'Can Özkan',
      age: 32,
      location: 'Antalya',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300',
      type: 'normal',
      likedAt: '4 saat önce'
    }
  ]

  // Mock visitors data
  const visitors = [
    {
      id: 6,
      name: 'Selin Ay',
      age: 25,
      location: 'İstanbul',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
      visitedAt: '1 saat önce',
      viewCount: 3
    },
    {
      id: 7,
      name: 'Emre Kaya',
      age: 30,
      location: 'İzmir',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      visitedAt: '3 saat önce',
      viewCount: 1
    }
  ]

  const startChat = (matchId) => {
    alert(`${matchId} ID'li kişi ile sohbet başlatılıyor...`)
  }

  const likeBack = (personId) => {
    alert(`${personId} ID'li kişi geri beğenildi!`)
  }

  const renderMatches = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
        >
          <div className="relative h-64">
            <img
              src={match.avatar}
              alt={match.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Compatibility Score */}
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              %{match.compatibility}
            </div>
            
            {/* Basic Info */}
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-lg">{match.name}, {match.age}</h3>
              <div className="flex items-center space-x-1 text-sm">
                <span>📍</span>
                <span>{match.location}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600">Eşleşme: {match.matchedAt}</div>
                {match.lastMessage && (
                  <div className="text-sm text-gray-800 mt-1">
                    "{match.lastMessage.substring(0, 30)}..."
                  </div>
                )}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startChat(match.id)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              💬 {match.lastMessage ? 'Sohbete Devam Et' : 'Mesaj Gönder'}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderLikes = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {likes.map((like) => (
        <motion.div
          key={like.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="relative h-64">
            <img
              src={like.avatar}
              alt={like.name}
              className="w-full h-full object-cover"
            />
            
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${
              like.type === 'super' 
                ? 'bg-blue-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {like.type === 'super' ? '⭐ Süper Beğeni' : '❤️ Beğeni'}
            </div>
            
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-lg">{like.name}, {like.age}</h3>
              <div className="flex items-center space-x-1 text-sm">
                <span>📍</span>
                <span>{like.location}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="text-sm text-gray-600 mb-3">{like.likedAt} sizi beğendi</div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => likeBack(like.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                ❤️ Beğen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                ❌ Geç
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderVisitors = () => (
    <div className="space-y-4">
      {visitors.map((visitor) => (
        <motion.div
          key={visitor.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-4 shadow-lg flex items-center space-x-4"
        >
          <img
            src={visitor.avatar}
            alt={visitor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{visitor.name}, {visitor.age}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>📍</span>
              <span>{visitor.location}</span>
              <span>•</span>
              <span>👁️</span>
              <span>{visitor.viewCount} kez görüntüledi</span>
            </div>
            <div className="text-xs text-gray-500">{visitor.visitedAt}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200"
          >
            ❤️
          </motion.button>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            💝 Eşleşmelerim
          </h1>
          <p className="text-gray-600 text-lg">Yeni dostlukların ve mutlu anların merkezi!</p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-white/50">
            <motion.button
              onClick={() => setActiveTab('matches')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'matches'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ❤️ Eşleşmeler ({matches.length})
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('likes')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'likes'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ⭐ Beğeniler ({likes.length})
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('visitors')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'visitors'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              👁️ Ziyaretçiler ({visitors.length})
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {activeTab === 'matches' && renderMatches()}
          {activeTab === 'likes' && renderLikes()}
          {activeTab === 'visitors' && renderVisitors()}
        </motion.div>
      </div>
    </div>
  )
}

export default SimpleMatches

