import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, 
  FaEllipsisV, 
  FaPaperPlane, 
  FaPhone, 
  FaVideo, 
  FaImage,
  FaSmile,
  FaPaperclip,
  FaMicrophone,
  FaHeart,
  FaThumbsUp,
  FaReply,
  FaTrash,
  FaEdit,
  FaCopy,
  FaTimes,
  FaArrowLeft,
  FaCamera,
  FaFile,
  FaMapMarkerAlt,
  FaGift
} from 'react-icons/fa'
import Logo from '../components/Logo'
import VideoCall from '../components/VideoCall'

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)
  const [callType, setCallType] = useState('video')
  const messagesEndRef = useRef(null)

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      lastMessage: 'Merhaba! Eşleştik! 😊',
      time: '14:30',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
      online: true,
      typing: false,
      premium: 'gold',
      verified: true
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      lastMessage: 'Yarın buluşalım mı? ☕',
      time: '13:45',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
      online: false,
      typing: false,
      premium: 'silver',
      verified: false
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      lastMessage: 'Çok teşekkürler! 🙏',
      time: '12:20',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
      online: true,
      typing: true,
      premium: 'free',
      verified: true
    },
    {
      id: 4,
      name: 'Ahmet Öztürk',
      lastMessage: 'Harika bir akşamdı! 🌟',
      time: '11:15',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
      online: false,
      typing: false,
      premium: 'platinum',
      verified: true
    }
  ]

  // Mock messages for selected chat
  const mockMessages = {
    1: [
      {
        id: 1,
        sender: 'them',
        text: 'Merhaba! Eşleştik! 😊',
        time: '14:30',
        type: 'text',
        reactions: [{ emoji: '❤️', count: 1, users: ['me'] }],
        read: true
      },
      {
        id: 2,
        sender: 'me',
        text: 'Merhaba Elif! Çok güzel profilin var 🌟',
        time: '14:32',
        type: 'text',
        reactions: [],
        read: true
      },
      {
        id: 3,
        sender: 'them',
        text: 'Teşekkür ederim! Sen de çok ilginç biri gibi görünüyorsun',
        time: '14:33',
        type: 'text',
        reactions: [{ emoji: '👍', count: 1, users: ['me'] }],
        read: true
      },
      {
        id: 4,
        sender: 'me',
        text: 'Sanat ve kahve tutkun varmış, ben de çok severim! ☕🎨',
        time: '14:35',
        type: 'text',
        reactions: [],
        read: true
      },
      {
        id: 5,
        sender: 'them',
        text: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300',
        time: '14:37',
        type: 'image',
        caption: 'Bu sabah gittiğim sergiden 🎨',
        reactions: [{ emoji: '😍', count: 1, users: ['me'] }],
        read: true
      },
      {
        id: 6,
        sender: 'me',
        text: 'Vay be, harika! Hangi sanatçının eseri bu?',
        time: '14:38',
        type: 'text',
        reactions: [],
        read: false
      }
    ]
  }

  // Popular emojis
  const popularEmojis = ['😊', '😍', '🥰', '😘', '🤗', '😂', '❤️', '💕', '🔥', '👍', '🙌', '🎉', '☕', '🌟', '💯', '🌹']

  const membershipIcons = {
    free: '🆓',
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎'
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages[selectedChat.id] || [])
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        text: message,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        reactions: [],
        read: false,
        replyTo: replyingTo
      }
      
      setMessages(prev => [...prev, newMessage])
      setMessage('')
      setReplyingTo(null)
      
      // Simulate typing indicator and response
      setTimeout(() => {
        setTyping(true)
        setTimeout(() => {
          setTyping(false)
          const responses = [
            'Çok güzel! 😊',
            'Haklısın! 👍',
            'Kesinlikle! ✨',
            'Çok ilginç 🤔',
            'Haha, aynen! 😄'
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          
          const responseMessage = {
            id: Date.now() + 1,
            sender: 'them',
            text: randomResponse,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            type: 'text',
            reactions: [],
            read: true
          }
          
          setMessages(prev => [...prev, responseMessage])
        }, 1000 + Math.random() * 2000)
      }, 500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleMessageReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji)
        if (existingReaction) {
          if (existingReaction.users.includes('me')) {
            // Remove reaction
            return {
              ...msg,
              reactions: msg.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== 'me') }
                  : r
              ).filter(r => r.count > 0)
            }
          } else {
            // Add reaction
            return {
              ...msg,
              reactions: msg.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count + 1, users: [...r.users, 'me'] }
                  : r
              )
            }
          }
        } else {
          // New reaction
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1, users: ['me'] }]
          }
        }
      }
      return msg
    }))
    setSelectedMessage(null)
  }

  const handleFileUpload = (type) => {
    // Simulate file upload
    console.log(`Uploading ${type}...`)
    setShowAttachMenu(false)
    
    // Mock file message
    const fileMessage = {
      id: Date.now(),
      sender: 'me',
      text: type === 'image' ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300' : 'document.pdf',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      type: type,
      caption: type === 'image' ? 'Güzel bir manzara 🌄' : undefined,
      reactions: [],
      read: false
    }
    
    setMessages(prev => [...prev, fileMessage])
  }

  const renderMessage = (msg) => {
    const isMe = msg.sender === 'me'
    
    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}
      >
        <div className={`max-w-xs lg:max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
          {/* Reply indicator */}
          {msg.replyTo && (
            <div className={`text-xs text-gray-500 mb-1 px-2 ${isMe ? 'text-right' : 'text-left'}`}>
              Yanıtlanan: "{msg.replyTo.text?.substring(0, 30)}..."
            </div>
          )}
          
          <div
            className={`relative px-4 py-2 rounded-2xl cursor-pointer ${
              isMe
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-br-md'
                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
            }`}
            onClick={() => setSelectedMessage(selectedMessage === msg.id ? null : msg.id)}
          >
            {/* Message content */}
            {msg.type === 'text' && (
              <p className="text-sm break-words">{msg.text}</p>
            )}
            
            {msg.type === 'image' && (
              <div>
                <img 
                  src={msg.text} 
                  alt="Shared" 
                  className="rounded-lg max-w-full h-auto mb-2"
                />
                {msg.caption && (
                  <p className="text-sm">{msg.caption}</p>
                )}
              </div>
            )}
            
            {msg.type === 'file' && (
              <div className="flex items-center space-x-2">
                <FaFile className="text-blue-500" />
                <span className="text-sm">{msg.text}</span>
              </div>
            )}
            
            {/* Time and read status */}
            <div className={`flex items-center justify-end space-x-1 mt-1`}>
              <span className={`text-xs ${
                isMe ? 'text-white/70' : 'text-gray-500'
              }`}>
                {msg.time}
              </span>
              {isMe && (
                <div className={`text-xs ${
                  msg.read ? 'text-blue-300' : 'text-white/70'
                }`}>
                  {msg.read ? '✓✓' : '✓'}
                </div>
              )}
            </div>
            
            {/* Reactions */}
            {msg.reactions.length > 0 && (
              <div className="absolute -bottom-2 left-2 flex space-x-1">
                {msg.reactions.map((reaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs flex items-center space-x-1 shadow-sm"
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-gray-600">{reaction.count}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Message actions */}
          <AnimatePresence>
            {selectedMessage === msg.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`mt-2 flex space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMessageReaction(msg.id, '❤️')}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <FaHeart className="text-sm" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMessageReaction(msg.id, '👍')}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <FaThumbsUp className="text-sm" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setReplyingTo(msg)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FaReply className="text-sm" />
                </motion.button>
                {isMe && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors"
                    >
                      <FaEdit className="text-sm" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    >
                      <FaTrash className="text-sm" />
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-white/50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <Logo size="md" />
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{conversations.filter(c => c.unread > 0).length}</span> yeni
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">💬 Sohbetler</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Sohbet ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation)}
                className={`p-4 border-b border-gray-100/50 cursor-pointer hover:bg-white/60 transition-all duration-200 ${
                  selectedChat?.id === conversation.id ? 'bg-orange-100/50 border-l-4 border-l-orange-500' : ''
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    {/* Online status */}
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                    {/* Premium badge */}
                    {conversation.premium !== 'free' && (
                      <div className="absolute -top-1 -right-1 text-xs">
                        {membershipIcons[conversation.premium]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {conversation.name}
                        </h3>
                        {conversation.verified && (
                          <div className="text-blue-500 text-xs">✓</div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        conversation.typing ? 'text-blue-600 italic' : 'text-gray-600'
                      }`}>
                        {conversation.typing ? 'yazıyor...' : conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2"
                        >
                          {conversation.unread}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden p-2 text-gray-600 hover:text-orange-600 rounded-lg"
                    >
                      <FaArrowLeft />
                    </motion.button>
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-semibold text-gray-900">{selectedChat.name}</h2>
                        {selectedChat.verified && (
                          <div className="text-blue-500">✓</div>
                        )}
                        {selectedChat.premium !== 'free' && (
                          <span className="text-sm">{membershipIcons[selectedChat.premium]}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {typing ? (
                          <span className="text-blue-600 italic flex items-center space-x-1">
                            <span>yazıyor</span>
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              ...
                            </motion.span>
                          </span>
                        ) : (
                          selectedChat.online ? 'Çevrimiçi' : 'Çevrimdışı'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setCallType('audio')
                        setIsVideoCallOpen(true)
                      }}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                    >
                      <FaPhone />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setCallType('video')
                        setIsVideoCallOpen(true)
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <FaVideo />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                    >
                      <FaEllipsisV />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => renderMessage(msg))}
                </AnimatePresence>
                
                {/* Typing indicator */}
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-200 rounded-2xl px-4 py-2 rounded-bl-md">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Reply indicator */}
              {replyingTo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2 bg-blue-50 border-l-4 border-blue-500 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs text-blue-600 font-semibold">Yanıtlanıyor:</p>
                    <p className="text-sm text-gray-700 truncate">
                      {replyingTo.text?.substring(0, 50)}...
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setReplyingTo(null)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </motion.button>
                </motion.div>
              )}

              {/* Message Input */}
              <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 p-4">
                <div className="flex items-end space-x-2">
                  {/* Attach Menu */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                    >
                      <FaPaperclip />
                    </motion.button>
                    
                    <AnimatePresence>
                      {showAttachMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 space-y-1"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleFileUpload('image')}
                            className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded-lg"
                          >
                            <FaImage className="text-purple-600" />
                            <span className="text-sm">Fotoğraf</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleFileUpload('camera')}
                            className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded-lg"
                          >
                            <FaCamera className="text-blue-600" />
                            <span className="text-sm">Kamera</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleFileUpload('file')}
                            className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded-lg"
                          >
                            <FaFile className="text-green-600" />
                            <span className="text-sm">Dosya</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded-lg"
                          >
                            <FaMapMarkerAlt className="text-red-600" />
                            <span className="text-sm">Konum</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded-lg"
                          >
                            <FaGift className="text-pink-600" />
                            <span className="text-sm">Hediye</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Mesajınızı yazın..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none bg-white/80 backdrop-blur-sm"
                      rows="1"
                      style={{ maxHeight: '120px' }}
                    />
                    
                    {/* Emoji Button */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1 text-gray-600 hover:text-yellow-600 transition-colors"
                      >
                        <FaSmile />
                      </motion.button>
                    </div>
                  </div>

                  {/* Voice/Send Button */}
                  {message.trim() ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      className="p-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full hover:shadow-lg transition-all duration-200"
                    >
                      <FaPaperPlane />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseDown={() => setIsRecording(true)}
                      onMouseUp={() => setIsRecording(false)}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        isRecording 
                          ? 'bg-red-500 text-white scale-110' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <FaMicrophone />
                    </motion.button>
                  )}
                </div>

                {/* Emoji Picker */}
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200"
                    >
                      <div className="grid grid-cols-8 gap-2">
                        {popularEmojis.map((emoji, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEmojiClick(emoji)}
                            className="p-2 text-xl hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  💬
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  HappyTime Sohbet
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Sol taraftan bir sohbet seçerek mesajlaşmaya başlayın.
                </p>
                <div className="text-sm text-gray-500">
                  💡 İpucu: Emoji, dosya ve sesli mesaj göndererek sohbetlerinizi renklendirin!
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Video Call Modal */}
      <VideoCall
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        contact={selectedChat}
        type={callType}
      />
    </div>
  )
}

export default Chat