import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SimpleChat = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')

  // Basit sohbet verileri
  const conversations = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
      lastMessage: 'Merhaba! Nasılsın?',
      time: '2 dakika önce',
      online: true,
      unread: 2
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
      lastMessage: 'Yarın buluşalım mı?',
      time: '1 saat önce',
      online: false,
      unread: 0
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
      lastMessage: 'Teşekkürler! 😊',
      time: '3 saat önce',
      online: true,
      unread: 1
    }
  ]

  // Basit mesaj verileri
  const messages = [
    { id: 1, text: 'Merhaba! Nasılsın?', sender: 'other', time: '14:30' },
    { id: 2, text: 'Merhaba! İyiyim, sen nasılsın?', sender: 'me', time: '14:32' },
    { id: 3, text: 'Ben de iyiyim 😊 Bugün ne yapıyorsun?', sender: 'other', time: '14:33' },
    { id: 4, text: 'Evde dinleniyorum. Sen?', sender: 'me', time: '14:35' }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Mesaj gönderildi:', message)
      setMessage('')
    }
  }

  const handleVideoCall = () => {
    alert('🎥 Video arama başlatılıyor...')
  }

  const handleVoiceCall = () => {
    alert('📞 Sesli arama başlatılıyor...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto h-screen flex">
        
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white/80 backdrop-blur-sm border-r border-gray-200/50">
          {/* Header */}
          <div className="p-6 border-b border-gray-200/50">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💬 Sohbetler
            </h1>
            <p className="text-gray-600 mt-1">Mesajlarınız</p>
          </div>
          
          {/* Search */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Sohbet ara..."
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Conversations List */}
          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                onClick={() => setSelectedChat(conv)}
                className={`p-4 cursor-pointer border-b border-gray-100 ${
                  selectedChat?.id === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  
                  {conv.unread > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedChat.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedChat.online ? 'Çevrimiçi' : 'Son görülme: ' + selectedChat.time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleVoiceCall}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                    >
                      📞
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleVideoCall}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      🎥
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white text-gray-900 shadow-md'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ➤
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            // No chat selected
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sohbet Seçin
                </h3>
                <p className="text-gray-600">
                  Mesajlaşmaya başlamak için sol taraftan bir sohbet seçin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimpleChat

