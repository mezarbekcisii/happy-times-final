import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaVideo, 
  FaVideoSlash, 
  FaMicrophone, 
  FaMicrophoneSlash,
  FaPhone,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaCog,
  FaComment,
  FaHeart
} from 'react-icons/fa'

const VideoCall = ({ isOpen, onClose, contact, type = 'video' }) => {
  const [callStatus, setCallStatus] = useState('connecting') // connecting, ringing, active, ended
  const [isVideoEnabled, setIsVideoEnabled] = useState(type === 'video')
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const callTimer = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Simulate call flow
      setCallStatus('connecting')
      
      setTimeout(() => {
        setCallStatus('ringing')
      }, 1000)
      
      setTimeout(() => {
        setCallStatus('active')
        startCallTimer()
      }, 3000)
      
      // Request media permissions
      if (isVideoEnabled) {
        requestMedia()
      }
    }
    
    return () => {
      if (callTimer.current) {
        clearInterval(callTimer.current)
      }
    }
  }, [isOpen, isVideoEnabled])

  const requestMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: isVideoEnabled, 
        audio: true 
      })
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Media access denied:', error)
    }
  }

  const startCallTimer = () => {
    callTimer.current = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    setCallStatus('ended')
    if (callTimer.current) {
      clearInterval(callTimer.current)
    }
    
    setTimeout(() => {
      onClose()
      setCallDuration(0)
      setCallStatus('connecting')
    }, 2000)
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
  }

  const toggleSpeaker = () => {
    setIsSpeakerEnabled(!isSpeakerEnabled)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        <div className={`relative w-full h-full ${isFullscreen ? '' : 'max-w-4xl max-h-3xl'} bg-black rounded-lg overflow-hidden`}>
          
          {/* Remote Video */}
          <div className="relative w-full h-full">
            {callStatus === 'active' ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {type === 'video' ? (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    poster={contact?.avatar}
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-6">
                    <img
                      src={contact?.avatar}
                      alt={contact?.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                    <h2 className="text-3xl font-bold text-white">{contact?.name}</h2>
                    <p className="text-xl text-gray-300">Sesli arama</p>
                  </div>
                )}
                
                {/* Call Duration */}
                <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                  <span className="font-mono text-lg">{formatDuration(callDuration)}</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center">
                  <motion.img
                    src={contact?.avatar}
                    alt={contact?.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-2xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h2 className="text-3xl font-bold text-white mb-2">{contact?.name}</h2>
                  <motion.p
                    className="text-xl text-gray-300"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {callStatus === 'connecting' ? 'Bağlanıyor...' : 'Arıyor...'}
                  </motion.p>
                  
                  {/* Ringing Animation */}
                  {callStatus === 'ringing' && (
                    <motion.div
                      className="mt-8 flex justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Local Video (Picture in Picture) */}
          {type === 'video' && callStatus === 'active' && isVideoEnabled && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-6 right-6 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg"
            >
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                Sen
              </div>
            </motion.div>
          )}

          {/* Call Status Overlay */}
          {callStatus === 'ended' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center text-white">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  📞
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Arama Sona Erdi</h3>
                <p className="text-gray-300">Süre: {formatDuration(callDuration)}</p>
              </div>
            </motion.div>
          )}

          {/* Controls */}
          <AnimatePresence>
            {(showControls || callStatus !== 'active') && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-4">
                  
                  {/* Video Toggle */}
                  {type === 'video' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleVideo}
                      className={`p-4 rounded-full transition-all duration-200 ${
                        isVideoEnabled 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                    </motion.button>
                  )}

                  {/* Audio Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleAudio}
                    className={`p-4 rounded-full transition-all duration-200 ${
                      isAudioEnabled 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                  </motion.button>

                  {/* End Call */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleEndCall}
                    className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                  >
                    <FaPhone className="transform rotate-135" />
                  </motion.button>

                  {/* Speaker Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSpeaker}
                    className={`p-4 rounded-full transition-all duration-200 ${
                      isSpeakerEnabled 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isSpeakerEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
                  </motion.button>

                  {/* Fullscreen Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all duration-200"
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Controls */}
          {callStatus === 'active' && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  title="Mesaj gönder"
                >
                  <FaComment />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  title="Kalp gönder"
                >
                  <FaHeart className="text-red-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  title="Ayarlar"
                >
                  <FaCog />
                </motion.button>
              </div>
            </div>
          )}

          {/* Auto-hide controls */}
          <div 
            className="absolute inset-0 cursor-pointer"
            onMouseMove={() => {
              setShowControls(true)
              setTimeout(() => setShowControls(false), 3000)
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VideoCall

