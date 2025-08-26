import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

const AdvancedDiscover = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [isStoryOpen, setIsStoryOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  
  const constraintsRef = useRef(null)

  // Gelişmiş profil verileri
  const profiles = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      location: 'İstanbul',
      distance: '2 km',
      images: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
      ],
      bio: 'Sanat ve müzik tutkunu. Kahve içmeyi ve yeni yerler keşfetmeyi seviyorum 🎨☕',
      interests: ['🎨 Sanat', '🎵 Müzik', '📚 Kitap', '☕ Kahve', '🌍 Seyahat'],
      verified: true,
      premium: 'gold',
      online: true,
      job: 'Grafik Tasarımcı',
      education: 'İTÜ'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Ankara',
      distance: '5 km',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
      ],
      bio: 'Doktor ve spor sevdalısı. Yeni maceralar ve dostluklar arıyorum 🏥⚽',
      interests: ['⚽ Spor', '🏥 Tıp', '🌍 Seyahat', '📖 Okuma', '🎬 Sinema'],
      verified: false,
      premium: 'silver',
      online: false,
      job: 'Doktor',
      education: 'Hacettepe Tıp'
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'İzmir',
      distance: '1 km',
      images: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
      ],
      bio: 'Yoga eğitmeni ve doğa aşığı. Pozitif enerji ve huzur arıyorum 🧘‍♀️🌱',
      interests: ['🧘 Yoga', '🌱 Doğa', '📖 Felsefe', '🍃 Meditasyon', '🏃 Koşu'],
      verified: true,
      premium: 'platinum',
      online: true,
      job: 'Yoga Eğitmeni',
      education: 'Ege Üniversitesi'
    }
  ]

  // Stories verisi
  const stories = [
    {
      id: 1,
      user: { name: 'Senin Hikayen', avatar: null },
      type: 'add',
      isOwn: true
    },
    {
      id: 2,
      user: { name: 'Elif', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60' },
      type: 'story',
      viewed: false
    },
    {
      id: 3,
      user: { name: 'Mehmet', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60' },
      type: 'story',
      viewed: true
    },
    {
      id: 4,
      user: { name: 'Zeynep', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60' },
      type: 'story',
      viewed: false
    },
    {
      id: 5,
      user: { name: 'Ayşe', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60' },
      type: 'story',
      viewed: false
    }
  ]

  const currentProfile = profiles[currentIndex]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleSwipe = (direction) => {
    setSwipeDirection(direction)
    
    setTimeout(() => {
      if (direction === 'right') {
        console.log('Beğenildi:', currentProfile.name)
        // Eşleşme kontrolü simülasyonu
        if (Math.random() > 0.7) {
          alert(`🎉 ${currentProfile.name} ile eşleştiniz!`)
        }
      } else {
        console.log('Geçildi:', currentProfile.name)
      }
      
      nextProfile()
      setSwipeDirection(null)
    }, 300)
  }

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
    setCurrentImageIndex(0)
  }

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      handleSwipe('right')
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe('left')
    }
  }

  const handleImageClick = (direction) => {
    if (direction === 'next' && currentImageIndex < currentProfile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const renderStoryBar = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 mb-6">
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => story.type === 'story' && setIsStoryOpen(true)}
            className="flex-shrink-0 cursor-pointer"
          >
            <div className="relative">
              {story.type === 'add' ? (
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  +
                </div>
              ) : (
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  story.viewed 
                    ? 'bg-gray-300' 
                    : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
                }`}>
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
              )}
              
              {/* Online indicator */}
              {!story.viewed && story.type === 'story' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                />
              )}
            </div>
            <p className="text-xs text-center mt-2 font-medium text-gray-700 w-16 truncate">
              {story.user.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderProfileCard = () => (
    <motion.div
      ref={constraintsRef}
      className="relative h-[600px] perspective-1000"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProfile.id}
          drag="x"
          dragConstraints={constraintsRef}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            x: swipeDirection === 'right' ? 300 : swipeDirection === 'left' ? -300 : 0,
            rotate: swipeDirection === 'right' ? 30 : swipeDirection === 'left' ? -30 : 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            x: swipeDirection === 'right' ? 300 : swipeDirection === 'left' ? -300 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.02 }}
        >
          {/* Image Container */}
          <div className="relative h-96">
            <img
              src={currentProfile.images[currentImageIndex]}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <div className="absolute inset-0 flex">
              <div 
                className="w-1/2 h-full cursor-pointer" 
                onClick={() => handleImageClick('prev')}
              />
              <div 
                className="w-1/2 h-full cursor-pointer" 
                onClick={() => handleImageClick('next')}
              />
            </div>
            
            {/* Image Indicators */}
            <div className="absolute top-4 left-4 right-4 flex space-x-1">
              {currentProfile.images.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              {currentProfile.online && (
                <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  🟢 Çevrimiçi
                </div>
              )}
              {currentProfile.verified && (
                <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  ✓ Doğrulanmış
                </div>
              )}
              {currentProfile.premium !== 'free' && (
                <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  👑 {currentProfile.premium}
                </div>
              )}
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Basic Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <span>📍 {currentProfile.distance}</span>
                    <span>💼 {currentProfile.job}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
                >
                  ℹ️
                </motion.button>
              </div>
            </div>
            
            {/* Swipe Indicators */}
            <AnimatePresence>
              {swipeDirection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className={`absolute inset-0 flex items-center justify-center text-6xl font-bold ${
                    swipeDirection === 'right' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {swipeDirection === 'right' ? '❤️' : '❌'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Details */}
          <div className="p-6 space-y-4">
            {/* Bio */}
            <div>
              <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
            </div>
            
            {/* Education */}
            <div className="flex items-center space-x-2 text-gray-600">
              <span>🎓</span>
              <span>{currentProfile.education}</span>
            </div>
            
            {/* Interests */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">İlgi Alanları</h4>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium border border-orange-200"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Swipe Hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-gray-500 text-sm">Kaydırarak beğen veya geç</p>
        <div className="flex justify-center space-x-4 mt-2">
          <span className="text-2xl">👈 Geç</span>
          <span className="text-2xl">Beğen 👉</span>
        </div>
      </motion.div>
    </motion.div>
  )

  const renderActionButtons = () => (
    <div className="flex justify-center space-x-6 mt-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleSwipe('left')}
        className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-all"
      >
        ❌
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg hover:shadow-xl transition-all"
      >
        ⭐
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleSwipe('right')}
        className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-all"
      >
        ❤️
      </motion.button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-16 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🔍 Keşfet
          </h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              🎛️
            </motion.button>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{currentIndex + 1}</span>/{profiles.length}
            </div>
          </div>
        </div>
      </div>

      {/* Stories Bar */}
      <div className="max-w-lg mx-auto px-4 py-4">
        {renderStoryBar()}
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-8">
        {renderProfileCard()}
        {renderActionButtons()}
      </div>
    </div>
  )
}

export default AdvancedDiscover

