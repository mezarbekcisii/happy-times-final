import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BeautifulDiscover = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)

  // Güzel profil verileri
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
      interests: ['🎨 Sanat', '🎵 Müzik', '📚 Kitap', '☕ Kahve'],
      verified: true,
      premium: 'gold',
      online: true,
      job: 'Grafik Tasarımcı'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Ankara',
      distance: '5 km',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
      ],
      bio: 'Doktor ve spor sevdalısı. Yeni maceralar arıyorum 🏥⚽',
      interests: ['⚽ Spor', '🏥 Tıp', '🌍 Seyahat', '📖 Okuma'],
      verified: false,
      premium: 'silver',
      online: false,
      job: 'Doktor'
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'İzmir',
      distance: '1 km',
      images: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: 'Yoga eğitmeni ve doğa aşığı. Pozitif enerji arıyorum 🧘‍♀️🌱',
      interests: ['🧘 Yoga', '🌱 Doğa', '📖 Felsefe', '🍃 Meditasyon'],
      verified: true,
      premium: 'free',
      online: true,
      job: 'Yoga Eğitmeni'
    }
  ]

  // Stories verisi
  const stories = [
    { id: 1, name: 'Hikaye Ekle', avatar: null, type: 'add' },
    { id: 2, name: 'Elif', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60', viewed: false },
    { id: 3, name: 'Mehmet', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60', viewed: true },
    { id: 4, name: 'Zeynep', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60', viewed: false },
    { id: 5, name: 'Ayşe', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60', viewed: false }
  ]

  const currentProfile = profiles[currentIndex]

  const handleLike = () => {
    setSwipeDirection('right')
    setTimeout(() => {
      console.log('Beğenildi:', currentProfile.name)
      nextProfile()
      setSwipeDirection(null)
    }, 300)
  }

  const handlePass = () => {
    setSwipeDirection('left')
    setTimeout(() => {
      console.log('Geçildi:', currentProfile.name)
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

  const nextImage = () => {
    if (currentImageIndex < currentProfile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const getMembershipBadge = (premium) => {
    if (premium === 'gold') return { text: '👑 Gold', color: 'bg-yellow-500' }
    if (premium === 'silver') return { text: '🥈 Silver', color: 'bg-gray-400' }
    if (premium === 'platinum') return { text: '💎 Platinum', color: 'bg-purple-500' }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-16 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              🔍 Keşfet
            </h1>
            <div className="text-sm text-gray-600">
              {currentIndex + 1}/{profiles.length}
            </div>
          </div>
        </div>
      </div>

      {/* Stories Bar */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {stories.map((story) => (
              <div key={story.id} className="flex-shrink-0 cursor-pointer text-center">
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
                        src={story.avatar}
                        alt={story.name}
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-2 font-medium text-gray-700 w-16 truncate">
                  {story.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: swipeDirection === 'right' ? 100 : swipeDirection === 'left' ? -100 : 0,
              rotate: swipeDirection === 'right' ? 10 : swipeDirection === 'left' ? -10 : 0
            }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
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
                <button 
                  className="w-1/2 h-full" 
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                />
                <button 
                  className="w-1/2 h-full" 
                  onClick={nextImage}
                  disabled={currentImageIndex === currentProfile.images.length - 1}
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
                    🟢 Online
                  </div>
                )}
                {currentProfile.verified && (
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ✓ Doğrulanmış
                  </div>
                )}
                {getMembershipBadge(currentProfile.premium) && (
                  <div className={`${getMembershipBadge(currentProfile.premium).color} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                    {getMembershipBadge(currentProfile.premium).text}
                  </div>
                )}
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Basic Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-3xl font-bold mb-1">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <div className="flex items-center space-x-4 text-sm opacity-90 mb-2">
                  <span>📍 {currentProfile.distance}</span>
                  <span>💼 {currentProfile.job}</span>
                </div>
              </div>
              
              {/* Swipe Animation */}
              {swipeDirection && (
                <div className={`absolute inset-0 flex items-center justify-center text-8xl ${
                  swipeDirection === 'right' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {swipeDirection === 'right' ? '❤️' : '❌'}
                </div>
              )}
            </div>
            
            {/* Profile Details */}
            <div className="p-6 space-y-4">
              {/* Bio */}
              <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
              
              {/* Interests */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">İlgi Alanları</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-3 py-2 rounded-full text-sm font-medium border border-orange-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePass}
            className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
          >
            ❌
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
          >
            ⭐
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
          >
            ❤️
          </motion.button>
        </div>

        {/* Swipe Hint */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">Butonları kullanarak beğen veya geç</p>
        </div>
      </div>
    </div>
  )
}

export default BeautifulDiscover

