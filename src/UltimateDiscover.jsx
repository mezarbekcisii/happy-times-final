import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import SpotifyPlayer from './components/SpotifyPlayer'
import ParticleEffect, { FloatingHearts, ConfettiExplosion, MagicSparkles } from './components/ParticleEffect'
import { useGameSystem, XPBar } from './components/GameSystem'
import { CompatibilityScore, AIInsights } from './components/AICompatibility'
import { useTheme } from './contexts/ThemeContext'
import { useLanguage } from './contexts/LanguageContext'
import { 
  RippleButton, 
  LoadingSpinner, 
  BounceElement, 
  FadeIn, 
  Toast, 
  HoverCard,
  FloatingActionButton 
} from './components/MicroInteractions'
import { useToast } from './hooks/useToast'

const UltimateDiscover = () => {
  const { gameActions } = useGameSystem()
  const { colors, theme } = useTheme()
  const { t } = useLanguage()
  const { toasts, showSuccess, showError, showInfo, hideToast } = useToast()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showStoryViewer, setShowStoryViewer] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showBoost, setShowBoost] = useState(false)
  const [showSuperLike, setShowSuperLike] = useState(false)
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [particleEffect, setParticleEffect] = useState({ type: null, active: false })
  const [showFloatingHearts, setShowFloatingHearts] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const cardRef = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0])

  // Gelişmiş profil verileri
  const profiles = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      location: 'Beşiktaş, İstanbul',
      distance: '2 km',
      images: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop'
      ],
      bio: 'Sanat ve müzik tutkunu. Kahve içmeyi ve yeni yerler keşfetmeyi seviyorum. Yaşamın güzel anlarını paylaşmayı seven pozitif biriyim 🎨☕✨',
      interests: ['🎨 Sanat', '🎵 Müzik', '📚 Kitap', '☕ Kahve', '🌍 Seyahat', '📸 Fotoğraf'],
      job: 'Grafik Tasarımcı',
      education: 'Mimar Sinan Güzel Sanatlar Üniversitesi',
      height: '168 cm',
      zodiac: '♋ Yengeç',
      drinking: 'Ara sıra',
      smoking: 'İçmem',
      pets: '🐱 Kedi sevgisi',
      languages: ['Türkçe', 'İngilizce', 'Fransızca'],
      verified: true,
      premium: 'gold',
      online: true,
      lastSeen: 'Az önce',
      mutualFriends: 3,
      mutualInterests: 5,
      instagram: '@elifart26',
      spotify: 'Dinliyor: Indie Pop',
      anthem: 'Billie Eilish - bad guy',
      musicTaste: 'Indie Pop',
      songs: [
        {
          id: 1,
          title: 'bad guy',
          artist: 'Billie Eilish',
          album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
          albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
          duration: 194
        },
        {
          id: 2,
          title: 'Sunflower',
          artist: 'Post Malone, Swae Lee',
          album: 'Spider-Man: Into the Spider-Verse',
          albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300',
          duration: 158
        }
      ],
      stories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', time: '2h' },
        { id: 2, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', time: '5h' }
      ]
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      location: 'Çankaya, Ankara',
      distance: '5 km',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=700&fit=crop'
      ],
      bio: 'Doktor ve spor sevdalısı. Yeni maceralar arıyorum. Hayatı dolu dolu yaşamayı seven aktif biriyim 🏥⚽🌟',
      interests: ['⚽ Spor', '🏥 Tıp', '🌍 Seyahat', '📖 Okuma', '🏃‍♂️ Koşu', '🏔️ Dağcılık'],
      job: 'Doktor',
      education: 'Hacettepe Üniversitesi Tıp Fakültesi',
      height: '185 cm',
      zodiac: '♌ Aslan',
      drinking: 'Sosyal ortamlarda',
      smoking: 'İçmem',
      pets: '🐕 Köpek sahibi',
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      verified: true,
      premium: 'platinum',
      online: false,
      lastSeen: '30 dk önce',
      mutualFriends: 7,
      mutualInterests: 3,
      instagram: '@dr_mehmet',
      spotify: 'Dinliyor: Rock',
      anthem: 'Queen - Don\'t Stop Me Now',
      musicTaste: 'Rock',
      songs: [
        {
          id: 1,
          title: 'Don\'t Stop Me Now',
          artist: 'Queen',
          album: 'Jazz',
          albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300',
          duration: 209
        }
      ],
      stories: []
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      age: 24,
      location: 'Konak, İzmir',
      distance: '1 km',
      images: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=700&fit=crop'
      ],
      bio: 'Yoga eğitmeni ve doğa aşığı. Pozitif enerji arıyorum. Mindfulness ve sağlıklı yaşam tarzı benim tutkum 🧘‍♀️🌱💫',
      interests: ['🧘 Yoga', '🌱 Doğa', '📖 Felsefe', '🍃 Meditasyon', '🥗 Sağlıklı beslenme', '🌅 Gün doğumu'],
      job: 'Yoga Eğitmeni',
      education: 'Ege Üniversitesi Spor Bilimleri',
      height: '172 cm',
      zodiac: '♍ Başak',
      drinking: 'İçmem',
      smoking: 'İçmem',
      pets: 'Hayvan dostu',
      languages: ['Türkçe', 'İngilizce', 'Sanskrit'],
      verified: true,
      premium: 'silver',
      online: true,
      lastSeen: 'Şu anda aktif',
      mutualFriends: 12,
      mutualInterests: 8,
      instagram: '@zenyoga24',
      spotify: 'Dinliyor: Ambient',
      anthem: 'Bon Iver - Holocene',
      musicTaste: 'Ambient',
      songs: [
        {
          id: 1,
          title: 'Holocene',
          artist: 'Bon Iver',
          album: 'Bon Iver, Bon Iver',
          albumArt: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
          duration: 337
        }
      ],
      stories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', time: '1h' }
      ]
    }
  ]

  // Stories verisi
  const stories = [
    { 
      id: 1, 
      name: 'Hikaye Ekle', 
      avatar: null, 
      type: 'add',
      gradient: 'from-purple-400 to-pink-600'
    },
    { 
      id: 2, 
      name: 'Elif', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60', 
      viewed: false,
      stories: profiles[0].stories,
      gradient: 'from-pink-500 via-red-500 to-yellow-500'
    },
    { 
      id: 3, 
      name: 'Mehmet', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60', 
      viewed: true,
      stories: profiles[1].stories,
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      id: 4, 
      name: 'Zeynep', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60', 
      viewed: false,
      stories: profiles[2].stories,
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      id: 5, 
      name: 'Ayşe', 
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60', 
      viewed: false,
      stories: [{ id: 1, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', time: '3h' }],
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 6, 
      name: 'Can', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60', 
      viewed: true,
      stories: [],
      gradient: 'from-indigo-500 to-purple-600'
    }
  ]

  // Current user data (simulated)
  const currentUser = {
    id: 'me',
    name: 'Sen',
    age: 25,
    interests: ['🎨 Sanat', '☕ Kahve', '📚 Kitap', '🎵 Müzik'],
    drinking: 'Ara sıra',
    smoking: 'İçmem',
    musicTaste: 'Indie Pop',
    online: true,
    bio: 'Yaratıcı ruhlu, sanat ve müzik sevdalısı biriyim.',
    distance: 0
  }

  const currentProfile = profiles[currentIndex]

  // Mobile Swipe Handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isDragging && !showProfileDetails) {
        handlePass()
      }
    },
    onSwipedRight: () => {
      if (!isDragging && !showProfileDetails) {
        handleLike()
      }
    },
    onSwipedUp: () => {
      if (!isDragging && !showProfileDetails) {
        handleSuperLike()
      }
    },
    onSwipedDown: () => {
      if (!isDragging && !showProfileDetails) {
        setShowProfileDetails(true)
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  // Drag handlers
  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    const threshold = 100
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handleLike()
      } else {
        handlePass()
      }
    } else {
      // Snap back
      x.set(0)
      y.set(0)
    }
  }

  const handleLike = () => {
    setIsLoading(true)
    setSwipeDirection('right')
    setParticleEffect({ type: 'like', active: true })
    setShowFloatingHearts(true)
    x.set(300)
    
    // Game system - add like
    gameActions.like()
    
    // Check for match (simulate 30% chance)
    const isMatch = Math.random() < 0.3
    if (isMatch) {
      setTimeout(() => {
        setShowConfetti(true)
        setParticleEffect({ type: 'match', active: true })
        gameActions.match() // Game system - add match
        showSuccess(t('discover.notifications.matched'))
      }, 500)
    } else {
      showInfo(t('discover.notifications.liked'))
    }
    
    setTimeout(() => {
      console.log('Beğenildi:', currentProfile.name)
      nextProfile()
      resetCard()
      setShowFloatingHearts(false)
      setShowConfetti(false)
      setIsLoading(false)
    }, isMatch ? 2000 : 800)
  }

  const handlePass = () => {
    setSwipeDirection('left')
    setParticleEffect({ type: 'pass', active: true })
    x.set(-300)
    showInfo(t('discover.notifications.passed'))
    setTimeout(() => {
      console.log('Geçildi:', currentProfile.name)
      nextProfile()
      resetCard()
    }, 600)
  }

  const handleSuperLike = () => {
    setShowSuperLike(true)
    setParticleEffect({ type: 'superlike', active: true })
    setShowSparkles(true)
    y.set(-300)
    
    // Game system - add super like
    gameActions.superLike()
    showSuccess(t('discover.notifications.superLiked'))
    
    setTimeout(() => {
      console.log('Süper beğenildi:', currentProfile.name)
      nextProfile()
      resetCard()
      setShowSuperLike(false)
      setShowSparkles(false)
    }, 1500)
  }

  const resetCard = () => {
    setSwipeDirection(null)
    setParticleEffect({ type: null, active: false })
    x.set(0)
    y.set(0)
    setCurrentImageIndex(0)
  }

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
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
    if (premium === 'platinum') return { text: '💎 PLATINUM', color: 'bg-gradient-to-r from-purple-600 to-pink-600', textColor: 'text-white' }
    if (premium === 'gold') return { text: '👑 GOLD', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', textColor: 'text-white' }
    if (premium === 'silver') return { text: '🥈 SILVER', color: 'bg-gradient-to-r from-gray-400 to-gray-500', textColor: 'text-white' }
    return null
  }

  const handleStoryClick = (story) => {
    if (story.type !== 'add' && story.stories.length > 0) {
      setSelectedStory(story)
      setShowStoryViewer(true)
    }
  }

  // Spotify handlers
  const handleSpotifyClick = () => {
    if (currentProfile.songs && currentProfile.songs.length > 0) {
      setCurrentSong(currentProfile.songs[0])
      setShowSpotifyPlayer(true)
      setIsPlaying(true)
    }
  }

  // Track profile view when component mounts
  useEffect(() => {
    gameActions.profileView()
  }, [currentIndex])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNextSong = () => {
    if (currentProfile.songs && currentSong) {
      const currentIndex = currentProfile.songs.findIndex(song => song.id === currentSong.id)
      const nextIndex = (currentIndex + 1) % currentProfile.songs.length
      setCurrentSong(currentProfile.songs[nextIndex])
    }
  }

  const handlePrevSong = () => {
    if (currentProfile.songs && currentSong) {
      const currentIndex = currentProfile.songs.findIndex(song => song.id === currentSong.id)
      const prevIndex = currentIndex === 0 ? currentProfile.songs.length - 1 : currentIndex - 1
      setCurrentSong(currentProfile.songs[prevIndex])
    }
  }

  // Auto image progression
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging && !showProfileDetails) {
        nextImage()
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [currentImageIndex, isDragging, showProfileDetails])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Happy Couples Background Images */}
      <div className="absolute inset-0 opacity-8">
        {/* Multiple happy couple images */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full overflow-hidden blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop&crop=faces"
            alt="Happy couple 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-40 right-20 w-28 h-28 rounded-full overflow-hidden blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=200&fit=crop&crop=faces"
            alt="Happy couple 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 rounded-full overflow-hidden blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=200&h=200&fit=crop&crop=faces"
            alt="Happy couple 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-20 right-1/3 w-30 h-30 rounded-full overflow-hidden blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=200&h=200&fit=crop&crop=faces"
            alt="Happy couple 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-60 left-1/2 w-24 h-24 rounded-full overflow-hidden blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1521331493702-7d8f2597b0d0?w=200&h=200&fit=crop&crop=faces"
            alt="Happy couple 5"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Love Pattern Overlay */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff69b4' fill-opacity='0.1'%3E%3Cpath d='M30 30c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-20c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-50 bg-white/95 backdrop-blur-lg shadow-sm sticky top-0">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">🔥</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                {t('discover.title')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <XPBar />
              <button 
                onClick={() => window.location.href = '/location'}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📍 Konum
              </button>
              <button 
                onClick={() => window.location.href = '/ai-insights'}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🤖 AI
              </button>
              <button 
                onClick={() => {
                  setShowBoost(true)
                  setParticleEffect({ type: 'boost', active: true })
                  setShowSparkles(true)
                  setTimeout(() => {
                    setShowBoost(false)
                    setShowSparkles(false)
                  }, 2000)
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ⚡ Boost
              </button>
              <div className="text-white/80 text-sm font-medium">
                {currentIndex + 1}/{profiles.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Stories Bar */}
      <div className="relative z-40 max-w-lg mx-auto px-6 py-6">
        <div className={`${colors.glassEffect} rounded-3xl p-6 shadow-2xl`}>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
            {stories.map((story) => (
              <div 
                key={story.id} 
                className="flex-shrink-0 cursor-pointer text-center group"
                onClick={() => handleStoryClick(story)}
              >
                <div className="relative transform transition-all duration-300 group-hover:scale-110">
                  {story.type === 'add' ? (
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <span className="relative z-10">+</span>
                    </div>
                  ) : (
                    <div className={`w-20 h-20 rounded-full p-1 ${
                      story.viewed 
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600' 
                        : `bg-gradient-to-r ${story.gradient}`
                    } shadow-lg`}>
                      <div className="w-full h-full rounded-full p-0.5 bg-black">
                        <img
                          src={story.avatar}
                          alt={story.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      {!story.viewed && story.stories.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{story.stories.length}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-3 font-medium text-white/90 w-20 truncate">
                  {story.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="max-w-lg mx-auto px-6 mb-6">
        <AIInsights user1={currentUser} user2={currentProfile} />
      </div>

      {/* Ultra Advanced Profile Card */}
      <div className="relative z-30 max-w-md mx-auto px-6 pb-8">
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProfile.id}
              ref={cardRef}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ x, y, rotate, opacity }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.02 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              {...swipeHandlers}
            >
              <HoverCard hoverEffect="glow" className="h-full">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full relative">
                {/* Image Container */}
                <div className="relative h-4/5">
                  <img
                    src={currentProfile.images[currentImageIndex]}
                    alt={currentProfile.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Advanced Image Navigation */}
                  <div className="absolute inset-0 flex">
                    <button 
                      className="w-1/3 h-full z-10" 
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                    />
                    <button 
                      className="w-1/3 h-full z-10" 
                      onClick={() => setShowProfileDetails(!showProfileDetails)}
                    />
                    <button 
                      className="w-1/3 h-full z-10" 
                      onClick={nextImage}
                      disabled={currentImageIndex === currentProfile.images.length - 1}
                    />
                  </div>
                  
                  {/* Enhanced Image Indicators */}
                  <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
                    {currentProfile.images.map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white shadow-lg' 
                            : index < currentImageIndex 
                              ? 'bg-white/70' 
                              : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Premium Badges & Status */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                    {currentProfile.spotify && (
                      <button
                        onClick={handleSpotifyClick}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 border border-green-300"
                      >
                        <span>🎵</span>
                        <span>Spotify</span>
                      </button>
                    )}
                    {currentProfile.online && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Online</span>
                      </div>
                    )}
                    {currentProfile.verified && (
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                        <span>✓</span>
                        <span>Doğrulanmış</span>
                      </div>
                    )}
                    {getMembershipBadge(currentProfile.premium) && (
                      <div className={`${getMembershipBadge(currentProfile.premium).color} ${getMembershipBadge(currentProfile.premium).textColor} px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                        {getMembershipBadge(currentProfile.premium).text}
                      </div>
                    )}
                  </div>

                  {/* Mutual Connections */}
                  <div className="absolute top-4 left-4 z-20">
                    {currentProfile.mutualFriends > 0 && (
                      <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        👥 {currentProfile.mutualFriends} ortak arkadaş
                      </div>
                    )}
                  </div>
                  
                  {/* Advanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Enhanced Profile Info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-3xl font-bold">
                        {currentProfile.name}
                      </h2>
                      <span className="text-2xl opacity-90">{currentProfile.age}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm opacity-90 mb-3">
                      <span className="flex items-center space-x-1">
                        <span>📍</span>
                        <span>{currentProfile.distance}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>💼</span>
                        <span>{currentProfile.job}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🎓</span>
                        <span>{currentProfile.height}</span>
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-3">
                      {currentProfile.instagram && (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs font-medium">
                          📷 Instagram
                        </div>
                      )}
                      {currentProfile.spotify && (
                        <button
                          onClick={handleSpotifyClick}
                          className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-full text-sm font-bold text-white hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg border-2 border-green-300"
                        >
                          🎵 Müzik Çal
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Swipe Direction Indicators */}
                  <AnimatePresence>
                    {swipeDirection && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`absolute inset-0 flex items-center justify-center text-8xl z-30 ${
                          swipeDirection === 'right' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        <div className="bg-white/90 rounded-full p-4 shadow-2xl">
                          {swipeDirection === 'right' ? '❤️' : '✖️'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Super Like Animation */}
                  <AnimatePresence>
                    {showSuperLike && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: -50 }}
                        className="absolute inset-0 flex items-center justify-center text-8xl z-30"
                      >
                        <div className="bg-blue-500 text-white rounded-full p-4 shadow-2xl">
                          ⭐
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* AI Compatibility Panel */}
                <div className="p-6 h-1/5 bg-gradient-to-r from-purple-50 to-pink-50">
                  <CompatibilityScore 
                    user1={currentUser} 
                    user2={currentProfile} 
                    showBreakdown={false}
                  />
                </div>
              </div>
              </HoverCard>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Ultra Advanced Action Buttons with Micro-interactions */}
        <div className="flex justify-center items-center space-x-6 mt-8">
          <BounceElement trigger={swipeDirection === 'left'}>
            <RippleButton
              onClick={handlePass}
              className="w-16 h-16 rounded-full text-2xl"
              variant="danger"
              disabled={isLoading}
            >
              <span className="relative z-10">✖️</span>
            </RippleButton>
          </BounceElement>
          
          <BounceElement trigger={showSuperLike}>
            <RippleButton
              onClick={handleSuperLike}
              className="w-14 h-14 rounded-full text-xl bg-gradient-to-r from-blue-500 to-blue-600"
              disabled={isLoading}
            >
              <span className="relative z-10">⭐</span>
            </RippleButton>
          </BounceElement>
          
          <BounceElement trigger={swipeDirection === 'right'}>
            <RippleButton
              onClick={handleLike}
              className="w-16 h-16 rounded-full text-2xl"
              variant="success"
              disabled={isLoading}
            >
              <span className="relative z-10">❤️</span>
            </RippleButton>
          </BounceElement>
        </div>

        {/* Enhanced Swipe Hint */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <p className="text-white/70 text-sm font-medium mb-2">
            {t('discover.swipeHint')}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/60 max-w-xs mx-auto">
            <div className="bg-black/20 rounded-lg p-2">
              <span>{t('discover.swipeDirections.left')}</span>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <span>{t('discover.swipeDirections.right')}</span>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <span>{t('discover.swipeDirections.up')}</span>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <span>{t('discover.swipeDirections.down')}</span>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-2">
            Hem mouse hem de touch destekli
          </p>
        </motion.div>
      </div>

      {/* Enhanced Profile Details Modal */}
      <AnimatePresence>
        {showProfileDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-4"
            onClick={() => setShowProfileDetails(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentProfile.name} Hakkında
                  </h3>
                  <button 
                    onClick={() => setShowProfileDetails(false)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Biyografi</h4>
                  <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
                </div>

                {/* Detailed Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-600 text-sm">Eğitim</h5>
                    <p className="text-gray-900 font-medium">{currentProfile.education}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600 text-sm">Boy</h5>
                    <p className="text-gray-900 font-medium">{currentProfile.height}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600 text-sm">Burç</h5>
                    <p className="text-gray-900 font-medium">{currentProfile.zodiac}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600 text-sm">İçki</h5>
                    <p className="text-gray-900 font-medium">{currentProfile.drinking}</p>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">İlgi Alanları</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium border border-purple-200"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Konuştuğu Diller</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Music */}
                {currentProfile.anthem && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Anthem</h4>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                        🎵
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{currentProfile.anthem}</p>
                        <p className="text-sm text-gray-600">{currentProfile.spotify}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {showStoryViewer && selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setShowStoryViewer(false)}
          >
            {/* Story content would go here */}
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-4">{selectedStory.name}'in Hikayeleri</h3>
              <p>Story viewer implementasyonu buraya gelecek</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotify Player Modal */}
      <AnimatePresence>
        {showSpotifyPlayer && currentSong && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
          >
            <SpotifyPlayer
              song={currentSong.title}
              artist={currentSong.artist}
              albumArt={currentSong.albumArt}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
            />
            <button
              onClick={() => setShowSpotifyPlayer(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-400 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Spotify Widget */}
      <AnimatePresence>
        {showSpotifyPlayer && currentSong && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-20 left-4 z-40 max-w-xs"
          >
            <SpotifyPlayer
              song={currentSong.title}
              artist={currentSong.artist}
              albumArt={currentSong.albumArt}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              compact={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Effects */}
      <ParticleEffect 
        type={particleEffect.type} 
        isActive={particleEffect.active}
        onComplete={() => setParticleEffect({ type: null, active: false })}
      />
      
      {/* Floating Hearts */}
      <FloatingHearts isActive={showFloatingHearts} />
      
      {/* Confetti Explosion */}
      <ConfettiExplosion isActive={showConfetti} />
      
      {/* Magic Sparkles */}
      <MagicSparkles isActive={showSparkles} />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" color="primary" />
            <p className="text-gray-700 font-medium">{t('discover.loading')}</p>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => setShowBoost(true)}
        position="bottom-right"
        className="animate-pulse"
      >
        🚀
      </FloatingActionButton>
    </div>
  )
}

export default UltimateDiscover
