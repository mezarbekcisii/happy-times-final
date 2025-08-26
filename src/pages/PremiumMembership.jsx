import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { subscriptionPlans, PaymentModal } from '../components/PaymentSystem';
import { RippleButton, HoverCard, FadeIn, BounceElement } from '../components/MicroInteractions';

const PremiumMembership = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingType, setBillingType] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const features = [
    {
      icon: '💕',
      title: 'Sınırsız Beğeni',
      description: 'İstediğiniz kadar profil beğenin ve eşleşmenizi bulun'
    },
    {
      icon: '🎯',
      title: 'Gelişmiş Filtreler',
      description: 'Yaş, konum, ilgi alanları ve daha fazlasına göre filtreleyin'
    },
    {
      icon: '👑',
      title: 'Öncelikli Görünürlük',
      description: 'Profiliniz daha çok kişi tarafından görülsün'
    },
    {
      icon: '🔍',
      title: 'Kimler Beğendi',
      description: 'Sizi beğenenleri görün ve hemen eşleşin'
    },
    {
      icon: '🎥',
      title: 'Video Chat',
      description: 'Eşleşmelerinizle video görüşme yapın'
    },
    {
      icon: '🤖',
      title: 'AI Uyumluluk',
      description: 'Yapay zeka ile uyumluluk analizi'
    },
    {
      icon: '🌟',
      title: 'Özel Rozetler',
      description: 'Premium üye rozetleri ve özel simgeler'
    },
    {
      icon: '📞',
      title: 'Öncelikli Destek',
      description: '7/24 premium müşteri desteği'
    }
  ];

  const paymentMethods = [
    { name: 'Kredi Kartı', icon: '💳', popular: true },
    { name: 'PayPal', icon: '🅿️', popular: true },
    { name: 'Apple Pay', icon: '🍎', popular: false },
    { name: 'Google Pay', icon: '🔵', popular: false },
    { name: 'Kripto Para', icon: '₿', popular: false },
    { name: 'Banka Transferi', icon: '🏦', popular: false }
  ];

  return (
    <div className={`min-h-screen ${colors.background} pt-20`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <span className="text-white/10 text-2xl">
                {['💎', '👑', '⭐', '💕', '🔥', '✨'][Math.floor(Math.random() * 6)]}
              </span>
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <FadeIn direction="up" delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              👑 Premium <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">HappyTime</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Aşkınızı bulmak için en gelişmiş özelliklere sahip olun. Premium üyelikle sınırsız imkanlar sizinle!
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1">
                <button
                  onClick={() => setBillingType('monthly')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    billingType === 'monthly'
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Aylık
                </button>
                <button
                  onClick={() => setBillingType('yearly')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    billingType === 'yearly'
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Yıllık
                  <span className="ml-2 bg-yellow-400 text-purple-800 px-2 py-1 rounded-full text-xs font-bold">
                    20% İndirim
                  </span>
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <FadeIn direction="up" delay={600}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <FadeIn key={plan.id} direction="up" delay={800 + index * 100}>
                <HoverCard hoverEffect="lift">
                  <div className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden ${
                    plan.popular ? 'ring-4 ring-yellow-400 transform scale-105' : ''
                  }`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 font-bold text-sm">
                        🔥 EN POPÜLER
                      </div>
                    )}
                    
                    <div className={`bg-gradient-to-br ${plan.color} p-6 text-white ${plan.popular ? 'pt-12' : ''}`}>
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold mb-2">
                        ${plan.price[billingType]}
                        <span className="text-lg font-normal">
                          /{billingType === 'monthly' ? 'ay' : 'yıl'}
                        </span>
                      </div>
                      {billingType === 'yearly' && (
                        <p className="text-white/80 text-sm">
                          Aylık ${(plan.price.yearly / 12).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="p-6">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <BounceElement trigger={false}>
                        <RippleButton
                          onClick={() => handlePlanSelect(plan.id)}
                          variant={plan.popular ? 'primary' : 'secondary'}
                          className="w-full py-3 font-bold"
                        >
                          {plan.popular ? '🚀 Hemen Başla' : 'Planı Seç'}
                        </RippleButton>
                      </BounceElement>
                    </div>
                  </div>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn direction="up" delay={1000}>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
              ✨ Premium Özellikler
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} direction="up" delay={1200 + index * 100}>
                <HoverCard hoverEffect="glow">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FadeIn direction="up" delay={1400}>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              💳 Güvenli Ödeme Yöntemleri
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Dilediğiniz ödeme yöntemiyle güvenle ödeyin
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={1600}>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    method.popular 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' 
                      : 'bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium text-gray-700">{method.name}</span>
                  {method.popular && (
                    <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                      POPÜLER
                    </span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={1800}>
            <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-green-600 text-2xl">🔒</span>
                <div>
                  <h4 className="font-bold text-green-800">256-bit SSL Şifreleme</h4>
                  <p className="text-green-700">Tüm ödemeleriniz en yüksek güvenlik standardında korunur</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn direction="up" delay={2000}>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
              ❓ Sıkça Sorulan Sorular
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {[
              {
                q: 'Premium üyeliği iptal edebilir miyim?',
                a: 'Evet, istediğiniz zaman üyeliğinizi iptal edebilirsiniz. İptal ettiğinizde mevcut dönemde premium özelliklerinizi kullanmaya devam edebilirsiniz.'
              },
              {
                q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
                a: 'Kredi kartı, PayPal, Apple Pay, Google Pay, kripto paralar, banka transferi ve mobil ödeme dahil birçok yöntemi destekliyoruz.'
              },
              {
                q: 'Yıllık planla ne kadar tasarruf ederim?',
                a: 'Yıllık planları seçerek %20 tasarruf edebilirsiniz. Ayrıca kesintisiz premium deneyim yaşarsınız.'
              },
              {
                q: 'Premium özellikler hemen aktif olur mu?',
                a: 'Evet! Ödemeniz onaylandıktan hemen sonra tüm premium özellikler hesabınızda aktif hale gelir.'
              }
            ].map((faq, index) => (
              <FadeIn key={index} direction="up" delay={2200 + index * 100}>
                <HoverCard hoverEffect="lift">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="font-bold text-gray-800 mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPlan={selectedPlan}
        billingType={billingType}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumMembership;

