import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ParticleEffect = ({ type, isActive, onComplete }) => {
  const [particles, setParticles] = useState([])

  const createParticles = (effectType) => {
    const particleConfigs = {
      like: {
        count: 20,
        symbols: ['❤️', '💕', '💖', '💗', '💝', '💘'],
        colors: ['#ff6b6b', '#ff8e8e', '#ffa8a8', '#ffb3b3'],
        direction: 'up',
        spread: 120
      },
      superlike: {
        count: 25,
        symbols: ['⭐', '✨', '🌟', '💫', '⚡', '🔥'],
        colors: ['#4dabf7', '#74c0fc', '#a5d8ff', '#d0ebff'],
        direction: 'up',
        spread: 180
      },
      pass: {
        count: 15,
        symbols: ['❌', '🚫', '💔', '😔', '👎'],
        colors: ['#fa5252', '#ff6b6b', '#ff8787', '#ffa8a8'],
        direction: 'left',
        spread: 90
      },
      match: {
        count: 30,
        symbols: ['🎉', '🎊', '✨', '💖', '👥', '🥳', '💫'],
        colors: ['#51cf66', '#69db7c', '#8ce99a', '#b2f2bb'],
        direction: 'explosion',
        spread: 360
      },
      boost: {
        count: 35,
        symbols: ['⚡', '🚀', '💥', '🔥', '✨', '⭐'],
        colors: ['#ffd43b', '#ffec99', '#fff3bf', '#fff9db'],
        direction: 'spiral',
        spread: 360
      }
    }

    const config = particleConfigs[effectType] || particleConfigs.like
    const newParticles = []

    for (let i = 0; i < config.count; i++) {
      const angle = (360 / config.count) * i + Math.random() * config.spread - config.spread / 2
      const velocity = 150 + Math.random() * 100
      const symbol = config.symbols[Math.floor(Math.random() * config.symbols.length)]
      const color = config.colors[Math.floor(Math.random() * config.colors.length)]
      
      let startX = 0
      let startY = 0
      let endX = 0
      let endY = 0

      switch (config.direction) {
        case 'up':
          startX = (Math.random() - 0.5) * 100
          startY = 0
          endX = startX + Math.sin(angle * Math.PI / 180) * velocity
          endY = -velocity - Math.random() * 100
          break
        case 'left':
          startX = 0
          startY = (Math.random() - 0.5) * 100
          endX = -velocity - Math.random() * 100
          endY = startY + Math.cos(angle * Math.PI / 180) * velocity * 0.5
          break
        case 'explosion':
          startX = 0
          startY = 0
          endX = Math.cos(angle * Math.PI / 180) * velocity
          endY = Math.sin(angle * Math.PI / 180) * velocity
          break
        case 'spiral':
          const spiralRadius = velocity * 0.5
          const spiralAngle = angle + i * 10
          startX = 0
          startY = 0
          endX = Math.cos(spiralAngle * Math.PI / 180) * spiralRadius
          endY = Math.sin(spiralAngle * Math.PI / 180) * spiralRadius
          break
      }

      newParticles.push({
        id: i,
        symbol,
        color,
        startX,
        startY,
        endX,
        endY,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        delay: Math.random() * 0.3
      })
    }

    return newParticles
  }

  useEffect(() => {
    if (isActive && type) {
      const newParticles = createParticles(type)
      setParticles(newParticles)
      
      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([])
        onComplete && onComplete()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isActive, type])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl select-none"
            style={{
              left: '50%',
              top: '50%',
              color: particle.color,
              fontSize: `${particle.scale}em`,
              filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
            }}
            initial={{
              x: particle.startX,
              y: particle.startY,
              scale: 0,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              x: particle.endX,
              y: particle.endY,
              scale: [0, particle.scale, particle.scale, 0],
              opacity: [0, 1, 1, 0],
              rotate: particle.rotation
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              delay: particle.delay,
              ease: "easeOut"
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
          >
            {particle.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Advanced floating hearts effect
export const FloatingHearts = ({ isActive, count = 10 }) => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    if (isActive) {
      const newHearts = Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        startX: Math.random() * window.innerWidth,
        amplitude: 50 + Math.random() * 100,
        size: 0.8 + Math.random() * 0.4
      }))
      setHearts(newHearts)

      const timer = setTimeout(() => {
        setHearts([])
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isActive, count])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-4xl"
            style={{
              left: heart.startX,
              bottom: -50,
              fontSize: `${heart.size}em`
            }}
            initial={{
              y: 0,
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: -window.innerHeight - 100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: [0, Math.sin(Date.now() * 0.01) * heart.amplitude]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut"
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Confetti effect for matches
export const ConfettiExplosion = ({ isActive, colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'] }) => {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    if (isActive) {
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 360,
        velocity: 200 + Math.random() * 300,
        rotationSpeed: (Math.random() - 0.5) * 720,
        size: 4 + Math.random() * 8
      }))
      setConfetti(pieces)

      const timer = setTimeout(() => {
        setConfetti([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%'
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0
            }}
            animate={{
              x: Math.cos(piece.angle * Math.PI / 180) * piece.velocity,
              y: Math.sin(piece.angle * Math.PI / 180) * piece.velocity + 300, // gravity effect
              opacity: 0,
              rotate: piece.rotationSpeed
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut"
            }}
            exit={{
              opacity: 0
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Magic sparkles effect
export const MagicSparkles = ({ isActive, duration = 2000 }) => {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    if (isActive) {
      const createSparkle = () => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 3,
        duration: 1 + Math.random() * 2
      })

      const initialSparkles = Array.from({ length: 30 }, createSparkle)
      setSparkles(initialSparkles)

      const interval = setInterval(() => {
        setSparkles(prev => [
          ...prev.slice(-20), // Keep last 20
          ...Array.from({ length: 5 }, createSparkle) // Add 5 new ones
        ])
      }, 200)

      const timer = setTimeout(() => {
        clearInterval(interval)
        setSparkles([])
      }, duration)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [isActive, duration])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size
            }}
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: sparkle.duration,
              ease: "easeInOut"
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
          >
            <div className="w-full h-full bg-yellow-300 rounded-full shadow-lg"></div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ParticleEffect

