import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUsers, 
  FaHeart, 
  FaComments, 
  FaEye,
  FaChartLine,
  FaShieldAlt,
  FaCog,
  FaBell,
  FaSearch,
  FaFilter,
  FaDownload,
  FaExclamationTriangle,
  FaBan,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaCrown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaActivity,
  FaWarning
} from 'react-icons/fa'
import Logo from '../components/Logo'
import AdvancedAnalytics from '../components/AdvancedAnalytics'
import SystemSettings from '../components/SystemSettings'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [liveActivity, setLiveActivity] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  // Mock admin stats
  const adminStats = {
    totalUsers: 12847,
    activeUsers: 3421,
    totalMatches: 8934,
    todayMatches: 234,
    totalMessages: 45672,
    todayMessages: 1823,
    reportedContent: 23,
    pendingReports: 8,
    premiumUsers: 1567,
    revenue: 45890,
    todayRevenue: 2340,
    onlineUsers: 567
  }

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      user: 'Elif Yılmaz',
      action: 'Yeni kullanıcı kaydı',
      time: '2 dakika önce',
      details: 'İstanbul',
      status: 'success'
    },
    {
      id: 2,
      type: 'match',
      user: 'Mehmet Kaya',
      action: 'Yeni eşleşme',
      time: '5 dakika önce',
      details: 'Zeynep ile eşleşti',
      status: 'success'
    },
    {
      id: 3,
      type: 'report',
      user: 'Anonim',
      action: 'İçerik şikayeti',
      time: '8 dakika önce',
      details: 'Uygunsuz profil fotoğrafı',
      status: 'warning'
    },
    {
      id: 4,
      type: 'premium',
      user: 'Ayşe Demir',
      action: 'Premium üyelik',
      time: '12 dakika önce',
      details: 'Altın paket satın aldı',
      status: 'success'
    },
    {
      id: 5,
      type: 'violation',
      user: 'Can Özkan',
      action: 'Kural ihlali',
      time: '15 dakika önce',
      details: 'Spam mesaj gönderimi',
      status: 'error'
    }
  ]

  // Mock user data
  const recentUsers = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      email: 'elif@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
      joinDate: '2 gün önce',
      lastActive: '5 dakika önce',
      status: 'active',
      premium: 'gold',
      location: 'İstanbul',
      matches: 12,
      messages: 45,
      reports: 0
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
      joinDate: '1 gün önce',
      lastActive: '2 saat önce',
      status: 'active',
      premium: 'silver',
      location: 'Ankara',
      matches: 8,
      messages: 23,
      reports: 1
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      email: 'zeynep@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
      joinDate: '3 gün önce',
      lastActive: '1 gün önce',
      status: 'inactive',
      premium: 'free',
      location: 'İzmir',
      matches: 5,
      messages: 15,
      reports: 0
    }
  ]

  // Mock reported content
  const reportedContent = [
    {
      id: 1,
      type: 'profile',
      reportedUser: 'Ahmet Kaya',
      reportedBy: 'Selin Ay',
      reason: 'Uygunsuz profil fotoğrafı',
      details: 'Çıplak/müstehcen içerik',
      time: '1 saat önce',
      status: 'pending',
      severity: 'high'
    },
    {
      id: 2,
      type: 'message',
      reportedUser: 'Can Özkan',
      reportedBy: 'Elif Yılmaz',
      reason: 'Taciz edici mesajlar',
      details: 'Sürekli rahatsız edici mesajlar gönderiyor',
      time: '3 saat önce',
      status: 'pending',
      severity: 'high'
    },
    {
      id: 3,
      type: 'fake_profile',
      reportedUser: 'Fake User',
      reportedBy: 'Mehmet Demir',
      reason: 'Sahte profil',
      details: 'Başkasının fotoğraflarını kullanıyor',
      time: '5 saat önce',
      status: 'reviewing',
      severity: 'medium'
    }
  ]

  useEffect(() => {
    // Simulate live activity updates
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newActivity = {
          id: Date.now(),
          type: ['user_signup', 'match', 'message', 'premium'][Math.floor(Math.random() * 4)],
          user: ['Yeni Kullanıcı', 'Test User', 'Demo User'][Math.floor(Math.random() * 3)],
          action: 'Yeni aktivite',
          time: 'Şimdi',
          status: 'success'
        }
        setLiveActivity(prev => [newActivity, ...prev.slice(0, 4)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type) => {
    const icons = {
      user_signup: { icon: FaUsers, color: 'text-blue-500' },
      match: { icon: FaHeart, color: 'text-red-500' },
      message: { icon: FaComments, color: 'text-green-500' },
      report: { icon: FaExclamationTriangle, color: 'text-yellow-500' },
      premium: { icon: FaCrown, color: 'text-purple-500' },
      violation: { icon: FaBan, color: 'text-red-600' }
    }
    return icons[type] || { icon: FaActivity, color: 'text-gray-500' }
  }

  const getStatusColor = (status) => {
    const colors = {
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
      info: 'text-blue-500'
    }
    return colors[status] || 'text-gray-500'
  }

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`)
    // Implement user actions
  }

  const handleReportAction = (reportId, action) => {
    console.log(`${action} report ${reportId}`)
    // Implement report actions
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className="text-green-500 text-sm flex items-center">
                  <FaActivity className="mr-1" />
                  <span>{adminStats.onlineUsers} çevrimiçi</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Eşleşme</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.totalMatches.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className="text-green-500 text-sm">
                  +{adminStats.todayMatches} bugün
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaHeart className="text-red-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Mesaj</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.totalMessages.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className="text-green-500 text-sm">
                  +{adminStats.todayMessages} bugün
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaComments className="text-green-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gelir (₺)</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.revenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <div className="text-green-500 text-sm">
                  +{adminStats.todayRevenue}₺ bugün
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaCrown className="text-purple-600 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bekleyen Şikayetler</h3>
              <p className="text-2xl font-bold text-yellow-600">{adminStats.pendingReports}</p>
            </div>
            <FaExclamationTriangle className="text-3xl text-yellow-500" />
          </div>
          <button className="mt-4 text-sm text-yellow-700 hover:text-yellow-800 font-medium">
            Şikayetleri İncele →
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Toplam Şikayet</h3>
              <p className="text-2xl font-bold text-red-600">{adminStats.reportedContent}</p>
            </div>
            <FaShieldAlt className="text-3xl text-red-500" />
          </div>
          <button className="mt-4 text-sm text-red-700 hover:text-red-800 font-medium">
            Moderasyona Git →
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Üyeler</h3>
              <p className="text-2xl font-bold text-purple-600">{adminStats.premiumUsers}</p>
            </div>
            <FaCrown className="text-3xl text-purple-500" />
          </div>
          <button className="mt-4 text-sm text-purple-700 hover:text-purple-800 font-medium">
            Premium Yönetimi →
          </button>
        </motion.div>
      </div>

      {/* Recent Activity & Live Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaActivity className="mr-2 text-blue-500" />
              Son Aktiviteler
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => {
              const iconConfig = getActivityIcon(activity.type)
              const Icon = iconConfig.icon
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${iconConfig.color}`}>
                    <Icon />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    {activity.details && (
                      <p className="text-xs text-gray-500">{activity.details}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <div className={`text-xs ${getStatusColor(activity.status)}`}>
                      ●
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Live Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Canlı Aktivite
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {liveActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {liveActivity.length === 0 && (
              <div className="text-center py-8">
                <FaActivity className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Canlı aktivite bekleniyor...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kullanıcı ara (isim, email, ID)..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>Tüm Kullanıcılar</option>
            <option>Premium Üyeler</option>
            <option>Aktif Kullanıcılar</option>
            <option>Yasaklı Kullanıcılar</option>
          </select>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            Dışa Aktar
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Üyelik
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İstatistikler
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                      <div className="text-xs text-gray-500">
                        Son: {user.lastActive}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.premium !== 'free' && (
                        <FaCrown className={`text-sm ${
                          user.premium === 'gold' ? 'text-yellow-500' : 
                          user.premium === 'silver' ? 'text-gray-400' : 'text-orange-500'
                        }`} />
                      )}
                      <span className="text-sm text-gray-900 capitalize">{user.premium}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Katılım: {user.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      <div>❤️ {user.matches} eşleşme</div>
                      <div>💬 {user.messages} mesaj</div>
                      <div>⚠️ {user.reports} şikayet</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleUserAction(user.id, 'view')}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEye />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleUserAction(user.id, 'edit')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleUserAction(user.id, 'ban')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaBan />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">İçerik Moderasyonu</h2>
            <p className="text-gray-600 mt-1">Kullanıcı şikayetlerini inceleyin ve gerekli işlemleri yapın</p>
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Tüm Şikayetler</option>
              <option>Bekleyen</option>
              <option>İnceleniyor</option>
              <option>Tamamlandı</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reportedContent.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    report.severity === 'high' ? 'bg-red-100 text-red-800' :
                    report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.severity === 'high' ? 'Yüksek Öncelik' :
                     report.severity === 'medium' ? 'Orta Öncelik' : 'Düşük Öncelik'}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    report.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {report.status === 'pending' ? 'Bekliyor' :
                     report.status === 'reviewing' ? 'İnceleniyor' : 'Tamamlandı'}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.reason}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Şikayet Edilen:</p>
                    <p className="font-medium text-gray-900">{report.reportedUser}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Şikayet Eden:</p>
                    <p className="font-medium text-gray-900">{report.reportedBy}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{report.details}</p>
                <p className="text-sm text-gray-500">{report.time}</p>
              </div>
              
              <div className="flex flex-col space-y-2 ml-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReportAction(report.id, 'approve')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <FaCheck className="mr-2" />
                  Onayla
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReportAction(report.id, 'reject')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                >
                  <FaTimes className="mr-2" />
                  Reddet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReportAction(report.id, 'investigate')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FaSearch className="mr-2" />
                  İncele
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Admin Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo size="md" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-gray-600">HappyTime Yönetim Paneli</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="1h">Son 1 Saat</option>
                <option value="24h">Son 24 Saat</option>
                <option value="7d">Son 7 Gün</option>
                <option value="30d">Son 30 Gün</option>
              </select>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Canlı</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 mb-8 shadow-lg border border-white/50">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
            { id: 'users', label: 'Kullanıcılar', icon: FaUsers },
            { id: 'reports', label: 'Moderasyon', icon: FaShieldAlt },
            { id: 'analytics', label: 'Analitik', icon: FaActivity },
            { id: 'settings', label: 'Ayarlar', icon: FaCog }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon />
                <span>{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'analytics' && <AdvancedAnalytics />}
          {activeTab === 'settings' && <SystemSettings />}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
