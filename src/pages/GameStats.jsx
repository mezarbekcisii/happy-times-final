import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameSystem, StatsDisplay } from '../components/GameSystem'

const GameStats = () => {
  const { gameData, achievements, getXPForLevel } = useGameSystem()
  const navigate = useNavigate()

  const unlockedAchievements = achievements.filter(a => gameData.achievements.includes(a.id))
  const lockedAchievements = achievements.filter(a => !gameData.achievements.includes(a.id))
  const completionPercentage = (unlockedAchievements.length / achievements.length) * 100

  const levelProgress = (gameData.xp / getXPForLevel(gameData.level + 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  🏆 Oyun İstatistikleri
                </h1>
                <p className="text-white/70">Seviye {gameData.level} • {gameData.totalXP} Toplam XP</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">💰 {gameData.coins}</div>
              <div className="text-sm text-white/70">Coin</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-white mb-2">Lv. {gameData.level}</div>
            <div className="text-white/80">Mevcut Seviye</div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-white/80 text-sm mb-2">
              <span>{gameData.xp} XP</span>
              <span>{getXPForLevel(gameData.level + 1)} XP</span>
            </div>
            <div className="bg-white/20 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 h-full rounded-full"
                style={{ width: `${levelProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          
          <div className="text-center text-white/80">
            Sonraki seviye için {getXPForLevel(gameData.level + 1) - gameData.xp} XP kaldı
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📊 Detaylı İstatistikler</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">❤️</div>
              <div className="text-3xl font-bold text-white">{gameData.stats.likes}</div>
              <div className="text-white/70">Beğeniler</div>
            </div>
            
            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">💖</div>
              <div className="text-3xl font-bold text-white">{gameData.stats.matches}</div>
              <div className="text-white/70">Eşleşmeler</div>
            </div>
            
            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-white">{gameData.stats.superLikes}</div>
              <div className="text-white/70">Süper Beğeni</div>
            </div>
            
            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">💬</div>
              <div className="text-3xl font-bold text-white">{gameData.stats.messages}</div>
              <div className="text-white/70">Mesajlar</div>
            </div>
            
            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">👁️</div>
              <div className="text-3xl font-bold text-white">{gameData.stats.profileViews}</div>
              <div className="text-white/70">Profil Görüntüleme</div>
            </div>
            
            <div className="text-center bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-white">{gameData.streak}</div>
              <div className="text-white/70">Günlük Seri</div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">🏆 Başarımlar</h2>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="text-white font-bold">
                {unlockedAchievements.length}/{achievements.length} ({Math.round(completionPercentage)}%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-blue-400 h-full rounded-full"
                style={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">✅ Kazanılan Başarımlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unlockedAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{achievement.title}</h4>
                        <p className="text-white/70 text-sm">{achievement.description}</p>
                        <div className="flex space-x-2 mt-2">
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                            +{achievement.xp} XP
                          </span>
                          <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">
                            +{achievement.coins} Coin
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">🔒 Kilidli Başarımlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lockedAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 opacity-60"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl filter grayscale">🔒</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">???</h4>
                        <p className="text-white/50 text-sm">Bu başarımı açmak için devam edin</p>
                        <div className="flex space-x-2 mt-2">
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">
                            +{achievement.xp} XP
                          </span>
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">
                            +{achievement.coins} Coin
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Daily Login Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-4">🎁 Günlük Bonus</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-2">Günlük giriş yaparak bonus kazan!</p>
              <p className="text-lg font-bold text-white">Mevcut seri: {gameData.streak} gün</p>
              <p className="text-sm text-white/60">En uzun seri: {gameData.maxStreak} gün</p>
            </div>
            <button
              onClick={() => {
                // Simulated daily login
                alert('Günlük bonus alındı! +10 XP, +5 Coin')
              }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
            >
              Bonus Al
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GameStats

