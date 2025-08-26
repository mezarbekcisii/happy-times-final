import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SpotifyPlayer = ({ song, artist, isPlaying, onPlayPause, onNext, onPrev, albumArt, compact = false }) => {
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(180) // 3 dakika varsayılan

  // Simulasyon: Şarkı ilerlemesi
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) {
            onNext && onNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration, onNext])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (progress / duration) * 100

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/80 backdrop-blur-lg rounded-xl p-3 flex items-center space-x-3 border border-green-500/20"
      >
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img src={albumArt} alt={song} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm truncate">{song}</h4>
          <p className="text-green-400 text-xs truncate">{artist}</p>
        </div>
        <button
          onClick={onPlayPause}
          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-400 transition-colors"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-500 text-sm font-bold">♪</span>
          </div>
          <span className="font-bold text-sm">SPOTIFY</span>
        </div>
        <div className="text-xs opacity-80">Çalıyor</div>
      </div>

      {/* Album Art & Info */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
          <img src={albumArt} alt={song} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1 leading-tight">{song}</h3>
          <p className="text-green-100 text-sm opacity-90">{artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs opacity-80 mb-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="bg-white/20 rounded-full h-1 overflow-hidden">
          <motion.div
            className="bg-white h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          ⏮️
        </button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayPause}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-lg"
        >
          <span className="text-xl">
            {isPlaying ? '⏸️' : '▶️'}
          </span>
        </motion.button>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          ⏭️
        </button>
      </div>

      {/* Sound Visualizer */}
      <div className="flex items-center justify-center space-x-1 mt-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-white/60 rounded-full"
            animate={{
              height: isPlaying ? [4, 12, 8, 16, 6, 14, 10, 8] : 4,
            }}
            transition={{
              duration: 0.8,
              repeat: isPlaying ? Infinity : 0,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default SpotifyPlayer

