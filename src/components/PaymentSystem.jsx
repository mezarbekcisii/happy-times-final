import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { RippleButton, LoadingSpinner, HoverCard, FadeIn } from './MicroInteractions';
import { useToast } from '../hooks/useToast';

// Payment Methods Data
const paymentMethods = {
  cards: {
    name: 'Kredi/Banka Kartları',
    icon: '💳',
    methods: [
      { id: 'visa', name: 'Visa', icon: '🔵', color: 'bg-blue-600' },
      { id: 'mastercard', name: 'Mastercard', icon: '🔴', color: 'bg-red-600' },
      { id: 'amex', name: 'American Express', icon: '🟢', color: 'bg-green-600' },
      { id: 'troy', name: 'Troy', icon: '🇹🇷', color: 'bg-red-500' }
    ]
  },
  digital: {
    name: 'Dijital Cüzdanlar',
    icon: '📱',
    methods: [
      { id: 'paypal', name: 'PayPal', icon: '🅿️', color: 'bg-blue-500' },
      { id: 'enpara', name: 'Enpara.com', icon: '🏦', color: 'bg-orange-500' },
      { id: 'papara', name: 'Papara', icon: '💜', color: 'bg-purple-500' },
      { id: 'paycell', name: 'Paycell', icon: '📲', color: 'bg-teal-500' },
      { id: 'applepay', name: 'Apple Pay', icon: '🍎', color: 'bg-gray-800' },
      { id: 'googlepay', name: 'Google Pay', icon: '🔵', color: 'bg-blue-500' },
      { id: 'samsungpay', name: 'Samsung Pay', icon: '📱', color: 'bg-blue-600' }
    ]
  },
  crypto: {
    name: 'Kripto Paralar (Blockchain)',
    icon: '₿',
    methods: [
      { id: 'bitcoin', name: 'Bitcoin (BTC)', icon: '₿', color: 'bg-orange-500' },
      { id: 'ethereum', name: 'Ethereum (ETH)', icon: '⧫', color: 'bg-blue-600' },
      { id: 'usdt', name: 'Tether (USDT)', icon: '💵', color: 'bg-green-600' },
      { id: 'bnb', name: 'Binance Coin (BNB)', icon: '🟡', color: 'bg-yellow-500' },
      { id: 'ada', name: 'Cardano (ADA)', icon: '🔷', color: 'bg-blue-500' },
      { id: 'doge', name: 'Dogecoin (DOGE)', icon: '🐕', color: 'bg-yellow-600' },
      { id: 'matic', name: 'Polygon (MATIC)', icon: '🟣', color: 'bg-purple-600' },
      { id: 'sol', name: 'Solana (SOL)', icon: '☀️', color: 'bg-purple-500' }
    ]
  },
  bank: {
    name: 'Banka Transferi',
    icon: '🏦',
    methods: [
      { id: 'iban', name: 'IBAN Transferi', icon: '🏦', color: 'bg-blue-700' },
      { id: 'eft', name: 'EFT', icon: '💰', color: 'bg-green-700' },
      { id: 'havale', name: 'Havale', icon: '📤', color: 'bg-indigo-600' },
      { id: 'swift', name: 'SWIFT Transfer', icon: '🌍', color: 'bg-purple-700' }
    ]
  },
  mobile: {
    name: 'Mobil Ödemeler',
    icon: '📱',
    methods: [
      { id: 'googleplay', name: 'Google Play', icon: '🎮', color: 'bg-green-600' },
      { id: 'appstore', name: 'App Store', icon: '🍎', color: 'bg-blue-600' },
      { id: 'turkcell', name: 'Turkcell Cüzdan', icon: '📞', color: 'bg-yellow-600' },
      { id: 'vodafone', name: 'Vodafone Cüzdan', icon: '🔴', color: 'bg-red-600' },
      { id: 'avea', name: 'Türk Telekom Cüzdan', icon: '🔵', color: 'bg-blue-700' }
    ]
  },
  alternative: {
    name: 'Alternatif Ödeme',
    icon: '🔄',
    methods: [
      { id: 'qr', name: 'QR Code', icon: '📱', color: 'bg-gray-700' },
      { id: 'nfc', name: 'NFC Ödeme', icon: '📡', color: 'bg-blue-500' },
      { id: 'gift', name: 'Hediye Kartı', icon: '🎁', color: 'bg-pink-500' },
      { id: 'points', name: 'Puan Kullan', icon: '⭐', color: 'bg-yellow-500' }
    ]
  }
};

// Subscription Plans
const subscriptionPlans = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: { monthly: 9.99, yearly: 99.99 },
    currency: 'USD',
    features: [
      '5 Süper Beğeni/Gün',
      'Temel Filtreler',
      '10 Chat/Gün',
      'Reklamsız Deneyim'
    ],
    color: 'from-amber-600 to-orange-600',
    popular: false
  },
  {
    id: 'silver',
    name: 'Silver',
    price: { monthly: 19.99, yearly: 199.99 },
    currency: 'USD',
    features: [
      '15 Süper Beğeni/Gün',
      'Gelişmiş Filtreler',
      'Sınırsız Chat',
      'Kimlik Doğrulama',
      'Profil Artırma'
    ],
    color: 'from-gray-500 to-gray-600',
    popular: false
  },
  {
    id: 'gold',
    name: 'Gold',
    price: { monthly: 29.99, yearly: 299.99 },
    currency: 'USD',
    features: [
      'Sınırsız Süper Beğeni',
      'Premium Filtreler',
      'Video Chat',
      'Gizli Profil Görüntüleme',
      'Öncelikli Destek',
      'Özel Rozetler'
    ],
    color: 'from-yellow-500 to-yellow-600',
    popular: true
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: { monthly: 49.99, yearly: 499.99 },
    currency: 'USD',
    features: [
      'Tüm Gold Özellikler',
      'AI Uyumluluk Analizi',
      'Kişisel Matchmaker',
      'Premium Etkinlikler',
      'VIP Destek',
      'Özel Temalar'
    ],
    color: 'from-slate-600 to-slate-700',
    popular: false
  }
];

export const PaymentModal = ({ isOpen, onClose, selectedPlan, billingType }) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  if (!isOpen) return null;

  const plan = subscriptionPlans.find(p => p.id === selectedPlan);
  const price = plan ? plan.price[billingType] : 0;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      showSuccess('🎉 Ödeme başarıyla tamamlandı!');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${colors.glassEffect} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">💳 Ödeme Sistemi</h2>
              <p className="text-white/80">
                {plan?.name} Üyelik - {price} {plan?.currency} ({billingType === 'monthly' ? 'Aylık' : 'Yıllık'})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step
                      ? 'bg-white text-purple-600'
                      : 'bg-white/30 text-white/50'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Payment Method Selection */}
          {currentStep === 1 && (
            <FadeIn>
              <h3 className="text-xl font-bold text-gray-800 mb-6">1️⃣ Ödeme Yöntemi Seçin</h3>
              <div className="space-y-6">
                {Object.entries(paymentMethods).map(([categoryId, category]) => (
                  <div key={categoryId}>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="text-2xl mr-2">{category.icon}</span>
                      {category.name}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {category.methods.map((method) => (
                        <HoverCard key={method.id} hoverEffect="lift">
                          <button
                            onClick={() => {
                              setSelectedMethod(method);
                              setSelectedCategory(categoryId);
                              setCurrentStep(2);
                            }}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              selectedMethod?.id === method.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-white text-xl mb-2 mx-auto`}>
                              {method.icon}
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center">
                              {method.name}
                            </p>
                          </button>
                        </HoverCard>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Step 2: Payment Details */}
          {currentStep === 2 && selectedMethod && (
            <FadeIn>
              <div className="mb-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-purple-600 hover:text-purple-700 flex items-center mb-4"
                >
                  ← Geri
                </button>
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  2️⃣ {selectedMethod.name} Bilgileri
                  <span className={`ml-3 w-8 h-8 ${selectedMethod.color} rounded-lg flex items-center justify-center text-white`}>
                    {selectedMethod.icon}
                  </span>
                </h3>
              </div>

              <PaymentForm 
                method={selectedMethod}
                category={selectedCategory}
                onNext={() => setCurrentStep(3)}
                onDataChange={setPaymentData}
              />
            </FadeIn>
          )}

          {/* Step 3: Payment Confirmation */}
          {currentStep === 3 && (
            <FadeIn>
              <div className="mb-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-purple-600 hover:text-purple-700 flex items-center mb-4"
                >
                  ← Geri
                </button>
                <h3 className="text-xl font-bold text-gray-800">3️⃣ Ödeme Onayı</h3>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">📋 Sipariş Özeti</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-semibold">{plan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Faturalama:</span>
                    <span>{billingType === 'monthly' ? 'Aylık' : 'Yıllık'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ödeme Yöntemi:</span>
                    <span className="flex items-center">
                      <span className={`w-5 h-5 ${selectedMethod?.color} rounded mr-2 flex items-center justify-center text-white text-xs`}>
                        {selectedMethod?.icon}
                      </span>
                      {selectedMethod?.name}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam:</span>
                      <span>{price} {plan?.currency}</span>
                    </div>
                  </div>
                </div>
              </div>

              <RippleButton
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 text-lg font-bold"
                variant="primary"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" color="white" />
                    <span className="ml-2">Ödeme İşleniyor...</span>
                  </div>
                ) : (
                  `💳 ${price} ${plan?.currency} Öde`
                )}
              </RippleButton>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ method, category, onNext, onDataChange }) => {
  const [formData, setFormData] = useState({});

  const updateData = (key, value) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const renderCardForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => updateData('cardNumber', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Son Kullanma</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => updateData('expiry', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => updateData('cvv', e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Kart Sahibi</label>
        <input
          type="text"
          placeholder="Ad Soyad"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => updateData('cardHolder', e.target.value)}
        />
      </div>
    </div>
  );

  const renderCryptoForm = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="font-semibold text-blue-800 mb-2">🔐 Blockchain Ödeme</h5>
        <p className="text-blue-700 text-sm">
          {method.name} ile ödeme yapmak için aşağıdaki cüzdan adresini kullanın.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cüzdan Adresi</label>
        <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm break-all">
          1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">İşlem Hash (Opsiyonel)</label>
        <input
          type="text"
          placeholder="İşlem hash'ini buraya yapıştırın"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => updateData('txHash', e.target.value)}
        />
      </div>
    </div>
  );

  const renderBankForm = () => (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h5 className="font-semibold text-green-800 mb-2">🏦 Banka Bilgileri</h5>
        <div className="text-green-700 text-sm space-y-1">
          <p><strong>Banka:</strong> HappyTime Bank</p>
          <p><strong>IBAN:</strong> TR12 3456 7890 1234 5678 9012 34</p>
          <p><strong>Hesap Adı:</strong> HappyTime Platform Ltd.</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gönderen Adı</label>
        <input
          type="text"
          placeholder="Transfer yapan kişinin adı"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => updateData('senderName', e.target.value)}
        />
      </div>
    </div>
  );

  const renderMobileForm = () => (
    <div className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h5 className="font-semibold text-purple-800 mb-2">📱 Mobil Ödeme</h5>
        <p className="text-purple-700 text-sm">
          {method.name} üzerinden güvenli ödeme yapacaksınız.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası</label>
        <input
          type="tel"
          placeholder="+90 555 123 4567"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => updateData('phone', e.target.value)}
        />
      </div>
    </div>
  );

  const renderForm = () => {
    switch (category) {
      case 'cards':
        return renderCardForm();
      case 'crypto':
        return renderCryptoForm();
      case 'bank':
        return renderBankForm();
      case 'mobile':
        return renderMobileForm();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Bu ödeme yöntemi için form hazırlanıyor...</p>
          </div>
        );
    }
  };

  return (
    <div>
      {renderForm()}
      <div className="mt-6">
        <RippleButton
          onClick={onNext}
          className="w-full py-3"
          variant="primary"
        >
          Devam Et →
        </RippleButton>
      </div>
    </div>
  );
};

export { subscriptionPlans, paymentMethods };
export default PaymentModal;

