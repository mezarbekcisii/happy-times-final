import React from 'react'
import { FaHeart, FaSmile, FaClock } from 'react-icons/fa'

const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    xs: 'text-sm',
    sm: 'text-lg', 
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
    xxl: 'text-6xl'
  }

  return (
    <div className={`flex items-center gap-2 font-bold ${sizeClasses[size]} ${className}`}>
      <div className="relative">
        <FaSmile className="text-yellow-400" />
        <FaHeart className="absolute -top-1 -right-1 text-red-500 text-xs" />
      </div>
      <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
        HappyTime
      </span>
    </div>
  )
}

export default Logo

