import React, { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Game Context
const GameContext = createContext()

export const useGameSystem = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameSystem must be used within GameSystemProvider')
  }
  return context
}

// Game System Provider
export const GameSystemProvider = ({ children }) => {
  const [gameData, setGameData] = useState({
    level: 1,
    xp: 0,
    totalXP: 0,
    coins: 100,
    streak: 0,
    maxStreak: 0,
    achievements: [],
    stats: {
      likes: 0,
      superLikes: 0,
      matches: 0,
      messages: 0,
      profileViews: 0,
      photosUploaded: 0,
      daysActive: 1
    }
  })

  const [notifications, setNotifications] = useState([])
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showAchievement, setShowAchievement] = useState(null)

  // XP requirements for each level
  const getXPForLevel = (level) => level * 100 + (level - 1) * 50

  // Achievement definitions
  const achievements = [
    {
      id: 'first_like',
      title: 'İlk Adım',
      description: 'İlk beğenini yaptın!',
      icon: '❤️',
      xp: 10,
      coins: 5,
      condition: (stats) => stats.likes >= 1
    },
    {
      id: 'like_master',
      title: 'Beğeni Ustası',
      description: '50 beğeni yaptın!',
      icon: '💕',
      xp: 50,
      coins: 25,
      condition: (stats) => stats.likes >= 50
    },
    {
      id: 'first_match',
      title: 'İlk Eşleşme',
      description: 'İlk eşleşmeni yaptın!',
      icon: '💖',
      xp: 25,
      coins: 15,
      condition: (stats) => stats.matches >= 1
    },
    {
      id: 'match_maker',
      title: 'Aşk Elçisi',
      description: '10 eşleşme yaptın!',
      icon: '💘',
      xp: 100,
      coins: 50,
      condition: (stats) => stats.matches >= 10
    },
    {
      id: 'super_star',
      title: 'Süper Yıldız',
      description: '5 süper beğeni kullandın!',
      icon: '⭐',
      xp: 30,
      coins: 20,
      condition: (stats) => stats.superLikes >= 5
    },
    {
      id: 'social_butterfly',
      title: 'Sosyal Kelebek',
      description: '100 mesaj gönderdin!',
      icon: '🦋',
      xp: 75,
      coins: 35,
      condition: (stats) => stats.messages >= 100
    },
    {
      id: 'photo_pro',
      title: 'Fotoğraf Profesyoneli',
      description: '10 fotoğraf yükledin!',
      icon: '📸',
      xp: 40,
      coins: 25,
      condition: (stats) => stats.photosUploaded >= 10
    },
    {
      id: 'streak_5',
      title: 'Kararlılık',
      description: '5 günlük seri yaptın!',
      icon: '🔥',
      xp: 60,
      coins: 30,
      condition: (stats, streak) => streak >= 5
    },
    {
      id: 'popular',
      title: 'Popüler',
      description: 'Profilin 500 kez görüntülendi!',
      icon: '👑',
      xp: 80,
      coins: 40,
      condition: (stats) => stats.profileViews >= 500
    },
    {
      id: 'level_10',
      title: 'Deneyimli',
      description: '10. seviyeye ulaştın!',
      icon: '🏆',
      xp: 200,
      coins: 100,
      condition: (stats, streak, level) => level >= 10
    }
  ]

  // Add XP and check for level up
  const addXP = (amount, reason = '') => {
    setGameData(prev => {
      const newXP = prev.xp + amount
      const newTotalXP = prev.totalXP + amount
      const xpForNextLevel = getXPForLevel(prev.level + 1)
      
      let newLevel = prev.level
      let leveledUp = false
      
      if (newXP >= xpForNextLevel) {
        newLevel = prev.level + 1
        leveledUp = true
        setShowLevelUp(true)
        setTimeout(() => setShowLevelUp(false), 3000)
      }
      
      // Add notification
      addNotification(`+${amount} XP`, reason, 'xp')
      
      return {
        ...prev,
        xp: leveledUp ? newXP - xpForNextLevel : newXP,
        totalXP: newTotalXP,
        level: newLevel
      }
    })
  }

  // Add coins
  const addCoins = (amount, reason = '') => {
    setGameData(prev => ({
      ...prev,
      coins: prev.coins + amount
    }))
    addNotification(`+${amount} coin`, reason, 'coins')
  }

  // Update stats and check achievements
  const updateStats = (statType, amount = 1) => {
    setGameData(prev => {
      const newStats = {
        ...prev.stats,
        [statType]: prev.stats[statType] + amount
      }
      
      // Check for new achievements
      achievements.forEach(achievement => {
        const isUnlocked = prev.achievements.includes(achievement.id)
        if (!isUnlocked && achievement.condition(newStats, prev.streak, prev.level)) {
          unlockAchievement(achievement)
        }
      })
      
      return {
        ...prev,
        stats: newStats
      }
    })
  }

  // Unlock achievement
  const unlockAchievement = (achievement) => {
    setGameData(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement.id]
    }))
    
    addXP(achievement.xp, `Achievement: ${achievement.title}`)
    addCoins(achievement.coins, `Achievement: ${achievement.title}`)
    setShowAchievement(achievement)
    setTimeout(() => setShowAchievement(null), 4000)
  }

  // Add notification
  const addNotification = (text, reason, type) => {
    const notification = {
      id: Date.now(),
      text,
      reason,
      type,
      timestamp: Date.now()
    }
    
    setNotifications(prev => [...prev, notification])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 3000)
  }

  // Game actions
  const gameActions = {
    like: () => {
      updateStats('likes')
      addXP(2, 'Beğeni')
    },
    superLike: () => {
      updateStats('superLikes')
      addXP(5, 'Süper Beğeni')
    },
    match: () => {
      updateStats('matches')
      addXP(15, 'Eşleşme')
      addCoins(3, 'Eşleşme')
    },
    message: () => {
      updateStats('messages')
      addXP(1, 'Mesaj')
    },
    photoUpload: () => {
      updateStats('photosUploaded')
      addXP(8, 'Fotoğraf')
    },
    profileView: () => {
      updateStats('profileViews')
      addXP(1, 'Profil Görüntüleme')
    },
    dailyLogin: () => {
      setGameData(prev => ({
        ...prev,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }))
      addXP(10, 'Günlük Giriş')
      addCoins(5, 'Günlük Giriş')
    }
  }

  const contextValue = {
    gameData,
    gameActions,
    addXP,
    addCoins,
    updateStats,
    achievements,
    getXPForLevel
  }

  return (
    <GameContext.Provider value={contextValue}>
      {children}
      <GameNotifications notifications={notifications} />
      <LevelUpModal show={showLevelUp} level={gameData.level} />
      <AchievementModal achievement={showAchievement} />
    </GameContext.Provider>
  )
}

// Game Notifications Component
const GameNotifications = ({ notifications }) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg ${
              notification.type === 'xp' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500'
            }`}
          >
            {notification.text}
            {notification.reason && (
              <div className="text-xs opacity-80">{notification.reason}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Level Up Modal
const LevelUpModal = ({ show, level }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              🏆
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Seviye Atladın!</h2>
            <p className="text-xl text-gray-600 mb-4">Seviye {level}</p>
            <div className="text-lg text-gray-700">
              Tebrikler! Yeni yetenekler kazandın! 🎉
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Achievement Modal
const AchievementModal = ({ achievement }) => {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {achievement.icon}
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Başarım Kazandın!</h2>
            <h3 className="text-xl font-semibold text-purple-600 mb-2">{achievement.title}</h3>
            <p className="text-gray-700 mb-4">{achievement.description}</p>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                +{achievement.xp} XP
              </div>
              <div className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                +{achievement.coins} Coin
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// XP Bar Component
export const XPBar = () => {
  const { gameData, getXPForLevel } = useGameSystem()
  const xpForNextLevel = getXPForLevel(gameData.level + 1)
  const progressPercentage = (gameData.xp / xpForNextLevel) * 100

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.href = '/game-stats'}
      className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        <div className="text-white font-bold text-sm">Lv.{gameData.level}</div>
        <div className="flex-1">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full"
              style={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-white/80 text-xs mt-1">
            {gameData.xp}/{xpForNextLevel} XP
          </div>
        </div>
        <div className="text-yellow-400 font-bold text-sm">
          💰 {gameData.coins}
        </div>
      </div>
    </motion.div>
  )
}

// Stats Display Component
export const StatsDisplay = () => {
  const { gameData } = useGameSystem()

  const stats = [
    { label: 'Beğeniler', value: gameData.stats.likes, icon: '❤️' },
    { label: 'Eşleşmeler', value: gameData.stats.matches, icon: '💖' },
    { label: 'Mesajlar', value: gameData.stats.messages, icon: '💬' },
    { label: 'Süper Beğeni', value: gameData.stats.superLikes, icon: '⭐' }
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default GameSystemProvider
