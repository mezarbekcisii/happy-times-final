import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MusicWorld = () => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  // Spotify tarzı müzik veritabanı
  const musicProfiles = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      musicTaste: 'Indie Pop Sevdalısı',
      topArtists: ['Billie Eilish', 'Lorde', 'The 1975', 'Arctic Monkeys'],
      currentlyPlaying: {
        song: 'bad guy',
        artist: 'Billie Eilish',
        album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        duration: 194
      },
      recentTracks: [
        { song: 'Sunflower', artist: 'Post Malone', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' },
        { song: 'Royals', artist: 'Lorde', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' },
        { song: 'Somebody Else', artist: 'The 1975', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300' }
      ],
      musicCompatibility: 95,
      sharedPlaylists: ['Chill Vibes', 'Late Night Feels'],
      concertHistory: ['Billie Eilish - İstanbul 2023', 'Arctic Monkeys - Ankara 2022']
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      musicTaste: 'Rock Klasikleri',
      topArtists: ['Queen', 'Led Zeppelin', 'Pink Floyd', 'The Beatles'],
      currentlyPlaying: {
        song: 'Don\'t Stop Me Now',
        artist: 'Queen',
        album: 'Jazz',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
        duration: 209
      },
      recentTracks: [
        { song: 'Stairway to Heaven', artist: 'Led Zeppelin', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' },
        { song: 'Bohemian Rhapsody', artist: 'Queen', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300' },
        { song: 'Wish You Were Here', artist: 'Pink Floyd', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' }
      ],
      musicCompatibility: 87,
      sharedPlaylists: ['Classic Rock Anthems', 'Road Trip'],
      concertHistory: ['Queen + Adam Lambert - İstanbul 2020', 'Metallica - Rock\'n Coke 2019']
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      musicTaste: 'Ambient & Chill',
      topArtists: ['Bon Iver', 'Ólafur Arnalds', 'Nils Frahm', 'Kiasmos'],
      currentlyPlaying: {
        song: 'Holocene',
        artist: 'Bon Iver',
        album: 'Bon Iver, Bon Iver',
        cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        duration: 337
      },
      recentTracks: [
        { song: 'Near Light', artist: 'Ólafur Arnalds', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300' },
        { song: 'Says', artist: 'Nils Frahm', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' },
        { song: 'Blurred EP', artist: 'Kiasmos', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' }
      ],
      musicCompatibility: 92,
      sharedPlaylists: ['Meditation Sounds', 'Study Focus'],
      concertHistory: ['Bon Iver - Zorlu PSM 2022', 'Ólafur Arnalds - İş Sanat 2021']
    }
  ]

  const currentProfile = musicProfiles[currentTrack]

  // Otomatik şarkı ilerlemesi
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= currentProfile.currentlyPlaying.duration) {
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentProfile.currentlyPlaying.duration])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (progress / currentProfile.currentlyPlaying.duration) * 100

  const nextProfile = () => {
    setCurrentTrack((prev) => (prev + 1) % musicProfiles.length)
    setProgress(0)
  }

  const prevProfile = () => {
    setCurrentTrack((prev) => (prev - 1 + musicProfiles.length) % musicProfiles.length)
    setProgress(0)
  }

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-500'
    if (score >= 80) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-16">
      {/* Musical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Happy Music Background Images */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-green-400 to-teal-400 rounded-full blur-xl"></div>
      </div>

      {/* Musical Notes Floating Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: Math.random() * 20 + 20 + 'px'
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0.2, 0.05, 0.2],
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['♪', '♫', '♬', '🎵', '🎶', '🎼', '🎤', '🎧'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/discover')}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md"
              >
                ←
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">🎵</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    Müzik Dünyası
                  </h1>
                  <p className="text-gray-600 text-xs">Müzik uyumluluğunu keşfet</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowVisualizer(!showVisualizer)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {showVisualizer ? '🎤 Görselleştirici' : '🎧 Görselleştirici'}
              </button>
              <div className="text-gray-600 text-sm font-medium">
                {currentTrack + 1}/{musicProfiles.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left Side - Profile & Compatibility */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30">
                    <img src={currentProfile.avatar} alt={currentProfile.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{currentProfile.name}</h2>
                    <p className="text-white/70 text-sm">{currentProfile.age} yaşında</p>
                    <p className="text-green-400 font-medium text-sm">{currentProfile.musicTaste}</p>
                  </div>
                </div>

                {/* Music Compatibility */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-semibold text-sm">Müzik Uyumluluğu</span>
                    <span className="text-white font-bold text-lg">{currentProfile.musicCompatibility}%</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${getCompatibilityColor(currentProfile.musicCompatibility)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${currentProfile.musicCompatibility}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Top Artists */}
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">En Sevdiği Sanatçılar</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentProfile.topArtists.map((artist, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-2 text-center">
                        <span className="text-white/90 text-xs">{artist}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shared Playlists */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl">
                <h3 className="text-white font-semibold mb-3 text-sm">Ortak Çalma Listeleri</h3>
                <div className="space-y-2">
                  {currentProfile.sharedPlaylists.map((playlist, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📻</span>
                      </div>
                      <span className="text-white text-sm">{playlist}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Music Player */}
            <div className="space-y-6">
              {/* Now Playing */}
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-6 border border-green-500/30 shadow-2xl">
                <div className="text-center mb-4">
                  <p className="text-green-400 font-semibold mb-2 text-sm">Şu Anda Çalıyor</p>
                  <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden shadow-2xl mb-3">
                    <img 
                      src={currentProfile.currentlyPlaying.cover} 
                      alt={currentProfile.currentlyPlaying.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{currentProfile.currentlyPlaying.song}</h3>
                  <p className="text-white/70 mb-1 text-sm">{currentProfile.currentlyPlaying.artist}</p>
                  <p className="text-white/50 text-xs">{currentProfile.currentlyPlaying.album}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-white/70 text-xs mb-2">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(currentProfile.currentlyPlaying.duration)}</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-full rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevProfile}
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    ⏮️
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <span className="text-2xl">
                      {isPlaying ? '⏸️' : '▶️'}
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextProfile}
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    ⏭️
                  </motion.button>
                </div>

                {/* Sound Visualizer */}
                <AnimatePresence>
                  {showVisualizer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-center space-x-2 mt-6"
                    >
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 bg-gradient-to-t from-green-500 to-blue-500 rounded-full"
                          animate={{
                            height: isPlaying ? [8, 32, 16, 40, 12, 36, 20, 24] : 8,
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: isPlaying ? Infinity : 0,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recent Tracks */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl">
                <h3 className="text-white font-semibold mb-3 text-sm">Son Çalınanlar</h3>
                <div className="space-y-2">
                  {currentProfile.recentTracks.map((track, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img src={track.cover} alt={track.song} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs truncate">{track.song}</p>
                        <p className="text-white/70 text-xs truncate">{track.artist}</p>
                      </div>
                      <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                        ▶️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-2xl"
          >
            ❌
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl shadow-2xl"
          >
            ❤️
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default MusicWorld
