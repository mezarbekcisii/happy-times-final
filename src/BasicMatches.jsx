import React, { useState } from 'react'

const BasicMatches = () => {
  const [activeTab, setActiveTab] = useState('matches')

  // Basit matches data
  const matches = [
    {
      id: 1,
      name: 'Elif Yılmaz',
      age: 26,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 29,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            💝 Eşleşmelerim
          </h1>
          <p className="text-gray-600">Yeni dostlukların merkezi!</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'matches'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              ❤️ Eşleşmeler
            </button>
            <button
              onClick={() => setActiveTab('likes')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'likes'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              ⭐ Beğeniler
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-64">
                <img
                  src={match.avatar}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{match.name}, {match.age}</h3>
                <button className="w-full mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg font-semibold">
                  💬 Mesaj Gönder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BasicMatches

