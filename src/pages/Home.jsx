import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaComments, 
  FaVideo, 
  FaMicrophone, 
  FaUsers, 
  FaCamera,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaHeart,
  FaQuoteLeft,
  FaPlay,
  FaArrowRight,
  FaSmile
} from 'react-icons/fa'
import Logo from '../components/Logo'

const Home = () => {
  const features = [
    {
      icon: FaHeart,
      title: 'Eşleşme Sistemi',
      description: 'Tinder benzeri kaydırma sistemi ile yeni insanlarla tanışın'
    },
    {
      icon: FaComments,
      title: 'Yazılı Sohbet',
      description: 'Anlık mesajlaşma ile iletişim kurun'
    },
    {
      icon: FaVideo,
      title: 'Görüntülü Sohbet',
      description: 'Yüz yüze görüşme imkanı'
    },
    {
      icon: FaMicrophone,
      title: 'Sesli Sohbet',
      description: 'Sesli iletişim kurun'
    },
    {
      icon: FaUsers,
      title: 'Sohbet Odaları',
      description: 'Ortak ilgi alanlarına sahip kişilerle tanışın'
    },
    {
      icon: FaCamera,
      title: 'Hikayeler',
      description: 'Instagram benzeri hikaye paylaşımı'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Ayşe K.',
      age: 28,
      image: '/api/placeholder/80/80',
      text: 'HappyTime ile hayatımın en güzel dönemini yaşıyorum! Her gün yeni dostluklar kuruyorum ve gülümsüyorum.',
      rating: 5,
      location: 'İstanbul'
    },
    {
      id: 2,
      name: 'Mehmet Y.',
      age: 32,
      image: '/api/placeholder/80/80',
      text: 'Burada herkes çok pozitif ve neşeli. HappyTime gerçekten isminin hakkını veriyor!',
      rating: 5,
      location: 'Ankara'
    },
    {
      id: 3,
      name: 'Zeynep M.',
      age: 26,
      image: '/api/placeholder/80/80',
      text: 'Kahkaha dolu sohbetler, samimi dostluklar... HappyTime ile tanıştığım için çok mutluyum!',
      rating: 5,
      location: 'İzmir'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Mutlu Çift', icon: FaHeart },
    { number: '100K+', label: 'Aktif Kullanıcı', icon: FaUsers },
    { number: '1M+', label: 'Günlük Mesaj', icon: FaComments },
    { number: '99.9%', label: 'Güvenlik', icon: FaShieldAlt }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen">
            {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80"
            alt="Happy couple laughing together"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/80 via-orange-500/70 to-red-500/80"></div>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [360, 0, 360]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <Logo size="xl" className="text-white" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Mutlu Anların Başlangıcı
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-gray-100 leading-relaxed"
              variants={itemVariants}
            >
              HappyTime ile hayatınızın en güzel anlarını yaşayın! 
              Gülümseyin, tanışın ve kalıcı dostluklar kurun. 
              Her sohbet yeni bir mutluluk hikayesi...
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-block bg-white text-orange-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  <FaSmile className="inline mr-2" />
                  Mutluluğa Başla
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/discover"
                  className="inline-block border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  <FaPlay className="inline mr-2" />
                  Demo İzle
                </Link>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center mb-3">
                      <Icon className="text-3xl text-white opacity-80" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-gray-200 text-sm">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden HappyTime?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mutluluğun adresi HappyTime! Gülümseyin, eğlenin ve gerçek 
              dostluklar kurun. Hayatınızda mutlu anlar yaratmanın zamanı geldi!
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div 
                  key={index} 
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-100 bg-white">
                    <motion.div 
                      className="flex justify-center mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl">
                        <Icon className="text-3xl text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <motion.div
                      className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <FaArrowRight className="text-primary-500 mx-auto" />
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          
          {/* Security Badge */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaShieldAlt className="text-green-600 text-xl" />
              </motion.div>
              <span className="text-green-800 font-semibold">SSL Şifreli & Güvenli Bağlantı</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <FaQuoteLeft className="absolute top-20 left-10 text-6xl text-primary-500" />
          <FaHeart className="absolute bottom-20 right-10 text-4xl text-primary-500" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              😊 HappyTime Ailesinden Mutlu Sesler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              HappyTime'da gerçek mutluluğu bulan kullanıcılarımızın güzel hikayelerini dinleyin
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                className="relative"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card p-8 text-center bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Quote icon */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-white text-sm" />
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <FaStar />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>
                  
                  {/* User info */}
                  <div className="flex items-center justify-center">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>
                    <div className="ml-4 text-left">
                      <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{testimonial.age} yaşında</span>
                        <span className="mx-2">•</span>
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Heart decoration */}
                  <motion.div
                    className="absolute bottom-4 right-4 text-primary-300"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaHeart className="text-xl" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-6">Sen de HappyTime ailesine katılıp mutlu anlar yaşamak istiyor musun?</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-200"
              >
                <FaSmile className="mr-2" />
                Mutluluğa Katıl
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full"
            animate={{
              x: [0, -80, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              😊 HappyTime'da Mutluluğun Parçası Ol!
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Gülümseyin, eğlenin ve hayatınızın en güzel anlarını yaşayın!
              HappyTime ailesine katılın ve mutluluğun tadını çıkarın.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center bg-white text-orange-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl"
                >
                  <FaSmile className="mr-2" />
                  Mutluluğa Başla
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="text-white/80 text-sm"
              >
                ✨ 30 saniyede üye ol, hemen eşleşmeye başla!
              </motion.div>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <FaShieldAlt />
                <span className="text-sm">100% Güvenli</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers />
                <span className="text-sm">100K+ Kullanıcı</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart />
                <span className="text-sm">50K+ Mutlu Çift</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
