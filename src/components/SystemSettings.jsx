import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCog, 
  FaShieldAlt, 
  FaDollarSign,
  FaBell,
  FaUsers,
  FaHeart,
  FaComments,
  FaImage,
  FaSave,
  FaReset,
  FaDownload,
  FaUpload,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaDatabase,
  FaServer,
  FaChartLine
} from 'react-icons/fa'

const SystemSettings = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    general: {
      siteName: 'HappyTime',
      siteDescription: 'Mutlu anların sosyal platformu',
      maintenanceMode: false,
      registrationEnabled: true,
      maxUsersPerDay: 100,
      requireEmailVerification: true
    },
    matching: {
      maxDailyLikes: 50,
      maxSuperLikes: 3,
      matchingRadius: 50,
      ageRangeMin: 18,
      ageRangeMax: 65,
      enableBoost: true,
      boostDuration: 30
    },
    premium: {
      bronzePrice: 29.99,
      silverPrice: 49.99,
      goldPrice: 79.99,
      platinumPrice: 129.99,
      trialPeriod: 7,
      refundPeriod: 14
    },
    moderation: {
      autoModeration: true,
      requirePhotoApproval: false,
      maxReportsBeforeBan: 5,
      banDuration: 30,
      allowAppeal: true,
      sensitiveContentFilter: true
    },
    notifications: {
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      notificationFrequency: 'immediate'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 24,
      passwordMinLength: 8,
      requireStrongPassword: true,
      maxLoginAttempts: 5,
      ipBlocking: true
    }
  })

  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setLastSaved(new Date().toLocaleTimeString('tr-TR'))
  }

  const handleReset = (section) => {
    if (confirm(`${section} ayarlarını sıfırlamak istediğinizden emin misiniz?`)) {
      // Reset to default values
      console.log(`Resetting ${section} settings`)
    }
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Adı
          </label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Günlük Maksimum Kayıt
          </label>
          <input
            type="number"
            value={settings.general.maxUsersPerDay}
            onChange={(e) => handleSettingChange('general', 'maxUsersPerDay', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Açıklaması
        </label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Bakım Modu</h4>
            <p className="text-sm text-gray-600">Site bakımda mesajı gösterir</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Yeni Kayıtlar</h4>
            <p className="text-sm text-gray-600">Yeni kullanıcı kaydına izin ver</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.registrationEnabled}
              onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Email Doğrulama</h4>
            <p className="text-sm text-gray-600">Kayıt sırasında email doğrulama iste</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.requireEmailVerification}
              onChange={(e) => handleSettingChange('general', 'requireEmailVerification', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderMatchingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Günlük Maksimum Beğeni
          </label>
          <input
            type="number"
            value={settings.matching.maxDailyLikes}
            onChange={(e) => handleSettingChange('matching', 'maxDailyLikes', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Günlük Süper Beğeni
          </label>
          <input
            type="number"
            value={settings.matching.maxSuperLikes}
            onChange={(e) => handleSettingChange('matching', 'maxSuperLikes', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eşleşme Yarıçapı (km)
          </label>
          <input
            type="number"
            value={settings.matching.matchingRadius}
            onChange={(e) => handleSettingChange('matching', 'matchingRadius', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Boost Süresi (dakika)
          </label>
          <input
            type="number"
            value={settings.matching.boostDuration}
            onChange={(e) => handleSettingChange('matching', 'boostDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Yaş
          </label>
          <input
            type="number"
            value={settings.matching.ageRangeMin}
            onChange={(e) => handleSettingChange('matching', 'ageRangeMin', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maksimum Yaş
          </label>
          <input
            type="number"
            value={settings.matching.ageRangeMax}
            onChange={(e) => handleSettingChange('matching', 'ageRangeMax', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">Boost Özelliği</h4>
          <p className="text-sm text-gray-600">Kullanıcıların profil öne çıkarma özelliği</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.matching.enableBoost}
            onChange={(e) => handleSettingChange('matching', 'enableBoost', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  )

  const renderPremiumSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bronz Fiyat (₺)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.premium.bronzePrice}
            onChange={(e) => handleSettingChange('premium', 'bronzePrice', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gümüş Fiyat (₺)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.premium.silverPrice}
            onChange={(e) => handleSettingChange('premium', 'silverPrice', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Altın Fiyat (₺)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.premium.goldPrice}
            onChange={(e) => handleSettingChange('premium', 'goldPrice', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platin Fiyat (₺)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.premium.platinumPrice}
            onChange={(e) => handleSettingChange('premium', 'platinumPrice', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deneme Süresi (gün)
          </label>
          <input
            type="number"
            value={settings.premium.trialPeriod}
            onChange={(e) => handleSettingChange('premium', 'trialPeriod', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İade Süresi (gün)
          </label>
          <input
            type="number"
            value={settings.premium.refundPeriod}
            onChange={(e) => handleSettingChange('premium', 'refundPeriod', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
    </div>
  )

  const renderModerationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yasaklama İçin Gerekli Şikayet Sayısı
          </label>
          <input
            type="number"
            value={settings.moderation.maxReportsBeforeBan}
            onChange={(e) => handleSettingChange('moderation', 'maxReportsBeforeBan', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yasaklama Süresi (gün)
          </label>
          <input
            type="number"
            value={settings.moderation.banDuration}
            onChange={(e) => handleSettingChange('moderation', 'banDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Otomatik Moderasyon</h4>
            <p className="text-sm text-gray-600">AI tabanlı içerik denetimi</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.autoModeration}
              onChange={(e) => handleSettingChange('moderation', 'autoModeration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Fotoğraf Onayı</h4>
            <p className="text-sm text-gray-600">Yüklenen fotoğrafları manuel onaylama</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.requirePhotoApproval}
              onChange={(e) => handleSettingChange('moderation', 'requirePhotoApproval', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">İtiraz Hakkı</h4>
            <p className="text-sm text-gray-600">Yasaklanan kullanıcıların itiraz edebilmesi</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.allowAppeal}
              onChange={(e) => handleSettingChange('moderation', 'allowAppeal', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Hassas İçerik Filtresi</h4>
            <p className="text-sm text-gray-600">Uygunsuz içerikleri otomatik filtreleme</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.moderation.sensitiveContentFilter}
              onChange={(e) => handleSettingChange('moderation', 'sensitiveContentFilter', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const sections = [
    { id: 'general', label: 'Genel', icon: FaCog, render: renderGeneralSettings },
    { id: 'matching', label: 'Eşleşme', icon: FaHeart, render: renderMatchingSettings },
    { id: 'premium', label: 'Premium', icon: FaDollarSign, render: renderPremiumSettings },
    { id: 'moderation', label: 'Moderasyon', icon: FaShieldAlt, render: renderModerationSettings }
  ]

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sistem Ayarları</h2>
            <p className="text-gray-600 mt-1">Platform konfigurasyonu ve yönetimi</p>
            {lastSaved && (
              <p className="text-sm text-green-600 mt-2">
                Son kaydedilen: {lastSaved}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <FaDownload className="mr-2" />
              Dışa Aktar
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <FaUpload className="mr-2" />
              İçe Aktar
            </button>
          </div>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex border-b border-gray-200">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 py-4 px-6 text-center transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="mx-auto mb-2 text-xl" />
                <span className="text-sm font-medium">{section.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Settings Content */}
        <div className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sections.find(s => s.id === activeSection)?.render()}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => handleReset(activeSection)}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center"
          >
            <FaReset className="mr-2" />
            Sıfırla
          </button>
          
          <motion.button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            whileHover={{ scale: saving ? 1 : 1.05 }}
            whileTap={{ scale: saving ? 1 : 0.95 }}
          >
            {saving ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Kaydet
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Database Status</h3>
            <FaDatabase className="text-2xl text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Connection</span>
              <span className="text-sm text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                Active
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Size</span>
              <span className="text-sm text-gray-900">2.4 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Queries/sec</span>
              <span className="text-sm text-gray-900">124</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Server Status</h3>
            <FaServer className="text-2xl text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm text-gray-900">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm text-gray-900">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Memory</span>
              <span className="text-sm text-gray-900">62%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Performance</h3>
            <FaChartLine className="text-2xl text-purple-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Response</span>
              <span className="text-sm text-gray-900">120ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm text-green-600">0.01%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Load Score</span>
              <span className="text-sm text-gray-900">8.5/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings

