"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Gift, Cake, Star, Sparkles, Music, Volume2, VolumeX, Mail } from 'lucide-react'

export default function BirthdayPage() {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'shake' | 'opened'>('closed')
  const [showFirstQuestion, setShowFirstQuestion] = useState(true)
  const [showSecondQuestion, setShowSecondQuestion] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number }>>([])
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const letterText = `Untuk Agis yang tersayang,

Selamat ulang tahun! 🎉

Hari ini adalah hari yang sangat istimewa karena dunia mendapat hadiah terbesar - yaitu kehadiranmu di dunia ini. Setiap tahun yang berlalu, kamu semakin menunjukkan betapa luar biasanya dirimu.

Kamu adalah seseorang yang selalu membawa kebahagiaan bagi orang-orang di sekitarmu. Senyummu yang tulus, tawa yang menular, dan kebaikan hatimu membuat setiap hari menjadi lebih cerah. 

Di hari spesial ini, aku ingin kamu tahu betapa berharganya keberadaanmu. Semoga tahun baru dalam hidupmu ini dipenuhi dengan:

✨ Kebahagiaan yang tak terbatas
🌟 Kesehatan yang selalu terjaga  
💝 Cinta yang berlimpah dari orang-orang terkasih
🎯 Pencapaian semua impian dan cita-citamu
🌈 Petualangan baru yang menakjubkan
🎊 Momen-momen indah yang tak terlupakan

Ingatlah bahwa kamu sangat dicintai dan dihargai. Teruslah menjadi dirimu yang luar biasa, karena dunia ini menjadi tempat yang lebih baik dengan kehadiranmu.

Sekali lagi, selamat ulang tahun Agis! Semoga hari ini dan setiap hari setelahnya dipenuhi dengan keajaiban dan kebahagiaan.

Dengan cinta dan doa terbaik,
Seseorang yang sangat menyayangimu ❤️

P.S. Semoga lagu SEVENTEEN "THUNDER" ini bisa menambah semangat di hari spesialmu! ⚡`

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 150 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-indigo-400'][Math.floor(Math.random() * 8)]
    }))
    setConfetti(newConfetti)
    
    setTimeout(() => setConfetti([]), 6000)
  }

  const handleFirstClick = () => {
    setShowFirstQuestion(false)
    setEnvelopeState('shake')
    setShowSecondQuestion(true)
  }

  const handleSecondClick = () => {
    setShowSecondQuestion(false)
    setEnvelopeState('opened')
    createConfetti()
    setShowLetter(true)
    
    // Auto play music when envelope opens
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error)
        setMusicPlaying(true)
      }
    }, 1000)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setMusicPlaying(!musicPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-200 animate-pulse opacity-70"
            size={Math.random() * 10 + 4}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Lightning Effects for THUNDER theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-yellow-300 to-transparent opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: '0%',
              height: `${Math.random() * 30 + 20}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute w-3 h-3 ${piece.color} opacity-90 rounded-sm`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg)`,
            animation: 'confettiFall 6s linear forwards'
          }}
        />
      ))}

      {/* Audio Element - Placeholder for SEVENTEEN THUNDER */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* 
        Untuk menambahkan lagu SEVENTEEN "THUNDER":
        1. Download audio dari YouTube menggunakan converter
        2. Upload file audio ke folder public/
        3. Ganti src di bawah dengan path file audio
        */}
        <source src="/seventeen-thunder.mp3" type="audio/mpeg" />
        <source src="/seventeen-thunder.ogg" type="audio/ogg" />
        {/* Fallback jika tidak ada audio file */}
      </audio>

      <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col items-center justify-center">
        
        {!showLetter ? (
          <div className="text-center space-y-8">
            {/* Envelope Animation */}
            <div className="relative">
              <div 
                className={`envelope ${envelopeState === 'shake' ? 'animate-shake' : ''} ${envelopeState === 'opened' ? 'animate-open' : ''}`}
              >
                {/* Envelope Body */}
                <div className="envelope-body bg-gradient-to-br from-amber-100 to-yellow-200 border-2 border-amber-300 shadow-2xl">
                  {/* Envelope Flap */}
                  <div className={`envelope-flap bg-gradient-to-br from-amber-200 to-yellow-300 border-2 border-amber-400 ${envelopeState === 'opened' ? 'flap-open' : ''}`}>
                    <div className="flap-triangle"></div>
                  </div>
                  
                  {/* Envelope Content Preview */}
                  {envelopeState === 'opened' && (
                    <div className="envelope-content animate-slideUp">
                      <div className="bg-white p-2 rounded shadow-lg transform scale-75">
                        <div className="text-xs text-gray-600 text-center">
                          💌 Surat Spesial untuk Agis 💌
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Questions */}
            {showFirstQuestion && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white animate-pulse drop-shadow-lg">
                  Do you want to open it?
                </h2>
                <Button
                  onClick={handleFirstClick}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/25"
                >
                  <Mail className="w-6 h-6 mr-2" />
                  Buka Amplop
                </Button>
              </div>
            )}

            {showSecondQuestion && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-bold text-white animate-pulse drop-shadow-lg">
                  Yakin mau lihat?
                </h2>
                <Button
                  onClick={handleSecondClick}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl animate-bounce hover:shadow-red-500/25"
                >
                  <Heart className="w-6 h-6 mr-2" />
                  Ya, Buka Sekarang!
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl animate-fadeIn">
            {/* Letter Content */}
            <Card className="bg-gradient-to-br from-white via-cream-50 to-yellow-50 shadow-2xl border-4 border-gold-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-yellow-400"></div>
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse mb-4">
                    🎉 HAPPY BIRTHDAY AGIS! 🎉
                  </h1>
                  <div className="flex justify-center items-center space-x-2 text-yellow-500">
                    <Sparkles className="animate-spin" />
                    <span className="text-lg font-semibold">⚡ THUNDER BIRTHDAY CELEBRATION ⚡</span>
                    <Sparkles className="animate-spin" />
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line text-center md:text-left mb-8">
                  {letterText}
                </div>

                {/* Birthday Photo */}
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl shadow-lg">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PNDHNeqXgqNtBEXBQqxk9zloGKTDmv.png"
                      alt="Agis with Birthday Cake" 
                      className="rounded-lg shadow-md max-w-full h-auto max-h-96 object-cover"
                    />
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      🎂 Sweet memories and sweeter moments ahead! 🎂
                    </p>
                  </div>
                </div>

                {/* Music Control with SEVENTEEN Theme */}
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Music className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Now Playing: SEVENTEEN - THUNDER</span>
                      <Music className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      🎵 Lagu spesial untuk hari spesialmu! 🎵
                    </p>
                  </div>
                  
                  <Button
                    onClick={toggleMusic}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {musicPlaying ? <VolumeX className="w-5 h-5 mr-2" /> : <Volume2 className="w-5 h-5 mr-2" />}
                    {musicPlaying ? 'Pause THUNDER' : 'Play THUNDER'}
                  </Button>
                </div>

                {/* Additional Birthday Elements */}
                <div className="mt-8 text-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg">
                      <Cake className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-sm font-semibold text-orange-800">Make a Wish!</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-100 to-red-100 p-4 rounded-lg">
                      <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <p className="text-sm font-semibold text-red-800">Lots of Love</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-lg">
                      <Gift className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <p className="text-sm font-semibold text-purple-800">Special Day</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx global>{`
        .envelope {
          width: 320px;
          height: 220px;
          margin: 0 auto;
          position: relative;
          cursor: pointer;
        }

        .envelope-body {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }

        .envelope-flap {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          height: 130px;
          border-radius: 12px 12px 0 0;
          transform-origin: bottom center;
          transition: transform 1.2s ease-in-out;
          z-index: 2;
        }

        .flap-open {
          transform: rotateX(-180deg);
        }

        .flap-triangle {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 160px solid transparent;
          border-right: 160px solid transparent;
          border-bottom: 85px solid #fbbf24;
        }

        .envelope-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-8px) rotate(-2deg); }
          75% { transform: translateX(8px) rotate(2deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 30px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes confettiFall {
          to {
            transform: translateY(110vh) rotate(1080deg);
            opacity: 0;
          }
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out infinite;
        }

        .animate-slideUp {
          animation: slideUp 1.2s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-open {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
