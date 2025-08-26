import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { 
  FaHeart, 
  FaTimes, 
  FaStar, 
  FaUndo, 
  FaMapMarkerAlt, 
  FaBolt,
  FaCamera,
  FaGraduationCap,
  FaBriefcase,
  FaUsers,
  FaFilter,
  FaCrown,
  FaInfo
} from 'react-icons/fa'
import Logo from '../components/Logo'
import StoryBar from '../components/StoryBar'

const Discover = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [lastAction, setLastAction] = useState(null)
  const [matches, setMatches] = useState([])
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [newMatch, setNewMatch] = useState(null)
  const [superLikesLeft, setSuperLikesLeft] = useState(3)
  const [undoLeft, setUndoLeft] = useState(1)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Mock kullanıcı verileri
  const mockUsers = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      location: 'İstanbul',
      distance: '2 km',
      occupation: 'Grafik Tasarımcı',
      education: 'İTÜ Mimarlık',
      bio: '🎨 Sanat tutkunu, kahve bağımlısı ve hayat dolu biri! HappyTime\'da yeni dostluklar arıyorum. 🌟',
      interests: ['🎨 Sanat', '☕ Kahve', '🎵 Müzik', '📚 Kitap', '🌍 Seyahat'],
      photos: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
      ],
      premium: 'gold',
      verified: true,
      lastSeen: 'Çevrimiçi',
      mutualFriends: 3
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Ankara',
      distance: '5 km',
      occupation: 'Yazılım Geliştirici',
      education: 'ODTÜ Bilgisayar Müh.',
      bio: '💻 Teknoloji meraklısı, doğa yürüyüşü sevdalısı. Hayatın güzel anlarını paylaşacak biriyle tanışmak istiyorum! 🌲',
      interests: ['💻 Teknoloji', '🥾 Yürüyüş', '🎮 Oyun', '📱 Gadget', '🏔️ Dağcılık'],
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400'
      ],
      premium: 'silver',
      verified: false,
      lastSeen: '5 dakika önce',
      mutualFriends: 1
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'İzmir',
      distance: '1 km',
      occupation: 'Öğretmen',
      education: 'Ege Üniversitesi',
      bio: '📚 Eğitim aşığı, çocuk dostu ve pozitif enerjili! Güzel sohbetler ve samimi dostluklar için buradayım. ✨',
      interests: ['📚 Eğitim', '🎭 Tiyatro', '🌻 Çiçek', '🐕 Hayvanlar', '🧘 Yoga'],
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400'
      ],
      premium: 'free',
      verified: true,
      lastSeen: 'Çevrimiçi',
      mutualFriends: 7
    },
    {
      id: 4,
      name: 'Ahmet Öztürk',
      age: 31,
      location: 'Bursa',
      distance: '3 km',
      occupation: 'Doktor',
      education: 'Uludağ Tıp Fakültesi',
      bio: '👨‍⚕️ Hayat kurtarma mesleğinde, hayatın tadını çıkarmayı da seviyorum. Spor, müzik ve güzel yemekler! 🏃‍♂️',
      interests: ['⚕️ Tıp', '🏃‍♂️ Spor', '🎵 Müzik', '🍳 Yemek', '✈️ Seyahat'],
      photos: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400'
      ],
      premium: 'platinum',
      verified: true,
      lastSeen: '1 saat önce',
      mutualFriends: 12
    }
  ]

  const currentUser = mockUsers[currentUserIndex]
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

  const membershipColors = {
    free: { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🆓' },
    bronze: { bg: 'bg-orange-100', text: 'text-orange-600', icon: '🥉' },
    silver: { bg: 'bg-slate-100', text: 'text-slate-600', icon: '🥈' },
    gold: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: '🥇' },
    platinum: { bg: 'bg-purple-100', text: 'text-purple-600', icon: '💎' }
  }

  const handleDragEnd = (event, info) => {
    const threshold = 100
    const velocity = info.velocity.x

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0) {
        handleLike()
      } else {
        handlePass()
      }
    } else {
      x.set(0)
    }
  }

  const handleLike = () => {
    if (currentUser) {
      setLastAction({ type: 'like', user: currentUser })
      
      // %30 ihtimalle eşleşme simülasyonu
      if (Math.random() < 0.3) {
        setNewMatch(currentUser)
        setShowMatchModal(true)
        setMatches(prev => [...prev, currentUser])
      }
      
      nextUser()
    }
  }

  const handlePass = () => {
    if (currentUser) {
      setLastAction({ type: 'pass', user: currentUser })
      nextUser()
    }
  }

  const handleSuperLike = () => {
    if (superLikesLeft > 0 && currentUser) {
      setSuperLikesLeft(prev => prev - 1)
      setLastAction({ type: 'superlike', user: currentUser })
      
      // %60 ihtimalle eşleşme (süper beğeni)
      if (Math.random() < 0.6) {
        setNewMatch(currentUser)
        setShowMatchModal(true)
        setMatches(prev => [...prev, currentUser])
      }
      
      nextUser()
    }
  }

  const handleUndo = () => {
    if (undoLeft > 0 && lastAction) {
      setUndoLeft(prev => prev - 1)
      setCurrentUserIndex(prev => Math.max(0, prev - 1))
      setLastAction(null)
    }
  }

  const nextUser = () => {
    x.set(0)
    setCurrentUserIndex(prev => (prev + 1) % mockUsers.length)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (currentUser && currentPhotoIndex < currentUser.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1)
    }
  }

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Logo size="xl" className="mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎉 Tebrikler! Tüm profilleri gördün!
          </h2>
          <p className="text-gray-600 mb-6">
            Yeni kullanıcılar için biraz bekle veya filtrelerini güncelle
          </p>
          <button 
            onClick={() => setCurrentUserIndex(0)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Tekrar Başla
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFilter className="text-xl" />
            </motion.button>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{matches.length}</span> eşleşme
            </div>
          </div>
        </div>
      </div>

      {/* Stories Bar */}
      <StoryBar />

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* User Card */}
        <div className="relative h-[600px] mb-6">
          <motion.div
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Photo */}
            <div className="relative h-3/4">
              <img
                src={currentUser.photos[currentPhotoIndex]}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
              
              {/* Photo Navigation */}
              <div className="absolute top-4 left-4 right-4 flex space-x-1">
                {currentUser.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-1 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Photo Click Areas */}
              <div className="absolute inset-0 flex">
                <div 
                  className="w-1/2 h-full"
                  onClick={prevPhoto}
                />
                <div 
                  className="w-1/2 h-full"
                  onClick={nextPhoto}
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Premium Badge */}
              {currentUser.premium !== 'free' && (
                <div className={`absolute top-16 left-4 ${membershipColors[currentUser.premium].bg} ${membershipColors[currentUser.premium].text} px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1`}>
                  <span>{membershipColors[currentUser.premium].icon}</span>
                  <span className="capitalize">{currentUser.premium}</span>
                </div>
              )}
              
              {/* Verification Badge */}
              {currentUser.verified && (
                <div className="absolute top-16 right-4 bg-blue-500 text-white p-2 rounded-full">
                  <FaCrown className="text-sm" />
                </div>
              )}
              
              {/* Online Status */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                <div className={`w-2 h-2 rounded-full ${currentUser.lastSeen === 'Çevrimiçi' ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span>{currentUser.lastSeen}</span>
              </div>
              
              {/* Basic Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{currentUser.name}, {currentUser.age}</h2>
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <FaMapMarkerAlt />
                  <span>{currentUser.location} • {currentUser.distance}</span>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6 h-1/4 overflow-hidden">
              <div className="space-y-3">
                {/* Occupation & Education */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <FaBriefcase className="text-blue-500" />
                    <span>{currentUser.occupation}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <FaGraduationCap className="text-purple-500" />
                    <span>{currentUser.education}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {currentUser.bio}
                </p>

                {/* Interests */}
                <div className="flex flex-wrap gap-1">
                  {currentUser.interests.slice(0, 3).map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                  {currentUser.interests.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{currentUser.interests.length - 3}
                    </span>
                  )}
                </div>

                {/* Mutual Friends */}
                {currentUser.mutualFriends > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <FaUsers />
                    <span>{currentUser.mutualFriends} ortak arkadaş</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Swipe Indicators */}
          <motion.div
            className="absolute top-1/2 left-8 transform -translate-y-1/2 text-6xl font-bold text-red-500 opacity-0 pointer-events-none"
            style={{ opacity: useTransform(x, [-150, -50], [1, 0]) }}
          >
            HAYIR
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-8 transform -translate-y-1/2 text-6xl font-bold text-green-500 opacity-0 pointer-events-none"
            style={{ opacity: useTransform(x, [50, 150], [1, 0]) }}
          >
            EVET
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {/* Undo */}
          <motion.button
            onClick={handleUndo}
            disabled={undoLeft === 0 || !lastAction}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
              undoLeft === 0 || !lastAction
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:scale-110 active:scale-95'
            }`}
            whileHover={{ scale: undoLeft > 0 && lastAction ? 1.1 : 1 }}
            whileTap={{ scale: undoLeft > 0 && lastAction ? 0.95 : 1 }}
          >
            <FaUndo />
          </motion.button>

          {/* Pass */}
          <motion.button
            onClick={handlePass}
            className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200 hover:scale-110 active:scale-95 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTimes />
          </motion.button>

          {/* Super Like */}
          <motion.button
            onClick={handleSuperLike}
            disabled={superLikesLeft === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 relative ${
              superLikesLeft === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-110 active:scale-95'
            }`}
            whileHover={{ scale: superLikesLeft > 0 ? 1.1 : 1 }}
            whileTap={{ scale: superLikesLeft > 0 ? 0.95 : 1 }}
          >
            <FaStar />
            {superLikesLeft > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {superLikesLeft}
              </span>
            )}
          </motion.button>

          {/* Like */}
          <motion.button
            onClick={handleLike}
            className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl hover:bg-red-200 hover:scale-110 active:scale-95 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart />
          </motion.button>

          {/* Boost */}
          <motion.button
            className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg hover:bg-purple-200 hover:scale-110 active:scale-95 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBolt />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Süper beğeni: <span className="font-semibold text-blue-600">{superLikesLeft}</span> • 
            Geri al: <span className="font-semibold text-yellow-600">{undoLeft}</span>
          </p>
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && newMatch && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Eşleştiniz!
            </h2>
            <p className="text-gray-600 mb-6">
              Sen ve {newMatch.name} birbirinizi beğendiniz!
            </p>
            
            <div className="flex justify-center items-center space-x-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
                alt="You"
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300"
              />
              <div className="text-4xl text-red-500">
                <FaHeart />
              </div>
              <img
                src={newMatch.photos[0]}
                alt={newMatch.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300"
              />
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={() => setShowMatchModal(false)}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mesaj Gönder
              </motion.button>
              <motion.button
                onClick={() => setShowMatchModal(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Keşfetmeye Devam Et
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Discover