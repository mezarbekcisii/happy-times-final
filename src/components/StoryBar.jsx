import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaCamera } from 'react-icons/fa'
import StoryViewer from './StoryViewer'

const StoryBar = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  // Mock stories data
  const stories = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Elif Yılmaz',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      },
      slides: [
        {
          id: 1,
          type: 'image',
          content: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
          text: 'Bugün harika bir sergi ziyareti! 🎨',
          timestamp: '2 saat önce',
          likes: 24,
          comments: 8,
          views: 156
        },
        {
          id: 2,
          type: 'text',
          title: 'Güzel Gün!',
          content: 'HappyTime\'da herkesle tanışmak çok güzel! ✨',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          timestamp: '1 saat önce',
          likes: 18,
          comments: 5,
          views: 89
        }
      ],
      isViewed: false,
      isActive: true
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Mehmet Kaya',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      slides: [
        {
          id: 3,
          type: 'image',
          content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          text: 'Dağlarda harika bir gün geçirdim! 🏔️',
          timestamp: '4 saat önce',
          likes: 32,
          comments: 12,
          views: 203
        }
      ],
      isViewed: true,
      isActive: false
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Zeynep Demir',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      },
      slides: [
        {
          id: 4,
          type: 'video',
          content: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          text: 'Yoga seansı sonrası huzur! 🧘‍♀️',
          timestamp: '6 saat önce',
          likes: 45,
          comments: 15,
          views: 278
        },
        {
          id: 5,
          type: 'image',
          content: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          text: 'Yeni kitabım geldi! 📚',
          timestamp: '5 saat önce',
          likes: 28,
          comments: 9,
          views: 167
        }
      ],
      isViewed: false,
      isActive: true
    },
    {
      id: 4,
      user: {
        id: 4,
        name: 'Ahmet Öztürk',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      },
      slides: [
        {
          id: 6,
          type: 'image',
          content: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=400',
          text: 'Doktor olarak hayat kurtarmak harika! 👨‍⚕️',
          timestamp: '8 saat önce',
          likes: 67,
          comments: 23,
          views: 445
        }
      ],
      isViewed: true,
      isActive: false
    }
  ]

  const openStoryViewer = (index) => {
    setSelectedStoryIndex(index)
    setIsViewerOpen(true)
  }

  const closeStoryViewer = () => {
    setIsViewerOpen(false)
    setSelectedStoryIndex(null)
  }

  const handleCreateStory = () => {
    console.log('Create story clicked')
    // TODO: Implement story creation
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
          
          {/* Create Story Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateStory}
            className="flex-shrink-0 cursor-pointer"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <FaPlus className="text-xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                <FaCamera className="text-xs" />
              </div>
            </div>
            <p className="text-xs text-gray-700 text-center mt-2 font-medium">Hikaye Ekle</p>
          </motion.div>

          {/* Stories */}
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openStoryViewer(index)}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="relative">
                {/* Story Ring */}
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  story.isViewed 
                    ? 'bg-gray-300' 
                    : story.isActive
                    ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                }`}>
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                
                {/* Active Indicator */}
                {story.isActive && !story.isViewed && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                  />
                )}
                
                {/* Story Count */}
                {story.slides.length > 1 && (
                  <div className="absolute -bottom-1 -right-1 bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {story.slides.length}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-700 text-center mt-2 font-medium truncate w-16">
                {story.user.name.split(' ')[0]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      <StoryViewer
        stories={stories}
        isOpen={isViewerOpen}
        onClose={closeStoryViewer}
        initialStoryIndex={selectedStoryIndex || 0}
      />
    </>
  )
}

export default StoryBar

