import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBell, 
  FaHeart, 
  FaComments, 
  FaStar,
  FaTimes,
  FaUserPlus,
  FaGift,
  FaCrown,
  FaFire,
  FaCheck,
  FaTrash,
  FaCog
} from 'react-icons/fa'

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'match',
      title: 'Yeni Eşleşme! 🎉',
      message: 'Elif ile eşleştiniz! Hemen mesaj gönderin.',
      time: '2 dakika önce',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
      action: 'message'
    },
    {
      id: 2,
      type: 'like',
      title: 'Süper Beğeni Aldınız! ⭐',
      message: 'Mehmet sizi süper beğendi.',
      time: '5 dakika önce',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
      action: 'profile'
    },
    {
      id: 3,
      type: 'message',
      title: 'Yeni Mesaj 💬',
      message: 'Zeynep: Merhaba! Nasıl gidiyor?',
      time: '10 dakika önce',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
      action: 'chat'
    },
    {
      id: 4,
      type: 'boost',
      title: 'Boost Aktif! 🚀',
      message: 'Profiliniz 30 dakika boyunca öne çıkarılıyor.',
      time: '1 saat önce',
      read: true,
      avatar: null,
      action: null
    },
    {
      id: 5,
      type: 'premium',
      title: 'Premium Teklifi 👑',
      message: '%50 indirimle Premium üye olun!',
      time: '2 saat önce',
      read: true,
      avatar: null,
      action: 'premium'
    },
    {
      id: 6,
      type: 'visitor',
      title: 'Profil Ziyaretçisi 👀',
      message: '5 kişi profilinizi görüntüledi.',
      time: '3 saat önce',
      read: true,
      avatar: null,
      action: 'visitors'
    }
  ]

  useEffect(() => {
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }, [])

  // Simulate new notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const newNotification = generateRandomNotification()
        setNotifications(prev => [newNotification, ...prev])
        setUnreadCount(prev => prev + 1)
        
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(newNotification.title, {
            body: newNotification.message,
            icon: '/logo.png',
            badge: '/logo.png'
          })
        }
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const generateRandomNotification = () => {
    const types = ['match', 'like', 'message', 'visitor']
    const type = types[Math.floor(Math.random() * types.length)]
    
    const templates = {
      match: {
        title: 'Yeni Eşleşme! 🎉',
        message: 'Yeni bir eşleşmeniz var!',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50'
      },
      like: {
        title: 'Yeni Beğeni! ❤️',
        message: 'Birisi sizi beğendi.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50'
      },
      message: {
        title: 'Yeni Mesaj 💬',
        message: 'Size yeni bir mesaj geldi.',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50'
      },
      visitor: {
        title: 'Profil Ziyaretçisi 👀',
        message: 'Profilinizi görüntülediler.',
        avatar: null
      }
    }

    return {
      id: Date.now(),
      type,
      ...templates[type],
      time: 'Şimdi',
      read: false,
      action: type === 'match' ? 'message' : type === 'message' ? 'chat' : 'profile'
    }
  }

  const getNotificationIcon = (type) => {
    const icons = {
      match: { icon: FaHeart, color: 'text-red-500', bg: 'bg-red-50' },
      like: { icon: FaStar, color: 'text-yellow-500', bg: 'bg-yellow-50' },
      message: { icon: FaComments, color: 'text-blue-500', bg: 'bg-blue-50' },
      boost: { icon: FaFire, color: 'text-orange-500', bg: 'bg-orange-50' },
      premium: { icon: FaCrown, color: 'text-purple-500', bg: 'bg-purple-50' },
      visitor: { icon: FaUserPlus, color: 'text-green-500', bg: 'bg-green-50' }
    }
    return icons[type] || { icon: FaBell, color: 'text-gray-500', bg: 'bg-gray-50' }
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const deleteNotification = (id) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === id)
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1))
      }
      return prev.filter(n => n.id !== id)
    })
  }

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
    
    // Handle different actions
    switch (notification.action) {
      case 'message':
      case 'chat':
        console.log('Navigate to chat')
        break
      case 'profile':
        console.log('Navigate to profile')
        break
      case 'premium':
        console.log('Navigate to premium')
        break
      case 'visitors':
        console.log('Navigate to visitors')
        break
      default:
        break
    }
  }

  const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        new Notification('Bildirimler Aktif! 🔔', {
          body: 'Artık yeni eşleşme ve mesajlardan haberdar olacaksınız.',
          icon: '/logo.png'
        })
      }
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={requestNotificationPermission}
        className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaBell className="text-xl" />
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
        
        {/* Pulse Effect for New Notifications */}
        {unreadCount > 0 && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 bg-red-400 rounded-full w-5 h-5"
          />
        )}
      </motion.button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                    <FaBell className="text-orange-500" />
                    <span>Bildirimler</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <motion.button
                        onClick={markAllAsRead}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Tümünü Okundu İşaretle
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-500 hover:text-gray-700 rounded-lg"
                    >
                      <FaTimes />
                    </motion.button>
                  </div>
                </div>
                
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {unreadCount} okunmamış bildirim
                  </p>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                <AnimatePresence>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => {
                      const iconConfig = getNotificationIcon(notification.type)
                      const Icon = iconConfig.icon
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                            !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start space-x-3">
                            {/* Avatar or Icon */}
                            <div className="flex-shrink-0">
                              {notification.avatar ? (
                                <div className="relative">
                                  <img
                                    src={notification.avatar}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${iconConfig.bg} ${iconConfig.color} rounded-full flex items-center justify-center`}>
                                    <Icon className="text-xs" />
                                  </div>
                                </div>
                              ) : (
                                <div className={`w-10 h-10 ${iconConfig.bg} ${iconConfig.color} rounded-full flex items-center justify-center`}>
                                  <Icon className="text-lg" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className={`text-sm font-semibold ${
                                    !notification.read ? 'text-gray-900' : 'text-gray-700'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {notification.time}
                                  </p>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!notification.read && (
                                    <motion.button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                      title="Okundu işaretle"
                                    >
                                      <FaCheck className="text-xs" />
                                    </motion.button>
                                  )}
                                  <motion.button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                    title="Sil"
                                  >
                                    <FaTrash className="text-xs" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center"
                    >
                      <FaBell className="text-4xl text-gray-300 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">
                        Bildirim Yok
                      </h4>
                      <p className="text-sm text-gray-500">
                        Henüz hiç bildiriminiz bulunmuyor.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-700 py-2"
                  >
                    <FaCog />
                    <span>Bildirim Ayarları</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationCenter

