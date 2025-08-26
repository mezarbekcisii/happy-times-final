import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaPlay, 
  FaPause, 
  FaChevronLeft, 
  FaChevronRight,
  FaTimes,
  FaHeart,
  FaComment,
  FaShare,
  FaEye,
  FaVolumeMute,
  FaVolumeUp,
  FaMoreVertical
} from 'react-icons/fa'

const StoryViewer = ({ stories, isOpen, onClose, initialStoryIndex = 0 }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showViewers, setShowViewers] = useState(false)
  
  const progressInterval = useRef(null)
  const storyDuration = 5000 // 5 seconds per story

  const currentStory = stories[currentStoryIndex]
  const currentSlide = currentStory?.slides[currentSlideIndex]

  useEffect(() => {
    if (isOpen && isPlaying) {
      startProgress()
    } else {
      stopProgress()
    }

    return () => stopProgress()
  }, [isOpen, isPlaying, currentStoryIndex, currentSlideIndex])

  const startProgress = () => {
    stopProgress()
    setProgress(0)
    
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + (100 / (storyDuration / 100))
      })
    }, 100)
  }

  const stopProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  const nextSlide = () => {
    if (currentSlideIndex < currentStory.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1)
      setProgress(0)
    } else {
      nextStory()
    }
  }

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1)
      setProgress(0)
    } else {
      prevStory()
    }
  }

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setCurrentSlideIndex(0)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      setCurrentSlideIndex(currentStory.slides.length - 1)
      setProgress(0)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleStoryTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    
    if (x < width / 3) {
      prevSlide()
    } else if (x > (2 * width) / 3) {
      nextSlide()
    } else {
      togglePlayPause()
    }
  }

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevSlide()
        break
      case 'ArrowRight':
        nextSlide()
        break
      case ' ':
        togglePlayPause()
        break
      case 'Escape':
        onClose()
        break
    }
  }

  const likeStory = () => {
    console.log('Story liked')
    // Add like animation
  }

  const shareStory = () => {
    console.log('Story shared')
  }

  if (!isOpen || !currentStory) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        {/* Story Content */}
        <div className="relative w-full max-w-md h-full bg-black">
          
          {/* Progress Bars */}
          <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
            {currentStory.slides.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: index < currentSlideIndex 
                      ? '100%' 
                      : index === currentSlideIndex 
                      ? `${progress}%` 
                      : '0%'
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentStory.user.avatar}
                alt={currentStory.user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div>
                <div className="text-white font-semibold text-sm">{currentStory.user.name}</div>
                <div className="text-white/70 text-xs">{currentSlide.timestamp}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="p-2 text-white/80 hover:text-white"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-white/80 hover:text-white"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-white/80 hover:text-white"
              >
                <FaMoreVertical />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white"
              >
                <FaTimes />
              </motion.button>
            </div>
          </div>

          {/* Story Content */}
          <motion.div
            key={`${currentStoryIndex}-${currentSlideIndex}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full h-full cursor-pointer"
            onClick={handleStoryTap}
          >
            {currentSlide.type === 'image' ? (
              <img
                src={currentSlide.content}
                alt="Story"
                className="w-full h-full object-cover"
              />
            ) : currentSlide.type === 'video' ? (
              <video
                src={currentSlide.content}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center text-white text-center p-8"
                style={{ 
                  background: currentSlide.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">{currentSlide.title}</h2>
                  <p className="text-lg">{currentSlide.content}</p>
                </div>
              </div>
            )}

            {/* Text Overlay */}
            {currentSlide.text && (
              <div className="absolute bottom-20 left-4 right-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-lg font-medium text-center bg-black/50 backdrop-blur-sm rounded-lg p-3"
                >
                  {currentSlide.text}
                </motion.p>
              </div>
            )}
          </motion.div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white/60 hover:text-white bg-black/30 rounded-full"
          >
            <FaChevronLeft />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white/60 hover:text-white bg-black/30 rounded-full"
          >
            <FaChevronRight />
          </motion.button>

          {/* Bottom Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={likeStory}
                className="flex items-center space-x-2 text-white/80 hover:text-red-400 transition-colors"
              >
                <FaHeart />
                <span className="text-sm">{currentSlide.likes || 0}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <FaComment />
                <span className="text-sm">{currentSlide.comments || 0}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={shareStory}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaShare />
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowViewers(true)}
              className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors text-sm"
            >
              <FaEye />
              <span>{currentSlide.views || 0}</span>
            </motion.button>
          </div>

          {/* Story Input */}
          <div className="absolute bottom-16 left-4 right-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`${currentStory.user.name} kişisine mesaj gönder...`}
                className="flex-1 bg-black/50 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <FaHeart />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Viewers Modal */}
        <AnimatePresence>
          {showViewers && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center p-4"
              onClick={() => setShowViewers(false)}
            >
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-t-2xl w-full max-w-md max-h-96 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Görüntüleyenler</h4>
                    <button
                      onClick={() => setShowViewers(false)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{currentSlide.views || 0} kişi görüntüledi</p>
                </div>
                
                <div className="max-h-64 overflow-y-auto p-4">
                  {/* Mock viewers data */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center space-x-3 py-2">
                      <img
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=40`}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Kullanıcı {i}</div>
                        <div className="text-xs text-gray-500">5 dakika önce</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

export default StoryViewer

