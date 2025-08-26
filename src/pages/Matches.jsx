import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaHeart, 
  FaStar, 
  FaComments,
  FaMapMarkerAlt,
  FaEye,
  FaFilter,
  FaSearch,
  FaCrown,
  FaGift,
  FaFire,
  FaUndo,
  FaTimes
} from 'react-icons/fa'
import Logo from '../components/Logo'

const Matches = () => {
  const [activeTab, setActiveTab] = useState('matches') // matches, likes, visitors
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // Mock matches data
  const matches = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      location: 'İstanbul',
      distance: '2 km',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      photos: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300'
      ],
      matchedAt: '2 gün önce',
      lastMessage: 'Merhaba! Nasılsın?',
      lastMessageTime: '1 saat önce',
      premium: 'gold',
      verified: true,
      mutual: true,
      compatibility: 95
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Ankara',
      distance: '5 km',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300'
      ],
      matchedAt: '1 gün önce',
      lastMessage: 'Yarın buluşalım mı?',
      lastMessageTime: '30 dakika önce',
      premium: 'silver',
      verified: false,
      mutual: false,
      compatibility: 87
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'İzmir',
      distance: '1 km',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      photos: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'
      ],
      matchedAt: '3 saat önce',
      lastMessage: null,
      lastMessageTime: null,
      premium: 'free',
      verified: true,
      mutual: true,
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
      distance: '8 km',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
      type: 'super', // normal, super
      likedAt: '2 saat önce',
      premium: 'platinum',
      verified: true,
      compatibility: 89
    },
    {
      id: 5,
      name: 'Can Özkan',
      age: 32,
      location: 'Antalya',
      distance: '12 km',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300',
      type: 'normal',
      likedAt: '4 saat önce',
      premium: 'free',
      verified: false,
      compatibility: 78
    }
  ]

  // Mock visitors data
  const visitors = [
    {
      id: 6,
      name: 'Selin Ay',
      age: 25,
      location: 'İstanbul',
      distance: '3 km',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
      visitedAt: '1 saat önce',
      premium: 'gold',
      verified: true,
      viewCount: 3
    },
    {
      id: 7,
      name: 'Emre Kaya',
      age: 30,
      location: 'İzmir',
      distance: '7 km',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      visitedAt: '3 saat önce',
      premium: 'silver',
      verified: false,
      viewCount: 1
    }
  ]

  const membershipIcons = {
    free: '🆓',
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎'
  }

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleMatchClick = (match) => {
    setSelectedMatch(match)
  }

  const startChat = (matchId) => {
    console.log('Starting chat with:', matchId)
    // Navigate to chat
  }

  const likeBack = (personId) => {
    console.log('Liking back:', personId)
  }

  const passOnLike = (personId) => {
    console.log('Passing on like:', personId)
  }

  const renderMatches = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMatches.map((match) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => handleMatchClick(match)}
          className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
        >
          {/* Photo */}
          <div className="relative h-64">
            <img
              src={match.avatar}
              alt={match.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Premium & Verified Badges */}
            <div className="absolute top-3 left-3 flex space-x-2">
              {match.premium !== 'free' && (
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold">
                  {membershipIcons[match.premium]}
                </div>
              )}
              {match.verified && (
                <div className="bg-blue-500 text-white p-1 rounded-full">
                  <FaCrown className="text-xs" />
                </div>
              )}
            </div>
            
            {/* Compatibility Score */}
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              %{match.compatibility}
            </div>
            
            {/* Mutual Match Badge */}
            {match.mutual && (
              <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                <FaHeart />
                <span>Karşılıklı</span>
              </div>
            )}
            
            {/* Basic Info */}
            <div className="absolute bottom-3 right-3 text-white text-right">
              <h3 className="font-bold text-lg">{match.name}, {match.age}</h3>
              <div className="flex items-center space-x-1 text-sm">
                <FaMapMarkerAlt />
                <span>{match.distance}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
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
              <div className="text-xs text-gray-500">
                {match.lastMessageTime || 'Henüz mesaj yok'}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                startChat(match.id)
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              <FaComments className="inline mr-2" />
              {match.lastMessage ? 'Sohbete Devam Et' : 'Mesaj Gönder'}
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
          {/* Photo */}
          <div className="relative h-64">
            <img
              src={like.avatar}
              alt={like.name}
              className="w-full h-full object-cover"
            />
            
            {/* Like Type Badge */}
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${
              like.type === 'super' 
                ? 'bg-blue-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {like.type === 'super' ? (
                <><FaStar className="inline mr-1" />Süper Beğeni</>
              ) : (
                <><FaHeart className="inline mr-1" />Beğeni</>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-lg">{like.name}, {like.age}</h3>
              <div className="flex items-center space-x-1 text-sm">
                <FaMapMarkerAlt />
                <span>{like.distance}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="p-4">
            <div className="text-sm text-gray-600 mb-3">{like.likedAt} sizi beğendi</div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => likeBack(like.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <FaHeart className="inline mr-2" />
                Beğen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => passOnLike(like.id)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                <FaTimes className="inline mr-2" />
                Geç
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
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{visitor.name}, {visitor.age}</h3>
              {visitor.verified && (
                <FaCrown className="text-blue-500 text-sm" />
              )}
              {visitor.premium !== 'free' && (
                <span className="text-sm">{membershipIcons[visitor.premium]}</span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaMapMarkerAlt />
              <span>{visitor.distance}</span>
              <span>•</span>
              <FaEye />
              <span>{visitor.viewCount} kez görüntüledi</span>
            </div>
            <div className="text-xs text-gray-500">{visitor.visitedAt}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-200"
          >
            <FaHeart />
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
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
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
              <FaHeart className="inline mr-2" />
              Eşleşmeler ({matches.length})
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
              <FaStar className="inline mr-2" />
              Beğeniler ({likes.length})
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
              <FaEye className="inline mr-2" />
              Ziyaretçiler ({visitors.length})
            </motion.button>
          </div>
        </motion.div>

        {/* Search & Filters */}
        {activeTab === 'matches' && (
          <motion.div 
            className="flex flex-col md:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Eşleşme ara..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <FaFilter />
              <span>Filtreler</span>
            </motion.button>
          </motion.div>
        )}

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

        {/* Empty States */}
        {((activeTab === 'matches' && filteredMatches.length === 0) ||
          (activeTab === 'likes' && likes.length === 0) ||
          (activeTab === 'visitors' && visitors.length === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">
              {activeTab === 'matches' ? '💔' : activeTab === 'likes' ? '💙' : '👻'}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === 'matches' ? 'Henüz eşleşme yok' : 
               activeTab === 'likes' ? 'Henüz beğeni yok' : 
               'Henüz ziyaretçi yok'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'matches' ? 'Keşfet sayfasından yeni insanlarla tanışın!' : 
               activeTab === 'likes' ? 'Profilinizi görüntüleyen kişiler burada görünecek' : 
               'Profilinizi ziyaret eden kişiler burada listelenecek'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              <FaFire className="mr-2" />
              Keşfetmeye Başla
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Matches

