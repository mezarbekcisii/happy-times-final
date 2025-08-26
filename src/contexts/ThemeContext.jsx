import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Theme configurations
export const themes = {
  light: {
    name: 'light',
    displayName: 'Açık Tema',
    icon: '☀️',
    colors: {
      // Background gradients
      primary: 'from-yellow-50 via-orange-50 to-red-50',
      secondary: 'from-blue-50 via-purple-50 to-pink-50',
      card: 'bg-white',
      surface: 'bg-gray-50',
      
      // Text colors
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500',
      textInverse: 'text-white',
      
      // Border colors
      border: 'border-gray-200',
      borderMuted: 'border-gray-100',
      
      // Component specific
      navbar: 'bg-white shadow-lg',
      navbarText: 'text-gray-900',
      button: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white',
      buttonSecondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      
      // Overlays
      overlay: 'bg-black/20',
      modalBg: 'bg-white',
      
      // Status colors
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      
      // Card backgrounds
      cardGradient: 'bg-gradient-to-br from-white to-gray-50',
      glassEffect: 'bg-white/80 backdrop-blur-sm border-white/50',
    }
  },
  dark: {
    name: 'dark',
    displayName: 'Koyu Tema',
    icon: '🌙',
    colors: {
      // Background gradients
      primary: 'from-gray-900 via-purple-900 to-violet-800',
      secondary: 'from-slate-900 via-gray-900 to-zinc-900',
      card: 'bg-gray-800',
      surface: 'bg-gray-900',
      
      // Text colors
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      textInverse: 'text-gray-900',
      
      // Border colors
      border: 'border-gray-700',
      borderMuted: 'border-gray-800',
      
      // Component specific
      navbar: 'bg-gray-900/90 backdrop-blur-lg shadow-xl border-b border-gray-800',
      navbarText: 'text-white',
      button: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white',
      buttonSecondary: 'bg-gray-700 text-white hover:bg-gray-600',
      
      // Overlays
      overlay: 'bg-black/60',
      modalBg: 'bg-gray-800',
      
      // Status colors
      online: 'bg-green-500',
      offline: 'bg-gray-500',
      
      // Card backgrounds
      cardGradient: 'bg-gradient-to-br from-gray-800 to-gray-900',
      glassEffect: 'bg-black/20 backdrop-blur-lg border-white/10',
    }
  },
  sunset: {
    name: 'sunset',
    displayName: 'Gün Batımı',
    icon: '🌅',
    colors: {
      // Background gradients
      primary: 'from-orange-900 via-red-900 to-pink-900',
      secondary: 'from-yellow-900 via-orange-900 to-red-900',
      card: 'bg-orange-800/50',
      surface: 'bg-red-900/30',
      
      // Text colors
      text: 'text-white',
      textSecondary: 'text-orange-100',
      textMuted: 'text-orange-200',
      textInverse: 'text-gray-900',
      
      // Border colors
      border: 'border-orange-600/30',
      borderMuted: 'border-orange-700/20',
      
      // Component specific
      navbar: 'bg-orange-900/80 backdrop-blur-lg shadow-xl border-b border-orange-600/30',
      navbarText: 'text-white',
      button: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white',
      buttonSecondary: 'bg-orange-700/50 text-white hover:bg-orange-600/50',
      
      // Overlays
      overlay: 'bg-black/50',
      modalBg: 'bg-orange-800',
      
      // Status colors
      online: 'bg-green-400',
      offline: 'bg-orange-400',
      
      // Card backgrounds
      cardGradient: 'bg-gradient-to-br from-orange-800/50 to-red-800/50',
      glassEffect: 'bg-orange-900/20 backdrop-blur-lg border-orange-500/20',
    }
  },
  ocean: {
    name: 'ocean',
    displayName: 'Okyanus',
    icon: '🌊',
    colors: {
      // Background gradients
      primary: 'from-blue-900 via-cyan-900 to-teal-900',
      secondary: 'from-indigo-900 via-blue-900 to-cyan-900',
      card: 'bg-blue-800/50',
      surface: 'bg-cyan-900/30',
      
      // Text colors
      text: 'text-white',
      textSecondary: 'text-blue-100',
      textMuted: 'text-blue-200',
      textInverse: 'text-gray-900',
      
      // Border colors
      border: 'border-blue-600/30',
      borderMuted: 'border-blue-700/20',
      
      // Component specific
      navbar: 'bg-blue-900/80 backdrop-blur-lg shadow-xl border-b border-blue-600/30',
      navbarText: 'text-white',
      button: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white',
      buttonSecondary: 'bg-blue-700/50 text-white hover:bg-blue-600/50',
      
      // Overlays
      overlay: 'bg-black/50',
      modalBg: 'bg-blue-800',
      
      // Status colors
      online: 'bg-green-400',
      offline: 'bg-blue-400',
      
      // Card backgrounds
      cardGradient: 'bg-gradient-to-br from-blue-800/50 to-cyan-800/50',
      glassEffect: 'bg-blue-900/20 backdrop-blur-lg border-blue-500/20',
    }
  }
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('happytime-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    } else {
      // Auto-detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setCurrentTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('happytime-theme', currentTheme)
  }, [currentTheme])

  const changeTheme = (themeName) => {
    if (themes[themeName] && themeName !== currentTheme) {
      setIsTransitioning(true)
      
      // Add transition effect
      setTimeout(() => {
        setCurrentTheme(themeName)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 50)
    }
  }

  const theme = themes[currentTheme]

  const value = {
    currentTheme,
    theme,
    themes,
    changeTheme,
    isTransitioning,
    
    // Helper functions
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
    
    // Quick access to colors
    colors: theme.colors,
    
    // Theme-aware class builder
    getClass: (lightClass, darkClass, customThemes = {}) => {
      if (customThemes[currentTheme]) {
        return customThemes[currentTheme]
      }
      return currentTheme === 'light' ? lightClass : darkClass
    }
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen transition-all duration-300 ${isTransitioning ? 'opacity-90' : 'opacity-100'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// Theme toggle component
export const ThemeToggle = ({ className = '', showLabel = true, size = 'md' }) => {
  const { currentTheme, changeTheme, themes, isTransitioning } = useTheme()
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  const currentThemeConfig = themes[currentTheme]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className={`${sizeClasses[size]} rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 ${isTransitioning ? 'animate-pulse' : ''}`}
        title="Tema Değiştir"
      >
        <span className="transition-transform duration-300 hover:scale-110">
          {currentThemeConfig.icon}
        </span>
      </button>

      {showLabel && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 whitespace-nowrap">
          {currentThemeConfig.displayName}
        </div>
      )}

      {showThemeMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowThemeMenu(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl z-50 min-w-48">
            <div className="p-2">
              <div className="text-white/80 text-xs font-medium px-3 py-2 border-b border-white/10">
                Tema Seçin
              </div>
              {Object.values(themes).map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => {
                    changeTheme(themeOption.name)
                    setShowThemeMenu(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    currentTheme === themeOption.name
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{themeOption.icon}</span>
                  <span className="font-medium">{themeOption.displayName}</span>
                  {currentTheme === themeOption.name && (
                    <span className="ml-auto text-green-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ThemeProvider

