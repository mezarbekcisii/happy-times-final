import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LocationMap = ({ users, currentUser, onUserSelect, showDistance = true }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 41.0082, lng: 28.9784 }) // İstanbul
  const [zoom, setZoom] = useState(12)
  const [selectedUser, setSelectedUser] = useState(null)

  // Simulated map data - gerçek hayatta Google Maps API kullanılabilir
  const mapLocations = [
    { id: 1, name: 'Elif Yılmaz', lat: 41.0372, lng: 28.9869, distance: '2 km', area: 'Beşiktaş', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { id: 2, name: 'Mehmet Kaya', lat: 39.9334, lng: 32.8597, distance: '5 km', area: 'Çankaya', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 3, name: 'Zeynep Demir', lat: 38.4237, lng: 27.1428, distance: '1 km', area: 'Konak', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: 4, name: 'Ali Öztürk', lat: 41.0255, lng: 28.9744, distance: '3 km', area: 'Kadıköy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { id: 5, name: 'Ayşe Kılıç', lat: 41.0566, lng: 29.0286, distance: '4 km', area: 'Üsküdar', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { id: 6, name: 'Can Yıldız', lat: 41.0138, lng: 28.9497, distance: '2.5 km', area: 'Beyoğlu', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
  ]

  const handleUserClick = (user) => {
    setSelectedUser(user)
    onUserSelect && onUserSelect(user)
  }

  const getDistanceColor = (distance) => {
    const km = parseFloat(distance)
    if (km <= 1) return 'bg-green-500'
    if (km <= 3) return 'bg-yellow-500'
    if (km <= 5) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-xl">
      {/* Map Header */}
      <div className="bg-white/90 backdrop-blur-sm p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">📍</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Yakındaki Kişiler</h3>
              <p className="text-sm text-gray-600">{mapLocations.length} kişi çevrenizde</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoom(Math.min(zoom + 1, 18))}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              +
            </button>
            <button
              onClick={() => setZoom(Math.max(zoom - 1, 8))}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              -
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="relative h-96 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 overflow-hidden">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Current User Location */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-blue-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
              <span className="text-white text-xl">👤</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs">•</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Sen buradasın
            </div>
          </div>
        </motion.div>

        {/* Other Users */}
        {mapLocations.map((user, index) => {
          const angle = (index * 60) + Math.random() * 30
          const radius = 80 + Math.random() * 120
          const x = Math.cos(angle * Math.PI / 180) * radius
          const y = Math.sin(angle * Math.PI / 180) * radius
          
          return (
            <motion.div
              key={user.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute z-10 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleUserClick(user)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Distance Badge */}
                {showDistance && (
                  <div className={`absolute -top-2 -right-2 w-6 h-6 ${getDistanceColor(user.distance)} rounded-full border-2 border-white flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{user.distance.split(' ')[0]}</span>
                  </div>
                )}

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs opacity-80">{user.area} • {user.distance}</div>
                  </div>
                </div>

                {/* Pulse Animation */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected User Info */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{selectedUser.name}</h4>
                <p className="text-sm text-gray-600">{selectedUser.area} • {selectedUser.distance} uzaklıkta</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Profili Gör
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Mesaj Gönder
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LocationMap

