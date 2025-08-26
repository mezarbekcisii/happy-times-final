import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FaHome, 
  FaSearch, 
  FaComments, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaHeart,
  FaMusic
} from 'react-icons/fa'
import Logo from './Logo'
import NotificationCenter from './NotificationCenter'
import { ThemeToggle, useTheme } from '../contexts/ThemeContext'
import { LanguageSelector, useLanguage } from '../contexts/LanguageContext'
import { RippleButton, HoverCard, FadeIn } from './MicroInteractions'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { colors, theme } = useTheme()
  const { t } = useLanguage()

  const navItems = [
    { path: '/', icon: FaHome, label: t('navbar.home') },
    { path: '/discover', icon: FaSearch, label: t('navbar.discover') },
    { path: '/music', icon: FaMusic, label: t('navbar.music') },
    { path: '/matches', icon: FaHeart, label: t('navbar.matches') },
    { path: '/chat', icon: FaComments, label: t('navbar.chat') },
    { path: '/profile', icon: FaUser, label: t('navbar.profile') },
  ]

  const premiumNavItems = [
    { path: '/premium', icon: '👑', label: 'Premium', special: true },
    { path: '/wallet', icon: '💰', label: 'Cüzdan', special: true }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 ${colors.navbar} z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo - Compact */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <Logo size="md" />
            </Link>
          </div>

          {/* Main Navigation - Compact Grid */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-xl mx-4">
            <FadeIn direction="down" delay={200}>
              <div className="grid grid-cols-6 gap-2 w-full">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <FadeIn key={item.path} direction="down" delay={index * 50}>
                      <HoverCard hoverEffect="lift">
                        <Link
                          to={item.path}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 group ${
                            isActive
                              ? `text-white ${colors.button} shadow-md transform scale-105`
                              : `${colors.navbarText} hover:text-orange-500 hover:bg-white/10 hover:shadow-sm`
                          }`}
                        >
                          <Icon className={`h-4 w-4 mb-1 transition-transform duration-300 ${
                            isActive ? '' : 'group-hover:scale-110'
                          }`} />
                          <span className={`text-xs font-medium transition-all duration-300 ${
                            isActive ? 'text-white' : `${colors.navbarText} group-hover:text-orange-600`
                          }`}>
                            {item.label}
                          </span>
                        </Link>
                      </HoverCard>
                    </FadeIn>
                  )
                })}
              </div>
            </FadeIn>
          </div>

          {/* Right Side - Compact */}
          <div className="flex items-center space-x-1">
            {/* Premium & Wallet - Compact */}
            <div className="hidden lg:flex items-center space-x-1">
              {premiumNavItems.map((item) => (
                <HoverCard key={item.path} hoverEffect="lift">
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md'
                        : item.path === '/premium'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                </HoverCard>
              ))}
            </div>

            {/* Tools - Compact */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="scale-75">
                <LanguageSelector />
              </div>
              <div className="scale-75">
                <ThemeToggle />
              </div>
              <div className="scale-75">
                <NotificationCenter />
              </div>
            </div>

            {/* Auth Buttons - Compact */}
            <div className="hidden lg:flex items-center space-x-1">
              <RippleButton
                onClick={() => window.location.href = '/login'}
                variant="secondary"
                size="sm"
                className="font-medium text-xs px-2 py-1"
              >
                {t('navbar.login')}
              </RippleButton>
              <RippleButton
                onClick={() => window.location.href = '/register'}
                variant="primary"
                size="sm"
                className="font-medium text-xs px-2 py-1"
              >
                {t('navbar.register')}
              </RippleButton>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <RippleButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="secondary"
              size="sm"
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </RippleButton>
          </div>
        </div>

        {/* Mobile Navigation - Improved */}
        {isMobileMenuOpen && (
          <FadeIn direction="down" delay={100}>
            <div className="lg:hidden border-t border-white/20">
              <div className={`${colors.glassEffect} m-2 rounded-xl p-4 space-y-3`}>
                {/* Main Nav Items */}
                <div className="grid grid-cols-3 gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? `text-white ${colors.button} shadow-md`
                            : `${colors.navbarText} hover:bg-white/10`
                        }`}
                      >
                        <Icon className="text-lg mb-1" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Premium Items */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20">
                  {premiumNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-center space-x-2 p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                          : item.path === '/premium'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20">
                  <RippleButton
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      window.location.href = '/login'
                    }}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    {t('navbar.login')}
                  </RippleButton>
                  <RippleButton
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      window.location.href = '/register'
                    }}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    {t('navbar.register')}
                  </RippleButton>
                </div>

                {/* Settings Row */}
                <div className="flex justify-center items-center space-x-4 pt-2 border-t border-white/20">
                  <div className="scale-75">
                    <LanguageSelector />
                  </div>
                  <div className="scale-75">
                    <ThemeToggle />
                  </div>
                  <div className="scale-75">
                    <NotificationCenter />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </nav>
  )
}

export default Navbar
