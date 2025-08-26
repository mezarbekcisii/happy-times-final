import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// AI Compatibility Calculator
export const calculateCompatibility = (user1, user2) => {
  let score = 0
  let breakdown = {
    interests: 0,
    age: 0,
    location: 0,
    lifestyle: 0,
    personality: 0,
    music: 0,
    activity: 0
  }

  // Interest compatibility (0-25 points)
  if (user1.interests && user2.interests) {
    const commonInterests = user1.interests.filter(interest => 
      user2.interests.some(i => i.toLowerCase().includes(interest.toLowerCase().slice(1).trim()))
    ).length
    const interestScore = Math.min((commonInterests / Math.max(user1.interests.length, user2.interests.length)) * 25, 25)
    breakdown.interests = Math.round(interestScore)
    score += interestScore
  }

  // Age compatibility (0-20 points)
  const ageDiff = Math.abs(user1.age - user2.age)
  let ageScore = 20
  if (ageDiff <= 2) ageScore = 20
  else if (ageDiff <= 5) ageScore = 15
  else if (ageDiff <= 8) ageScore = 10
  else if (ageDiff <= 12) ageScore = 5
  else ageScore = 0
  breakdown.age = ageScore
  score += ageScore

  // Location compatibility (0-15 points)
  if (user1.distance !== undefined) {
    const distance = parseFloat(user1.distance)
    let locationScore = 15
    if (distance <= 1) locationScore = 15
    else if (distance <= 3) locationScore = 12
    else if (distance <= 5) locationScore = 8
    else if (distance <= 10) locationScore = 4
    else locationScore = 0
    breakdown.location = locationScore
    score += locationScore
  }

  // Lifestyle compatibility (0-15 points)
  let lifestyleScore = 10 // Base score
  if (user1.drinking && user2.drinking) {
    if (user1.drinking === user2.drinking) lifestyleScore += 3
  }
  if (user1.smoking && user2.smoking) {
    if (user1.smoking === user2.smoking) lifestyleScore += 2
  }
  breakdown.lifestyle = Math.min(lifestyleScore, 15)
  score += breakdown.lifestyle

  // Personality compatibility (0-10 points)
  // Simulated based on profile completeness and activity
  const personalityScore = Math.min(
    (user1.bio ? 5 : 0) + (user2.bio ? 5 : 0), 10
  )
  breakdown.personality = personalityScore
  score += personalityScore

  // Music compatibility (0-10 points)
  if (user1.musicTaste && user2.musicTaste) {
    const musicScore = user1.musicTaste === user2.musicTaste ? 10 : 
                      (user1.musicTaste.includes(user2.musicTaste.split(' ')[0]) ? 6 : 3)
    breakdown.music = musicScore
    score += musicScore
  } else {
    breakdown.music = 5 // Neutral if no music data
    score += 5
  }

  // Activity compatibility (0-5 points)
  if (user1.online && user2.online) {
    breakdown.activity = 5
    score += 5
  } else if (user1.online || user2.online) {
    breakdown.activity = 3
    score += 3
  } else {
    breakdown.activity = 1
    score += 1
  }

  return {
    total: Math.round(Math.min(score, 100)),
    breakdown
  }
}

// Compatibility Score Display Component
export const CompatibilityScore = ({ user1, user2, showBreakdown = false }) => {
  const [compatibility, setCompatibility] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const result = calculateCompatibility(user1, user2)
    setCompatibility(result)
  }, [user1, user2])

  if (!compatibility) return null

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-600'
    if (score >= 80) return 'from-blue-500 to-cyan-500'
    if (score >= 70) return 'from-yellow-500 to-orange-500'
    if (score >= 60) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-500'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Mükemmel Uyum'
    if (score >= 80) return 'Yüksek Uyumluluk'
    if (score >= 70) return 'İyi Uyumluluk'
    if (score >= 60) return 'Orta Uyumluluk'
    return 'Düşük Uyumluluk'
  }

  const getScoreEmoji = (score) => {
    if (score >= 90) return '💯'
    if (score >= 80) return '🔥'
    if (score >= 70) return '✨'
    if (score >= 60) return '👍'
    return '🤔'
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getScoreEmoji(compatibility.total)}</span>
          <span className="text-white font-bold">AI Uyumluluk</span>
        </div>
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="text-white/60 hover:text-white text-sm"
        >
          {showDetail ? 'Gizle' : 'Detay'}
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-3">
        <div className="flex-1">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(compatibility.total)}`}
              style={{ width: `${compatibility.total}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${compatibility.total}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="text-white font-bold text-xl">
          %{compatibility.total}
        </div>
      </div>

      <div className="text-white/80 text-sm text-center">
        {getScoreLabel(compatibility.total)}
      </div>

      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/20"
          >
            <div className="space-y-2">
              <DetailItem label="İlgi Alanları" score={compatibility.breakdown.interests} max={25} />
              <DetailItem label="Yaş Uyumu" score={compatibility.breakdown.age} max={20} />
              <DetailItem label="Konum" score={compatibility.breakdown.location} max={15} />
              <DetailItem label="Yaşam Tarzı" score={compatibility.breakdown.lifestyle} max={15} />
              <DetailItem label="Kişilik" score={compatibility.breakdown.personality} max={10} />
              <DetailItem label="Müzik" score={compatibility.breakdown.music} max={10} />
              <DetailItem label="Aktivite" score={compatibility.breakdown.activity} max={5} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Detail Item Component
const DetailItem = ({ label, score, max }) => {
  const percentage = (score / max) * 100
  
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/80">{label}</span>
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-white/20 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-full bg-white/80 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-white/80 text-xs w-8 text-right">{score}/{max}</span>
      </div>
    </div>
  )
}

// AI Insights Component
export const AIInsights = ({ user1, user2 }) => {
  const [insights, setInsights] = useState([])
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0)

  useEffect(() => {
    const compatibility = calculateCompatibility(user1, user2)
    const generatedInsights = generateInsights(user1, user2, compatibility)
    setInsights(generatedInsights)
  }, [user1, user2])

  useEffect(() => {
    if (insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsightIndex((prev) => (prev + 1) % insights.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [insights.length])

  const generateInsights = (u1, u2, compatibility) => {
    const insights = []
    
    if (compatibility.breakdown.interests >= 15) {
      insights.push({
        icon: '🎯',
        text: 'Ortak ilgi alanlarınız çok fazla! Sohbet konularınız bitmez.',
        type: 'positive'
      })
    }
    
    if (compatibility.breakdown.age >= 15) {
      insights.push({
        icon: '🎂',
        text: 'Yaş uyumunuz mükemmel. Benzer yaşam deneyimleriniz var.',
        type: 'positive'
      })
    }
    
    if (compatibility.breakdown.location >= 12) {
      insights.push({
        icon: '📍',
        text: 'Yakın mesafede yaşıyorsunuz. Buluşmanız kolay olacak!',
        type: 'positive'
      })
    }
    
    if (compatibility.breakdown.music >= 8) {
      insights.push({
        icon: '🎵',
        text: 'Müzik zevkiniz benzer. Birlikte konserlere gidebilirsiniz!',
        type: 'positive'
      })
    }
    
    if (compatibility.total >= 85) {
      insights.push({
        icon: '💫',
        text: 'AI analizi: Bu kişi sizin için neredeyse mükemmel bir eş!',
        type: 'special'
      })
    } else if (compatibility.total >= 70) {
      insights.push({
        icon: '🌟',
        text: 'AI önerisi: Bu kişiyle tanışmaya değer!',
        type: 'positive'
      })
    }
    
    if (compatibility.breakdown.lifestyle >= 12) {
      insights.push({
        icon: '🎭',
        text: 'Yaşam tarzınız benzer. Uyumlu bir ilişki yaşayabilirsiniz.',
        type: 'positive'
      })
    }
    
    if (u1.online && u2.online) {
      insights.push({
        icon: '🟢',
        text: 'İkiniz de aktif! Hemen sohbet başlatabilirsiniz.',
        type: 'action'
      })
    }

    // Fallback insight
    if (insights.length === 0) {
      insights.push({
        icon: '🤖',
        text: 'AI analizi devam ediyor... Daha fazla etkileşim için profil tamamlayın.',
        type: 'neutral'
      })
    }
    
    return insights
  }

  if (insights.length === 0) return null

  const currentInsight = insights[currentInsightIndex]

  const getInsightStyle = (type) => {
    switch (type) {
      case 'positive':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300'
      case 'special':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300'
      case 'action':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300'
      default:
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300'
    }
  }

  return (
    <motion.div
      key={currentInsightIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r ${getInsightStyle(currentInsight.type)} backdrop-blur-sm rounded-xl p-4 border`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{currentInsight.icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium">{currentInsight.text}</p>
          {insights.length > 1 && (
            <div className="flex space-x-1 mt-2">
              {insights.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentInsightIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Smart Recommendations Component
export const SmartRecommendations = ({ currentUser, users }) => {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    // Calculate compatibility for all users and sort by score
    const userCompatibility = users.map(user => ({
      ...user,
      compatibility: calculateCompatibility(currentUser, user)
    }))

    // Sort by compatibility score and take top recommendations
    const sorted = userCompatibility
      .sort((a, b) => b.compatibility.total - a.compatibility.total)
      .slice(0, 5)

    setRecommendations(sorted)
  }, [currentUser, users])

  return (
    <div className="space-y-4">
      <h3 className="text-white font-bold text-lg">🎯 AI Önerileri</h3>
      {recommendations.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">{user.name}</h4>
              <p className="text-white/70 text-sm">{user.age} yaşında • {user.distance || '5 km'}</p>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">%{user.compatibility.total}</div>
              <div className="text-white/60 text-xs">uyumluluk</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default {
  calculateCompatibility,
  CompatibilityScore,
  AIInsights,
  SmartRecommendations
}

