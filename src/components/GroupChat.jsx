import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUsers, 
  FaPlus, 
  FaCrown,
  FaUserPlus,
  FaUserMinus,
  FaCog,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaMicrophone,
  FaVideo,
  FaInfoCircle,
  FaImage,
  FaTimes
} from 'react-icons/fa'

const GroupChat = ({ group, onBack, onUpdateGroup }) => {
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState(group.name)

  // Mock members data
  const members = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
      role: 'admin',
      online: true,
      lastSeen: 'Çevrimiçi'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
      role: 'member',
      online: false,
      lastSeen: '2 saat önce'
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
      role: 'moderator',
      online: true,
      lastSeen: 'Çevrimiçi'
    },
    {
      id: 4,
      name: 'Ahmet Öztürk',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
      role: 'member',
      online: false,
      lastSeen: '1 gün önce'
    }
  ]

  // Mock potential members to add
  const potentialMembers = [
    {
      id: 5,
      name: 'Ayşe Kara',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50',
      mutual: 3
    },
    {
      id: 6,
      name: 'Can Özkan',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50',
      mutual: 5
    }
  ]

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FaCrown className="text-yellow-500" />
      case 'moderator':
        return <FaCog className="text-blue-500" />
      default:
        return null
    }
  }

  const getRoleText = (role) => {
    switch (role) {
      case 'admin':
        return 'Yönetici'
      case 'moderator':
        return 'Moderatör'
      default:
        return 'Üye'
    }
  }

  const handleSaveGroupName = () => {
    onUpdateGroup({ ...group, name: groupName })
    setIsEditing(false)
  }

  const addMember = (member) => {
    console.log('Adding member:', member)
    setShowAddMember(false)
  }

  const removeMember = (memberId) => {
    console.log('Removing member:', memberId)
  }

  const promoteToModerator = (memberId) => {
    console.log('Promoting member:', memberId)
  }

  return (
    <>
      {/* Group Chat Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 rounded-lg"
            >
              <FaTimes />
            </motion.button>
            
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                <FaUsers />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {members.filter(m => m.online).length}
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="text-lg font-semibold bg-transparent border-b-2 border-orange-500 outline-none"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSaveGroupName}
                      className="text-green-600 hover:text-green-700"
                    >
                      ✓
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setGroupName(group.name)
                        setIsEditing(false)
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      ✕
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900">{group.name}</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditing(true)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="text-sm" />
                    </motion.button>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {members.length} üye • {members.filter(m => m.online).length} çevrimiçi
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              <FaMicrophone />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <FaVideo />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowGroupInfo(true)}
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
            >
              <FaInfoCircle />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Members Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-3">
        <div className="flex items-center space-x-3 overflow-x-auto">
          {/* Add Member Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddMember(true)}
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
          >
            <FaPlus className="text-sm" />
          </motion.button>
          
          {/* Members */}
          {members.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 relative cursor-pointer"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
              />
              {member.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
              {member.role !== 'member' && (
                <div className="absolute -top-1 -right-1 text-xs">
                  {getRoleIcon(member.role)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Group Info Modal */}
      <AnimatePresence>
        {showGroupInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowGroupInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Grup Bilgileri</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGroupInfo(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Group Avatar & Name */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                  <FaUsers />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{group.name}</h4>
                <p className="text-sm text-gray-600">{group.description || 'Grup açıklaması bulunmuyor'}</p>
              </div>

              {/* Group Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{members.length}</div>
                  <div className="text-xs text-gray-600">Üye</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{members.filter(m => m.online).length}</div>
                  <div className="text-xs text-gray-600">Çevrimiçi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-xs text-gray-600">Mesaj</div>
                </div>
              </div>

              {/* Members List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-900">Üyeler ({members.length})</h5>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddMember(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Üye Ekle
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {member.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{member.name}</span>
                            {member.role !== 'member' && getRoleIcon(member.role)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {member.online ? 'Çevrimiçi' : member.lastSeen}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                        >
                          <FaEllipsisV className="text-sm" />
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaImage className="text-blue-500" />
                  <span>Medya ve Dosyalar</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaCog className="text-gray-500" />
                  <span>Grup Ayarları</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 text-left p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <FaTrash className="text-red-500" />
                  <span>Gruptan Ayrıl</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddMember(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Üye Ekle</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddMember(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div className="space-y-3">
                {potentialMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.mutual} ortak arkadaş</div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addMember(member)}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <FaUserPlus className="text-sm" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GroupChat

