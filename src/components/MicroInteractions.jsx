import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Ripple Effect Hook
export const useRipple = () => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width > rippleContainer.height 
      ? rippleContainer.height 
      : rippleContainer.width;
    
    const x = event.clientX - rippleContainer.x - size / 2;
    const y = event.clientY - rippleContainer.y - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return { ripples, addRipple };
};

// Ripple Button Component
export const RippleButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props 
}) => {
  const { ripples, addRipple } = useRipple();
  const { colors } = useTheme();

  const handleClick = (event) => {
    if (!disabled) {
      addRipple(event);
      onClick && onClick(event);
    }
  };

  const baseClasses = "relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none";
  
  const variants = {
    primary: `bg-gradient-to-r ${colors.primary} ${colors.secondary} text-white shadow-lg hover:shadow-xl transform hover:scale-105`,
    secondary: `bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 hover:bg-white/30`,
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '600ms'
          }}
        />
      ))}
    </button>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const { colors } = useTheme();
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-yellow-400',
    secondary: 'border-orange-400',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 ${colorClasses[color]} border-t-transparent`}></div>
  );
};

// Bounce Animation Component
export const BounceElement = ({ children, trigger, className = '' }) => {
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShouldBounce(true);
      setTimeout(() => setShouldBounce(false), 600);
    }
  }, [trigger]);

  return (
    <div className={`${shouldBounce ? 'animate-bounce' : ''} ${className}`}>
      {children}
    </div>
  );
};

// Fade In Animation Component
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 'duration-500',
  direction = 'up',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const directions = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8'
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${duration} ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0' 
          : `opacity-0 ${directions[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Toast Notification Component
export const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  const { colors } = useTheme();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const types = {
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
    info: `bg-gradient-to-r ${colors.primary} ${colors.secondary} text-white`
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${types[type]}`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icons[type]}</span>
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Hover Card Component
export const HoverCard = ({ children, className = '', hoverEffect = 'lift' }) => {
  const effects = {
    lift: 'hover:transform hover:scale-105 hover:shadow-2xl',
    glow: 'hover:shadow-2xl hover:shadow-yellow-400/20',
    tilt: 'hover:transform hover:rotate-1 hover:scale-105',
    pulse: 'hover:animate-pulse'
  };

  return (
    <div className={`transition-all duration-300 ${effects[hoverEffect]} ${className}`}>
      {children}
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({ 
  progress, 
  showPercentage = true, 
  animated = true,
  color = 'primary',
  size = 'md' 
}) => {
  const { colors } = useTheme();
  
  const colorClasses = {
    primary: `bg-gradient-to-r ${colors.primary} ${colors.secondary}`,
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    danger: 'bg-gradient-to-r from-red-500 to-red-600'
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]} overflow-hidden`}>
        <div
          className={`${sizes[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-right text-sm text-gray-600 mt-1">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Floating Action Button
export const FloatingActionButton = ({ 
  children, 
  onClick, 
  position = 'bottom-right',
  className = '' 
}) => {
  const { colors } = useTheme();
  
  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-20 right-6',
    'top-left': 'fixed top-20 left-6'
  };

  return (
    <button
      onClick={onClick}
      className={`${positions[position]} w-14 h-14 bg-gradient-to-r ${colors.primary} ${colors.secondary} text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default {
  RippleButton,
  LoadingSpinner,
  BounceElement,
  FadeIn,
  Toast,
  HoverCard,
  ProgressBar,
  FloatingActionButton,
  useRipple
};

