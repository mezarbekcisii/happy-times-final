import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie,
  FaUsers,
  FaHeart,
  FaComments,
  FaDollarSign,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaTrendingUp,
  FaTrendingDown,
  FaEquals
} from 'react-icons/fa'

const AdvancedAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('users')

  // Mock analytics data
  const analyticsData = {
    users: {
      total: 12847,
      growth: '+12.5%',
      trend: 'up',
      data: [100, 120, 140, 160, 180, 200, 220, 250, 280, 300, 320, 350]
    },
    matches: {
      total: 8934,
      growth: '+8.3%',
      trend: 'up',
      data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160]
    },
    messages: {
      total: 45672,
      growth: '+15.2%',
      trend: 'up',
      data: [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750]
    },
    revenue: {
      total: 45890,
      growth: '+22.1%',
      trend: 'up',
      data: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200]
    }
  }

  const demographicsData = [
    { age: '18-24', percentage: 25, count: 3211 },
    { age: '25-30', percentage: 35, count: 4496 },
    { age: '31-35', percentage: 22, count: 2826 },
    { age: '36-40', percentage: 12, count: 1542 },
    { age: '40+', percentage: 6, count: 772 }
  ]

  const locationData = [
    { city: 'İstanbul', users: 4523, percentage: 35 },
    { city: 'Ankara', users: 2156, percentage: 17 },
    { city: 'İzmir', users: 1876, percentage: 15 },
    { city: 'Bursa', users: 1243, percentage: 10 },
    { city: 'Antalya', users: 987, percentage: 8 },
    { city: 'Diğer', users: 2062, percentage: 15 }
  ]

  const engagementMetrics = {
    dailyActiveUsers: 3421,
    averageSessionTime: '12:34',
    messagesPerUser: 3.6,
    matchSuccessRate: 78,
    premiumConversion: 12.3,
    retentionRate: 68
  }

  const revenueBreakdown = [
    { plan: 'Bronz', revenue: 12450, users: 415, percentage: 27 },
    { plan: 'Gümüş', revenue: 15890, users: 318, percentage: 35 },
    { plan: 'Altın', revenue: 12340, users: 154, percentage: 27 },
    { plan: 'Platin', revenue: 5210, users: 40, percentage: 11 }
  ]

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <FaTrendingUp className="text-green-500" />
    if (trend === 'down') return <FaTrendingDown className="text-red-500" />
    return <FaEquals className="text-gray-500" />
  }

  const renderChart = (data, color = 'blue') => (
    <div className="h-32 flex items-end justify-between space-x-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / Math.max(...data)) * 100}%` }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`flex-1 bg-gradient-to-t from-${color}-400 to-${color}-500 rounded-t`}
          style={{ minHeight: '4px' }}
        />
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gelişmiş Analitik</h2>
            <p className="text-gray-600 mt-1">Detaylı platform istatistikleri ve trendler</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="7d">Son 7 Gün</option>
              <option value="30d">Son 30 Gün</option>
              <option value="90d">Son 3 Ay</option>
              <option value="1y">Son 1 Yıl</option>
            </select>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
              <FaDownload className="mr-2" />
              Rapor İndir
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(analyticsData).map(([key, data]) => {
          const icons = {
            users: { icon: FaUsers, color: 'blue' },
            matches: { icon: FaHeart, color: 'red' },
            messages: { icon: FaComments, color: 'green' },
            revenue: { icon: FaDollarSign, color: 'purple' }
          }
          const config = icons[key]
          const Icon = config.icon
          
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer ${
                selectedMetric === key ? `ring-2 ring-${config.color}-500` : ''
              }`}
              onClick={() => setSelectedMetric(key)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${config.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`text-${config.color}-600 text-xl`} />
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(data.trend)}
                  <span className={`text-sm font-medium ${
                    data.trend === 'up' ? 'text-green-600' : 
                    data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {data.growth}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 capitalize">
                  {key === 'revenue' ? 'Gelir (₺)' : 
                   key === 'users' ? 'Kullanıcılar' :
                   key === 'matches' ? 'Eşleşmeler' : 'Mesajlar'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {key === 'revenue' ? `${data.total.toLocaleString()}₺` : data.total.toLocaleString()}
                </p>
              </div>
              
              {renderChart(data.data, config.color)}
            </motion.div>
          )
        })}
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaChartPie className="mr-2 text-purple-500" />
            Yaş Demografisi
          </h3>
          <div className="space-y-4">
            {demographicsData.map((demo, index) => (
              <motion.div
                key={demo.age}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 w-12">{demo.age}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${demo.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{demo.percentage}%</p>
                  <p className="text-xs text-gray-500">{demo.count.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaChartBar className="mr-2 text-green-500" />
            Şehir Dağılımı
          </h3>
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 w-16">{location.city}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${location.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{location.percentage}%</p>
                  <p className="text-xs text-gray-500">{location.users.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" />
          Etkileşim Metrikleri
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{engagementMetrics.dailyActiveUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Günlük Aktif</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{engagementMetrics.averageSessionTime}</p>
            <p className="text-sm text-gray-600 mt-1">Ort. Oturum</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{engagementMetrics.messagesPerUser}</p>
            <p className="text-sm text-gray-600 mt-1">Mesaj/Kullanıcı</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{engagementMetrics.matchSuccessRate}%</p>
            <p className="text-sm text-gray-600 mt-1">Eşleşme Oranı</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{engagementMetrics.premiumConversion}%</p>
            <p className="text-sm text-gray-600 mt-1">Premium Dönüşüm</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{engagementMetrics.retentionRate}%</p>
            <p className="text-sm text-gray-600 mt-1">Kullanıcı Tutma</p>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FaDollarSign className="mr-2 text-green-500" />
          Gelir Dağılımı
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {revenueBreakdown.map((item, index) => {
            const colors = ['orange', 'gray', 'yellow', 'purple']
            const color = colors[index]
            
            return (
              <motion.div
                key={item.plan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-4`}
              >
                <div className="text-center">
                  <div className={`w-8 h-8 bg-${color}-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold`}>
                    {item.plan[0]}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.plan}</h4>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{item.revenue.toLocaleString()}₺</p>
                  <p className="text-sm text-gray-600">{item.users} kullanıcı</p>
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className={`bg-${color}-500 h-2 rounded-full`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.percentage}% toplam gelir</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdvancedAnalytics

