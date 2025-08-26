import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaCamera, FaHeart, FaComments, FaEye, FaCog, FaSignOutAlt, FaSmile, FaStar, FaMapMarkerAlt, FaPlus, FaTrash, FaTimes, FaSave } from 'react-icons/fa'
import Logo from '../components/Logo'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    interests: []
  })
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  // Mock user data
  const user = {
    name: 'Ayşe Güneş',
    age: 24,
    location: 'İstanbul, Türkiye',
    bio: '🌟 HappyTime ailesinin mutlu bir üyesi! Gülmek, eğlenmek ve yeni dostluklar kurmak hayat felsefem. ☀️',
    interests: ['😊 Gülmek', '🎵 Müzik', '🌍 Seyahat', '📚 Kitap', '🎨 Sanat', '☕ Kahve'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300'
    ],
    stats: {
      profileViews: 324,
      likes: 156,
      matches: 47
    },
    completionPercentage: 85,
    happinessScore: 95
  }

  // Profil tamamlama adımları
  const profileSteps = [
    {
      id: 'basic_info',
      title: 'Temel Bilgiler',
      description: 'İsim, yaş ve konum bilgileri',
      completed: !!(user.name && user.age && user.location),
      points: 20,
      icon: '👤',
      tip: 'Gerçek bilgilerinizi kullanın, güven çok önemli!'
    },
    {
      id: 'bio',
      title: 'Hakkımda',
      description: 'Kişisel tanıtım yazısı',
      completed: !!(user.bio && user.bio.length >= 50),
      points: 20,
      icon: '💭',
      tip: 'En az 50 karakter yazın, kendinizi tanıtın!'
    },
    {
      id: 'interests',
      title: 'İlgi Alanları',
      description: 'En az 4 ilgi alanı seçin',
      completed: user.interests.length >= 4,
      points: 15,
      icon: '🎯',
      tip: 'Ortak ilgi alanları daha çok eşleşme sağlar!'
    },
    {
      id: 'photos',
      title: 'Fotoğraflar',
      description: 'En az 3 fotoğraf yükleyin',
      completed: user.photos.length >= 3,
      points: 25,
      icon: '📸',
      tip: 'Güzel fotoğraflar profil görüntülenmelerini artırır!'
    },
    {
      id: 'avatar',
      title: 'Profil Fotoğrafı',
      description: 'Profil fotoğrafınızı ayarlayın',
      completed: !!user.avatar,
      points: 10,
      icon: '🖼️',
      tip: 'Net ve gülümseyen bir profil fotoğrafı tercih edin!'
    },
    {
      id: 'verification',
      title: 'Hesap Doğrulama',
      description: 'E-posta doğrulaması yapın',
      completed: false, // Bu gerçek API'den gelecek
      points: 10,
      icon: '✅',
      tip: 'Doğrulanmış hesaplar daha güvenilir görünür!'
    }
  ]

  // Tamamlanan adımları hesapla
  const completedSteps = profileSteps.filter(step => step.completed)
  const totalPoints = profileSteps.reduce((sum, step) => sum + step.points, 0)
  const earnedPoints = completedSteps.reduce((sum, step) => sum + step.points, 0)
  const calculatedPercentage = Math.round((earnedPoints / totalPoints) * 100)

  // Premium üyelik sistemi
  const membershipLevels = {
    free: {
      name: 'Ücretsiz',
      icon: '🆓',
      color: 'gray',
      price: 0,
      period: '',
      gradient: 'from-gray-400 to-gray-500',
      bgGradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-300'
    },
    bronze: {
      name: 'Bronz',
      icon: '🥉',
      color: 'orange',
      price: 29.99,
      period: '/ay',
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-300',
      features: [
        'Günde 10 ek beğeni',
        'Kimler profilini görüntüledi?',
        'Reklamsız deneyim',
        'Mesajları öncelikli gönderme'
      ]
    },
    silver: {
      name: 'Gümüş',
      icon: '🥈',
      color: 'slate',
      price: 49.99,
      period: '/ay',
      gradient: 'from-slate-400 to-slate-600',
      bgGradient: 'from-slate-50 to-slate-100',
      borderColor: 'border-slate-300',
      features: [
        'Tüm Bronz özellikler',
        'Sınırsız beğeni',
        'Süper beğeni (5/gün)',
        'Geri alma özelliği',
        'Gelişmiş filtreler',
        'İnkognito mod'
      ]
    },
    gold: {
      name: 'Altın',
      icon: '🥇',
      color: 'yellow',
      price: 79.99,
      period: '/ay',
      gradient: 'from-yellow-400 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-300',
      features: [
        'Tüm Gümüş özellikler',
        'Boost özelliği (haftalık)',
        'Mesaj okuma onayı',
        'Profil ziyaretçi detayları',
        'VIP müşteri desteği',
        'Özel altın rozet'
      ]
    },
    platinum: {
      name: 'Platin',
      icon: '💎',
      color: 'purple',
      price: 129.99,
      period: '/ay',
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-300',
      features: [
        'Tüm Altın özellikler',
        'Sınırsız süper beğeni',
        'Günlük boost',
        'Öncelikli görünürlük',
        'Eksklüzif etkinlikler',
        'Kişisel dating koçu',
        'Platin crown rozeti'
      ]
    }
  }

  // Kullanıcının mevcut üyeliği (mock data)
  const currentMembership = 'silver' // Bu gerçek API'den gelecek

  const stories = [
    {
      id: 1,
      type: 'image',
      content: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200',
      timestamp: '2 saat önce',
      title: 'Kahve molası ☕'
    },
    {
      id: 2,
      type: 'text',
      content: 'HappyTime\'da bugün 5 yeni arkadaş edindim! 😊✨',
      timestamp: '1 gün önce',
      title: 'Mutlu Gün'
    },
    {
      id: 3,
      type: 'image', 
      content: 'https://images.unsplash.com/photo-1520637836862-4d197bd17043?w=200',
      timestamp: '2 gün önce',
      title: 'Doğa yürüyüşü 🌿'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const openEditModal = () => {
    setEditFormData({
      name: user.name,
      age: user.age,
      location: user.location,
      bio: user.bio,
      interests: user.interests
    })
    setIsEditModalOpen(true)
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestToggle = (interest) => {
    setEditFormData(prev => {
      const currentInterests = prev.interests
      if (currentInterests.includes(interest)) {
        return {
          ...prev,
          interests: currentInterests.filter(i => i !== interest)
        }
      } else if (currentInterests.length < 6) {
        return {
          ...prev,
          interests: [...currentInterests, interest]
        }
      }
      return prev // Don't add if already at max
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    // TODO: API call to update profile
    console.log('Updated profile:', editFormData)
    setIsEditModalOpen(false)
  }

  const handlePhotoUpload = async (files) => {
    if (!files || files.length === 0) return

    setUploadingPhoto(true)
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // TODO: Real API call to upload photo
      console.log('Photos uploaded:', files)
      
      setIsPhotoUploadOpen(false)
    } catch (error) {
      console.error('Photo upload failed:', error)
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      handlePhotoUpload(imageFiles)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handlePhotoUpload(files)
  }

  const renderProfileTab = () => (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Gelişmiş Profil Tamamlama */}
      <motion.div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">📈</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Profil Tamamlama</h3>
              <p className="text-sm text-gray-600">{earnedPoints}/{totalPoints} puan kazandın!</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-orange-600">{calculatedPercentage}%</span>
            <div className="text-xs text-gray-500">
              {completedSteps.length}/{profileSteps.length} adım
            </div>
          </div>
        </div>
        
        {/* Ana Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 h-4 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${calculatedPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {calculatedPercentage > 20 && (
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            )}
          </motion.div>
        </div>

        {/* Adım Detayları */}
        <div className="space-y-3 mb-4">
          {profileSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                step.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : step.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-medium ${
                      step.completed ? 'text-green-800' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      step.completed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      +{step.points} puan
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {!step.completed && (
                    <p className="text-xs text-blue-600 mt-1">💡 {step.tip}</p>
                  )}
                </div>
              </div>
              {step.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 1 }}
                  className="text-green-500"
                >
                  <FaSmile className="text-lg" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Teşvik Mesajları */}
        {calculatedPercentage < 100 ? (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🎯</span>
              <h4 className="font-semibold text-blue-800">Sonraki Hedef</h4>
            </div>
            {calculatedPercentage < 50 ? (
              <p className="text-blue-700 text-sm">
                Profilini %50'ye çıkar ve <strong>özel rozet</strong> kazan! 
                Daha çok görüntülenme ve eşleşme fırsatı seni bekliyor! 🌟
              </p>
            ) : calculatedPercentage < 80 ? (
              <p className="text-blue-700 text-sm">
                %80'e ulaş ve <strong>premium özellikler</strong> aç! 
                Süper beğeni ve öncelikli görünürlük kazanacaksın! ⭐
              </p>
            ) : (
              <p className="text-blue-700 text-sm">
                %100'e çok yakınsın! Tamamla ve <strong>altın üye</strong> ol! 
                HappyTime'ın en popüler kullanıcıları arasına katıl! 👑
              </p>
            )}
          </div>
        ) : (
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3, delay: 1.5 }}
            >
              <span className="text-4xl mb-2 block">🎉</span>
            </motion.div>
            <h4 className="font-bold text-green-800 text-lg mb-1">Tebrikler!</h4>
            <p className="text-green-700 text-sm">
              Profilin %100 tamamlandı! Artık HappyTime'ın altın üyesisin! 👑✨
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Profile Header */}
      <motion.div className="card p-6 bg-gradient-to-br from-white to-yellow-50" variants={itemVariants}>
        <div className="flex items-start space-x-6">
          <div className="relative">
            <motion.img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.button 
              className="absolute bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPhotoUploadOpen(true)}
            >
              <FaCamera className="text-sm" />
            </motion.button>
            
            {/* Premium Membership Badge */}
            {currentMembership !== 'free' && (
              <motion.div 
                className={`absolute -top-2 -left-2 bg-gradient-to-r ${membershipLevels[currentMembership].gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {membershipLevels[currentMembership].icon} {membershipLevels[currentMembership].name}
              </motion.div>
            )}

            {/* Happiness Score Badge */}
            <motion.div 
              className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              😊 {user.happinessScore}%
            </motion.div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                  {user.name}, {user.age}
                </h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <FaMapMarkerAlt className="mr-1 text-sm" />
                  <span>{user.location}</span>
                </div>
              </div>
              <motion.button 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openEditModal}
              >
                <FaEdit className="mr-2" />
                Profili Düzenle
              </motion.button>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{user.bio}</p>
            
            {/* Quick Actions */}
            <div className="flex space-x-3 mt-4">
              <motion.button 
                className="flex items-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <FaSmile className="mr-2" />
                Mutluluk Artırıcı
              </motion.button>
              <motion.button 
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentMembership !== 'free'
                    ? `bg-gradient-to-r ${membershipLevels[currentMembership].bgGradient} ${membershipLevels[currentMembership].borderColor} border text-gray-800`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab('premium')}
              >
                {currentMembership !== 'free' ? (
                  <>
                    {membershipLevels[currentMembership].icon}
                    <span className="ml-2">{membershipLevels[currentMembership].name} Üye</span>
                  </>
                ) : (
                  <>
                    <FaStar className="mr-2" />
                    Premium Ol
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats */}
      <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
        <motion.div 
          className="card p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -5 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaEye className="text-3xl text-blue-500 mx-auto mb-3" />
          </motion.div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{user.stats.profileViews}</div>
          <div className="text-sm text-gray-600">Profil Ziyareti</div>
          <div className="text-xs text-blue-600 mt-1">📈 +12 bugün</div>
        </motion.div>
        
        <motion.div 
          className="card p-6 text-center bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaHeart className="text-3xl text-red-500 mx-auto mb-3" />
          </motion.div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{user.stats.likes}</div>
          <div className="text-sm text-gray-600">❤️ Beğeni</div>
          <div className="text-xs text-red-600 mt-1">🔥 Popüler</div>
        </motion.div>
        
        <motion.div 
          className="card p-6 text-center bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -5 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <FaComments className="text-3xl text-green-500 mx-auto mb-3" />
          </motion.div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{user.stats.matches}</div>
          <div className="text-sm text-gray-600">💬 Eşleşme</div>
          <div className="text-xs text-green-600 mt-1">⭐ Süper!</div>
        </motion.div>
      </motion.div>

      {/* Interests */}
      <motion.div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50" variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">🎯 İlgi Alanlarım</h3>
          <motion.button 
            className="text-purple-600 hover:text-purple-700 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <FaPlus />
          </motion.button>
        </div>
        <div className="flex flex-wrap gap-3">
          {user.interests.map((interest, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {interest}
            </motion.span>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">💡 İlgi alanların ortak dostluklar kurmanı sağlar!</p>
      </motion.div>

      {/* Photos */}
      <motion.div className="card p-6" variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">📸 Fotoğraflarım</h3>
          <motion.button 
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPhotoUploadOpen(true)}
          >
            <FaPlus className="mr-2" />
            Fotoğraf Ekle
          </motion.button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user.photos.map((photo, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={photo}
                alt={`Fotoğraf ${index + 1}`}
                className="w-full h-40 object-cover rounded-xl shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-end justify-center pb-4">
                <div className="flex space-x-2">
                  <motion.button 
                    className="text-white bg-blue-500/80 p-2 rounded-full hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaEdit className="text-sm" />
                  </motion.button>
                  <motion.button 
                    className="text-white bg-red-500/80 p-2 rounded-full hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash className="text-sm" />
                  </motion.button>
                </div>
              </div>
              
              {/* Photo index badge */}
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-700">
                {index + 1}
              </div>
            </motion.div>
          ))}
          
          {/* Add Photo Placeholder */}
          <motion.div 
            className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsPhotoUploadOpen(true)}
          >
            <div className="text-center">
              <FaPlus className="text-3xl text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
              <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Fotoğraf Ekle</p>
            </div>
          </motion.div>
        </div>
        
        <p className="text-sm text-gray-600 mt-4 text-center">✨ En iyi fotoğraflarınla daha çok beğeni kazanın!</p>
      </motion.div>
    </motion.div>
  )

  const renderStoriesTab = () => (
    <div className="space-y-6">
      {/* Add Story */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hikaye Ekle</h3>
        <div className="flex space-x-4">
          <button className="flex-1 btn-primary">
            <FaCamera className="mr-2" />
            Fotoğraf Ekle
          </button>
          <button className="flex-1 btn-secondary">
            <FaEdit className="mr-2" />
            Metin Ekle
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hikayelerim</h3>
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              {story.type === 'image' ? (
                <img
                  src={story.content}
                  alt="Story"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FaEdit className="text-primary-500" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-gray-900">{story.content}</p>
                <p className="text-sm text-gray-500">{story.timestamp}</p>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Ayarları</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta Bildirimleri
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="ml-2 text-sm text-gray-700">Yeni mesaj bildirimleri</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="ml-2 text-sm text-gray-700">Eşleşme bildirimleri</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="ml-2 text-sm text-gray-700">Promosyon e-postaları</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gizlilik</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profil Görünürlüğü
            </label>
            <select className="input-field">
              <option>Herkes görebilir</option>
              <option>Sadece eşleşmeler</option>
              <option>Gizli</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="ml-2 text-sm text-gray-700">Konumumu göster</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap</h3>
        <div className="space-y-2">
          <button className="w-full text-left text-red-600 hover:text-red-700 py-2">
            <FaSignOutAlt className="inline mr-2" />
            Çıkış Yap
          </button>
          <button className="w-full text-left text-red-600 hover:text-red-700 py-2">
            Hesabı Sil
          </button>
        </div>
      </div>
    </div>
  )

  const renderPremiumTab = () => (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Mevcut Üyelik Durumu */}
      <motion.div 
        className={`card p-6 bg-gradient-to-r ${membershipLevels[currentMembership].bgGradient} border-2 ${membershipLevels[currentMembership].borderColor}`}
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${membershipLevels[currentMembership].gradient} rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}>
              {membershipLevels[currentMembership].icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {membershipLevels[currentMembership].name} Üye
              </h3>
              <p className="text-gray-600">
                {currentMembership === 'free' 
                  ? 'Ücretsiz plan kullanıyorsun' 
                  : `Aylık ${membershipLevels[currentMembership].price}₺`
                }
              </p>
            </div>
          </div>
          {currentMembership !== 'free' && (
            <motion.div
              className="text-right"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-sm text-gray-600">Sonraki ödeme</p>
                <p className="font-bold text-gray-900">15 Gün Sonra</p>
              </div>
            </motion.div>
          )}
        </div>
        
        {currentMembership !== 'free' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">🎉 Aktif Özellikleriniz:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {membershipLevels[currentMembership].features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-green-500">✅</span>
                  <span className="text-sm text-gray-800">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Üyelik Planları */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          💎 Premium Üyelik Planları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(membershipLevels).map(([key, level]) => {
            if (key === 'free') return null
            const isCurrentPlan = key === currentMembership
            const isUpgrade = Object.keys(membershipLevels).indexOf(key) > Object.keys(membershipLevels).indexOf(currentMembership)
            
            return (
              <motion.div
                key={key}
                className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 ${
                  isCurrentPlan 
                    ? `bg-gradient-to-b ${level.bgGradient} border-3 ${level.borderColor} shadow-xl` 
                    : 'bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300'
                }`}
                whileHover={{ y: isCurrentPlan ? 0 : -10, scale: isCurrentPlan ? 1 : 1.02 }}
                variants={itemVariants}
              >
                {/* Popüler Badge */}
                {key === 'gold' && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12"
                    animate={{ rotate: [12, 15, 12] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔥 Popüler
                  </motion.div>
                )}
                
                {/* Mevcut Plan Badge */}
                {isCurrentPlan && (
                  <motion.div
                    className="absolute -top-2 -left-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✅ Aktif
                  </motion.div>
                )}

                {/* Plan Icon */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${level.gradient} rounded-full flex items-center justify-center text-4xl text-white shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {level.icon}
                </motion.div>

                {/* Plan Bilgileri */}
                <h4 className="text-xl font-bold text-gray-900 mb-2">{level.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{level.price}₺</span>
                  <span className="text-gray-600">{level.period}</span>
                </div>

                {/* Özellikler */}
                <div className="space-y-2 mb-6 text-left">
                  {level.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {level.features.length > 4 && (
                    <div className="text-xs text-gray-500 text-center mt-2">
                      +{level.features.length - 4} özellik daha...
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isCurrentPlan
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : isUpgrade
                      ? `bg-gradient-to-r ${level.gradient} text-white hover:shadow-lg`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: isCurrentPlan ? 1 : 1.05 }}
                  whileTap={{ scale: isCurrentPlan ? 1 : 0.95 }}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan
                    ? 'Mevcut Plan'
                    : isUpgrade
                    ? 'Yükselt'
                    : 'Düşür'
                  }
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Premium Avantajları */}
      <motion.div 
        className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
        variants={itemVariants}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          🌟 Premium Neden Tercih Edilir?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
              📈
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">10x Daha Fazla Eşleşme</h4>
            <p className="text-sm text-gray-600">Premium üyeler %90 daha fazla eşleşme yakalıyor!</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
              ⚡
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Hızlı Yanıtlar</h4>
            <p className="text-sm text-gray-600">Mesajlarınız öncelikli olarak iletiliyor!</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
              🎯
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Akıllı Eşleştirme</h4>
            <p className="text-sm text-gray-600">Gelişmiş algoritmalar ile mükemmel eşleşmeler!</p>
          </div>
        </div>
      </motion.div>

      {/* Özel Teklif */}
      <motion.div 
        className="card p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200"
        variants={itemVariants}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block text-4xl mb-3"
          >
            🎁
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Özel Fırsat!</h3>
          <p className="text-gray-600 mb-4">
            İlk ay %50 indirim! Kodunuz: <strong className="text-red-600">HAPPYTIME50</strong>
          </p>
          <motion.button
            className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fırsatı Yakala!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )

  const renderEditModal = () => {
    if (!isEditModalOpen) return null

    const availableInterests = [
      '😊 Gülmek', '🎵 Müzik', '🌍 Seyahat', '📚 Kitap', '🎨 Sanat', '☕ Kahve',
      '🏃‍♀️ Spor', '🎬 Film', '🍕 Yemek', '🌸 Doğa', '📷 Fotoğraf', '🎮 Oyun'
    ]

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsEditModalOpen(false)}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              ✏️ Profili Düzenle
            </h2>
            <motion.button
              onClick={() => setIsEditModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="text-gray-500" />
            </motion.button>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleEditSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👤 İsim
              </label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                className="input-field"
                placeholder="Adınız"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎂 Yaş
              </label>
              <input
                type="number"
                name="age"
                value={editFormData.age}
                onChange={handleEditFormChange}
                className="input-field"
                placeholder="Yaşınız"
                min="18"
                max="100"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📍 Konum
              </label>
              <input
                type="text"
                name="location"
                value={editFormData.location}
                onChange={handleEditFormChange}
                className="input-field"
                placeholder="Şehir, Ülke"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💭 Hakkımda
              </label>
              <textarea
                name="bio"
                value={editFormData.bio}
                onChange={handleEditFormChange}
                className="input-field h-24 resize-none"
                placeholder="Kendinizi tanıtın..."
                maxLength="200"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {editFormData.bio.length}/200 karakter
              </p>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎯 İlgi Alanları
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableInterests.map((interest) => (
                  <motion.label
                    key={interest}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      editFormData.interests.includes(interest)
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      checked={editFormData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{interest}</span>
                  </motion.label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 En fazla 6 ilgi alanı seçebilirsiniz
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <motion.button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                İptal
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSave className="mr-2" />
                Kaydet
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )
  }

  const renderPhotoUploadModal = () => {
    if (!isPhotoUploadOpen) return null

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsPhotoUploadOpen(false)}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 w-full max-w-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              📸 Fotoğraf Yükle
            </h2>
            <motion.button
              onClick={() => setIsPhotoUploadOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="text-gray-500" />
            </motion.button>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              dragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadingPhoto ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-blue-600 font-medium">Fotoğraf yükleniyor...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  ></motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <FaCamera className="text-6xl text-gray-400 mx-auto mb-4" />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Fotoğraflarınızı buraya sürükleyin
                  </h3>
                  <p className="text-gray-600 mb-4">
                    veya dosya seçmek için tıklayın
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <FaPlus className="mr-2" />
                    Fotoğraf Seç
                  </label>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="text-xs text-gray-500 space-y-1"
                >
                  <p>✅ JPG, PNG, GIF formatları desteklenir</p>
                  <p>📏 Maksimum dosya boyutu: 5MB</p>
                  <p>📷 En fazla 6 fotoğraf yükleyebilirsiniz</p>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Tips */}
          {!uploadingPhoto && (
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold text-yellow-800 mb-2">💡 İpucu:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Net ve iyi ışıklı fotoğraflar tercih edin</li>
                <li>• Gülümseyen fotoğraflar daha çok beğeni alır</li>
                <li>• Farklı aktivitelerinizi gösteren fotoğraflar ekleyin</li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            😊 Profilim
          </h1>
          <p className="text-gray-600 text-lg">HappyTime'da mutluluğun yolunu çiz!</p>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div 
          className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 mb-8 shadow-lg border border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            👤 Profil
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('stories')}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'stories'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📖 Hikayeler
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCog className="inline mr-2" />
            ⚙️ Ayarlar
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('premium')}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'premium'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💎 Premium
          </motion.button>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'stories' && renderStoriesTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        {activeTab === 'premium' && renderPremiumTab()}

        {/* Edit Modal */}
        {renderEditModal()}

        {/* Photo Upload Modal */}
        {renderPhotoUploadModal()}
      </div>
    </div>
  )
}

export default Profile

