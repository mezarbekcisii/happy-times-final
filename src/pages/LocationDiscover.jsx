import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LocationMap from '../components/LocationMap'

const LocationDiscover = () => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [nearbyUsers, setNearbyUsers] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showMap, setShowMap] = useState(true)
  const [locationPermission, setLocationPermission] = useState('pending')
  const navigate = useNavigate()

  // Simulated location data
  const locationData = {
    current: { lat: 41.0082, lng: 28.9784, area: 'Beşiktaş, İstanbul' },
    nearby: [
      {
        id: 1,
        name: 'Elif Yılmaz',
        age: 26,
        distance: 0.8,
        area: 'Beşiktaş',
        lastSeen: '5 dk önce',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
        interests: ['Sanat', 'Kahve', 'Müzik'],
        isOnline: true,
        activity: 'Starbucks\'ta kahve içiyor'
      },
      {
        id: 2,
        name: 'Mehmet Kaya',
        age: 29,
        distance: 1.2,
        area: 'Ortaköy',
        lastSeen: '15 dk önce',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        interests: ['Spor', 'Kitap', 'Film'],
        isOnline: false,
        activity: 'Ortaköy sahilinde yürüyüş'
      },
      {
        id: 3,
        name: 'Zeynep Demir',
        age: 24,
        distance: 2.1,
        area: 'Bebek',
        lastSeen: 'Az önce',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
        interests: ['Yoga', 'Doğa', 'Felsefe'],
        isOnline: true,
        activity: 'Bebek Parkı\'nda yoga yapıyor'
      },
      {
        id: 4,
        name: 'Ali Öztürk',
        age: 27,
        distance: 3.5,
        area: 'Kadıköy',
        lastSeen: '30 dk önce',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
        interests: ['Teknoloji', 'Gaming', 'Müzik'],
        isOnline: false,
        activity: 'Kadıköy çarşısında alışveriş'
      },
      {
        id: 5,
        name: 'Ayşe Kılıç',
        age: 25,
        distance: 4.2,
        area: 'Üsküdar',
        lastSeen: '1 saat önce',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
        interests: ['Fotoğraf', 'Seyahat', 'Tarih'],
        isOnline: true,
        activity: 'Maiden\'s Tower\'da fotoğraf çekiyor'
      }
    ]
  }

  const filters = [
    { id: 'all', name: 'Hepsi', icon: '🌍' },
    { id: 'online', name: 'Aktif', icon: '🟢' },
    { id: 'near', name: '2km içi', icon: '📍' },
    { id: 'very_near', name: '1km içi', icon: '🎯' }
  ]

  // Simulate location permission request
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocationPermission('granted')
      setCurrentLocation(locationData.current)
      setNearbyUsers(locationData.nearby)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredUsers = nearbyUsers.filter(user => {
    switch (selectedFilter) {
      case 'online':
        return user.isOnline
      case 'near':
        return user.distance < 2
      case 'very_near':
        return user.distance < 1
      default:
        return true
    }
  })

  const requestLocation = () => {
    setLocationPermission('requesting')
    setTimeout(() => {
      setLocationPermission('granted')
      setCurrentLocation(locationData.current)
      setNearbyUsers(locationData.nearby)
    }, 2000)
  }

  if (locationPermission === 'pending' || locationPermission === 'requesting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">📍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Konum İzni</h2>
            <p className="text-gray-600 mb-6">
              Yakındaki kişileri keşfetmek için konum izni gerekiyor. 
              Konumunuz sadece mesafe hesaplama için kullanılacak.
            </p>
            {locationPermission === 'requesting' ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                <span className="ml-2 text-gray-600">Konum alınıyor...</span>
              </div>
            ) : (
              <button
                onClick={requestLocation}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Konuma İzin Ver
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/discover')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                ←
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  📍 Konum Keşfi
                </h1>
                <p className="text-gray-600 text-sm">{currentLocation?.area}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowMap(!showMap)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  showMap 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {showMap ? '📍 Harita' : '📋 Liste'}
              </button>
              <div className="text-sm text-gray-600">
                {filteredUsers.length} kişi
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                <span>{filter.icon}</span>
                <span className="font-medium">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map or List View */}
          <div className="order-2 lg:order-1">
            {showMap ? (
              <LocationMap 
                users={filteredUsers}
                currentUser={currentLocation}
                onUserSelect={(user) => console.log('Selected user:', user)}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">Yakındaki Kişiler</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          </div>
                          {user.isOnline && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{user.name}, {user.age}</h4>
                          <p className="text-sm text-gray-600">{user.area} • {user.distance} km</p>
                          <p className="text-xs text-gray-500 mt-1">{user.activity}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{user.lastSeen}</div>
                          <div className="flex space-x-1 mt-1">
                            {user.interests.slice(0, 2).map((interest, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Statistics and Quick Actions */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Location Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">📊 Konum İstatistikleri</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                  <div className="text-2xl font-bold">{nearbyUsers.length}</div>
                  <div className="text-sm opacity-90">Yakında</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                  <div className="text-2xl font-bold">{nearbyUsers.filter(u => u.isOnline).length}</div>
                  <div className="text-sm opacity-90">Aktif</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white">
                  <div className="text-2xl font-bold">{nearbyUsers.filter(u => u.distance < 1).length}</div>
                  <div className="text-sm opacity-90">{'< 1km'}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl text-white">
                  <div className="text-2xl font-bold">{nearbyUsers.filter(u => u.distance < 2).length}</div>
                  <div className="text-sm opacity-90">{'< 2km'}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">⚡ Hızlı İşlemler</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  🎯 Boost Kullan (2x Görünürlük)
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  💌 Toplu Mesaj Gönder
                </button>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  📍 Konum Güncellemesi
                </button>
              </div>
            </div>

            {/* Hot Spots */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">🔥 Popüler Mekanlar</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">☕</span>
                  <div>
                    <div className="font-medium">Starbucks Beşiktaş</div>
                    <div className="text-sm text-gray-600">3 aktif kullanıcı</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🏞️</span>
                  <div>
                    <div className="font-medium">Bebek Parkı</div>
                    <div className="text-sm text-gray-600">2 aktif kullanıcı</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <div className="font-medium">Zorlu Center</div>
                    <div className="text-sm text-gray-600">5 aktif kullanıcı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationDiscover
