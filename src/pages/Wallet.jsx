import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RippleButton, HoverCard, FadeIn, ProgressBar } from '../components/MicroInteractions';
import { useToast } from '../hooks/useToast';

const Wallet = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { showSuccess, showInfo } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [walletBalance, setWalletBalance] = useState(250.75);

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: 'premium',
      amount: -29.99,
      currency: 'USD',
      date: '2024-01-15',
      status: 'completed',
      description: 'Gold Üyelik - Aylık',
      icon: '👑'
    },
    {
      id: 2,
      type: 'boost',
      amount: -9.99,
      currency: 'USD',
      date: '2024-01-12',
      status: 'completed',
      description: 'Profil Boost 24 Saat',
      icon: '🚀'
    },
    {
      id: 3,
      type: 'deposit',
      amount: 100.00,
      currency: 'USD',
      date: '2024-01-10',
      status: 'completed',
      description: 'PayPal ile Para Yatırma',
      icon: '💰'
    },
    {
      id: 4,
      type: 'gift',
      amount: 25.00,
      currency: 'USD',
      date: '2024-01-08',
      status: 'completed',
      description: 'Hediye Kredisi',
      icon: '🎁'
    },
    {
      id: 5,
      type: 'superlike',
      amount: -4.99,
      currency: 'USD',
      date: '2024-01-05',
      status: 'pending',
      description: '5x Süper Beğeni Paketi',
      icon: '⭐'
    }
  ];

  // Crypto portfolo data
  const cryptoPortfolio = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.025,
      value: 1125.50,
      change: '+5.2%',
      icon: '₿',
      color: 'text-orange-500'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 0.5,
      value: 850.00,
      change: '+2.8%',
      icon: '⧫',
      color: 'text-blue-500'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      amount: 500,
      value: 500.00,
      change: '0.0%',
      icon: '💵',
      color: 'text-green-500'
    }
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: 'visa',
      name: 'Visa •••• 4567',
      type: 'Kredi Kartı',
      icon: '💳',
      primary: true
    },
    {
      id: 'paypal',
      name: 'paypal@email.com',
      type: 'PayPal',
      icon: '🅿️',
      primary: false
    },
    {
      id: 'crypto',
      name: 'Crypto Wallet',
      type: 'Bitcoin',
      icon: '₿',
      primary: false
    }
  ];

  const quickActions = [
    {
      id: 'deposit',
      title: 'Para Yatır',
      description: 'Hesabınıza para ekleyin',
      icon: '💰',
      color: 'bg-green-500'
    },
    {
      id: 'withdraw',
      title: 'Para Çek',
      description: 'Hesabınızdan para çekin',
      icon: '💸',
      color: 'bg-blue-500'
    },
    {
      id: 'transfer',
      title: 'Transfer',
      description: 'Başka hesaba gönder',
      icon: '📤',
      color: 'bg-purple-500'
    },
    {
      id: 'exchange',
      title: 'Kripto Değişim',
      description: 'Kripto para alım satım',
      icon: '🔄',
      color: 'bg-orange-500'
    }
  ];

  const handleQuickAction = (actionId) => {
    showInfo(`${actionId} işlemi başlatıldı`);
  };

  return (
    <div className={`min-h-screen ${colors.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <FadeIn direction="up" delay={100}>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              💰 Dijital Cüzdan
            </h1>
            <p className="text-gray-600">
              Ödemelerinizi yönetin, kripto portföyünüzü takip edin
            </p>
          </FadeIn>
        </div>

        {/* Wallet Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FadeIn direction="up" delay={200}>
            <HoverCard hoverEffect="lift">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Ana Bakiye</h3>
                  <span className="text-2xl">💳</span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  ${walletBalance.toFixed(2)}
                </div>
                <p className="text-white/80 text-sm">USD Hesap Bakiyesi</p>
              </div>
            </HoverCard>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <HoverCard hoverEffect="lift">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Kripto Portföy</h3>
                  <span className="text-2xl">₿</span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  ${cryptoPortfolio.reduce((total, coin) => total + coin.value, 0).toFixed(2)}
                </div>
                <p className="text-white/80 text-sm">3 Kripto Para</p>
              </div>
            </HoverCard>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <HoverCard hoverEffect="lift">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Bu Ay Harcama</h3>
                  <span className="text-2xl">📊</span>
                </div>
                <div className="text-3xl font-bold mb-2">$44.97</div>
                <p className="text-white/80 text-sm">5 İşlem</p>
              </div>
            </HoverCard>
          </FadeIn>
        </div>

        {/* Quick Actions */}
        <FadeIn direction="up" delay={500}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Hızlı İşlemler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <HoverCard key={action.id} hoverEffect="lift">
                  <RippleButton
                    onClick={() => handleQuickAction(action.id)}
                    className="w-full h-24 flex flex-col items-center justify-center text-white"
                    style={{ background: action.color }}
                  >
                    <span className="text-2xl mb-1">{action.icon}</span>
                    <span className="text-sm font-medium">{action.title}</span>
                  </RippleButton>
                </HoverCard>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Tabs */}
        <div className="mb-8">
          <FadeIn direction="up" delay={600}>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              {[
                { id: 'overview', label: '📊 Genel Bakış', icon: '📊' },
                { id: 'transactions', label: '📋 İşlemler', icon: '📋' },
                { id: 'crypto', label: '₿ Kripto', icon: '₿' },
                { id: 'methods', label: '💳 Ödeme', icon: '💳' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <FadeIn direction="up" delay={700}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Spending Chart */}
              <HoverCard hoverEffect="glow">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Harcama Analizi</h3>
                  <div className="space-y-4">
                    {[
                      { category: 'Premium Üyelik', amount: 29.99, percentage: 67, color: 'bg-purple-500' },
                      { category: 'Boost & Özellikler', amount: 9.99, percentage: 22, color: 'bg-blue-500' },
                      { category: 'Süper Beğeni', amount: 4.99, percentage: 11, color: 'bg-pink-500' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">{item.category}</span>
                          <span className="text-gray-900 font-bold">${item.amount}</span>
                        </div>
                        <ProgressBar 
                          progress={item.percentage} 
                          color="primary" 
                          showPercentage={false} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>

              {/* Recent Activity */}
              <HoverCard hoverEffect="glow">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">🕒 Son Aktiviteler</h3>
                  <div className="space-y-4">
                    {transactions.slice(0, 4).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{transaction.icon}</span>
                          <div>
                            <p className="font-medium text-gray-800">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </div>
          </FadeIn>
        )}

        {activeTab === 'transactions' && (
          <FadeIn direction="up" delay={700}>
            <HoverCard hoverEffect="glow">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800">📋 Tüm İşlemler</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlem
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tutar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{transaction.icon}</span>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.description}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {transaction.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-bold ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)} {transaction.currency}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {transaction.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </HoverCard>
          </FadeIn>
        )}

        {activeTab === 'crypto' && (
          <FadeIn direction="up" delay={700}>
            <div className="space-y-6">
              <HoverCard hoverEffect="glow">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">₿ Kripto Portföy</h3>
                    <RippleButton variant="primary" size="sm">
                      Kripto Al/Sat
                    </RippleButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cryptoPortfolio.map((crypto, index) => (
                      <HoverCard key={crypto.symbol} hoverEffect="lift">
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                              <div>
                                <p className="font-bold text-gray-800">{crypto.symbol}</p>
                                <p className="text-sm text-gray-500">{crypto.name}</p>
                              </div>
                            </div>
                            <span className={`text-sm font-medium px-2 py-1 rounded ${
                              crypto.change.startsWith('+') 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {crypto.change}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-bold text-gray-800">
                              ${crypto.value.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {crypto.amount} {crypto.symbol}
                            </p>
                          </div>
                        </div>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </HoverCard>

              {/* Crypto News/Info */}
              <HoverCard hoverEffect="glow">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">📰 Kripto Haberleri</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-1">Bitcoin Yeni Zirve Yaptı</h5>
                      <p className="text-sm text-gray-600">BTC son 24 saatte %5.2 artış gösterdi...</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-1">Ethereum 2.0 Güncellemesi</h5>
                      <p className="text-sm text-gray-600">ETH ağında yeni güncellemeler...</p>
                    </div>
                  </div>
                </div>
              </HoverCard>
            </div>
          </FadeIn>
        )}

        {activeTab === 'methods' && (
          <FadeIn direction="up" delay={700}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Methods */}
              <HoverCard hoverEffect="glow">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">💳 Ödeme Yöntemleri</h3>
                    <RippleButton variant="primary" size="sm">
                      Yeni Ekle
                    </RippleButton>
                  </div>
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-medium text-gray-800">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {method.primary && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Varsayılan
                            </span>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">⋮</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>

              {/* Security & Settings */}
              <HoverCard hoverEffect="glow">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">🔒 Güvenlik Ayarları</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-500 text-2xl">✅</span>
                        <div>
                          <p className="font-medium text-gray-800">İki Faktörlü Doğrulama</p>
                          <p className="text-sm text-gray-500">Hesabınız korunuyor</p>
                        </div>
                      </div>
                      <button className="text-green-600 hover:text-green-700">
                        Yönet
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 text-2xl">🔔</span>
                        <div>
                          <p className="font-medium text-gray-800">İşlem Bildirimleri</p>
                          <p className="text-sm text-gray-500">Email ve SMS bildirimleri</p>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700">
                        Ayarla
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 text-2xl">💰</span>
                        <div>
                          <p className="font-medium text-gray-800">Harcama Limiti</p>
                          <p className="text-sm text-gray-500">Aylık limit belirleyin</p>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700">
                        Düzenle
                      </button>
                    </div>
                  </div>
                </div>
              </HoverCard>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default Wallet;

