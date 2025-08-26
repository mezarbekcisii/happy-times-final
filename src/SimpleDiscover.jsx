import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SimpleDiscover = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Basit profil verileri
  const profiles = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      location: 'İstanbul',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'Sanat ve müzik tutkunu',
      interests: ['🎨 Sanat', '🎵 Müzik', '📚 Kitap']
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Ankara',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Doktor ve spor sevdalısı',
      interests: ['⚽ Spor', '🏥 Tıp', '🌍 Seyahat']
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'İzmir',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Yoga eğitmeni',
      interests: ['🧘 Yoga', '🌱 Doğa', '📖 Felsefe']
    }
  ]

  const currentProfile = profiles[currentIndex]

  const handleLike = () => {
    console.log('Beğenildi:', currentProfile.name)
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Başa dön
    }
  }

  const handlePass = () => {
    console.log('Geçildi:', currentProfile.name)
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          🔍 Keşfet
        </h1>
        <p className="text-gray-600">Yeni insanlarla tanış!</p>
      </div>

      {/* Stories Bar - Basit versiyon */}
      <div className="max-w-lg mx-auto mb-8 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
          <h3 className="font-semibold text-gray-900 mb-3">📖 Hikayeler</h3>
          <div className="flex space-x-3 overflow-x-auto">
            {/* Kendi story'niz */}
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">
                +
              </div>
              <p className="text-xs text-gray-600">Hikaye Ekle</p>
            </div>
            
            {/* Diğer hikayeler */}
            {profiles.map((profile) => (
              <div key={profile.id} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-purple-400 to-pink-500">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">{profile.name.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-md mx-auto px-4">
        <motion.div
          key={currentProfile.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Profile Image */}
          <div className="relative h-96">
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Profile Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-2xl font-bold mb-1">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-sm opacity-90 mb-2">📍 {currentProfile.location}</p>
              <p className="text-sm opacity-90">{currentProfile.bio}</p>
            </div>
          </div>

          {/* Interests */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">İlgi Alanları</h3>
            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePass}
            className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl hover:bg-gray-300 transition-colors"
          >
            ❌
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center text-2xl text-white hover:shadow-lg transition-all"
          >
            ❤️
          </motion.button>
        </div>

        {/* Profile Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {currentIndex + 1} / {profiles.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimpleDiscover

