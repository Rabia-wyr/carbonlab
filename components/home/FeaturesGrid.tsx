"use client"

export default function FeaturesGrid() {
  return (
    <section id="categories" className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">五大领域</h2>
      <p className="mb-8 text-gray-600">探索不同领域的物理现象，体验沉浸式的物理学习之旅。</p>

      {/* First row: Mechanics, Electromagnetism, Vibration and Waves */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Mechanics */}
        <div className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
          <a href="#" className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 aspect-[3/2] flex items-center justify-center p-4">
              {/* Background decoration */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-yellow-400 opacity-20"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-blue-300 opacity-20"></div>

              {/* Mechanics icon - modern Newton's cradle */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                <defs>
                  <linearGradient id="mechanics-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "#f0f0f0", stopOpacity: 0.7 }} />
                  </linearGradient>
                </defs>
                {/* Top support */}
                <rect x="30" y="30" width="140" height="10" rx="5" fill="url(#mechanics-grad)" />

                {/* Middle fixed ball */}
                <g className="pendulum-middle">
                  <line x1="100" y1="40" x2="100" y2="110" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="100" cy="120" r="15" fill="url(#mechanics-grad)" />
                </g>

                {/* Right ball */}
                <g className="pendulum-right">
                  <line x1="140" y1="40" x2="140" y2="110" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="140" cy="120" r="15" fill="url(#mechanics-grad)" />
                </g>

                {/* Left swinging ball with glow effect */}
                <g className="pendulum-left">
                  <line x1="60" y1="40" x2="40" y2="90" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="40" cy="100" r="15" fill="url(#mechanics-grad)" />
                  <circle cx="40" cy="100" r="20" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                  <circle cx="40" cy="100" r="25" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                </g>
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">力学</h3>
            </div>
          </a>
        </div>

        {/* Electromagnetism */}
        <div className="transform transition-all duration-300 hover:scale-105 hover:rotate-1">
          <a href="#" className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 aspect-[3/2] flex items-center justify-center p-4">
              {/* Background decoration */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-yellow-300 opacity-20"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-300 opacity-20"></div>

              {/* Electromagnetism icon with dynamic effect */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                <defs>
                  <radialGradient id="electro-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "#f0f0f0", stopOpacity: 0.6 }} />
                  </radialGradient>
                </defs>
                {/* Center electron */}
                <circle cx="100" cy="100" r="20" fill="url(#electro-grad)" />

                {/* Electric field lines */}
                <g opacity="0.8">
                  <path d="M 100,60 L 100,30" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 100,140 L 100,170" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 60,100 L 30,100" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 140,100 L 170,100" stroke="#ffffff" strokeWidth="2" />
                </g>

                {/* Magnetic field rings */}
                <g fill="none" stroke="#ffffff" opacity="0.6">
                  <ellipse cx="100" cy="100" rx="70" ry="40" strokeWidth="1.5" transform="rotate(0,100,100)" />
                  <ellipse cx="100" cy="100" rx="70" ry="40" strokeWidth="1.5" transform="rotate(45,100,100)" />
                  <ellipse cx="100" cy="100" rx="70" ry="40" strokeWidth="1.5" transform="rotate(90,100,100)" />
                  <ellipse cx="100" cy="100" rx="70" ry="40" strokeWidth="1.5" transform="rotate(135,100,100)" />
                </g>

                {/* Charge + symbol */}
                <g stroke="#ffffff" strokeWidth="2">
                  <line x1="95" y1="100" x2="105" y2="100" />
                  <line x1="100" y1="95" x2="100" y2="105" />
                </g>
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">电磁学</h3>
            </div>
          </a>
        </div>

        {/* Vibration and Waves */}
        <div className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
          <a href="#" className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-teal-500 to-green-600 aspect-[3/2] flex items-center justify-center p-4">
              {/* Background decoration */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-teal-300 opacity-20"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-green-300 opacity-20"></div>

              {/* Vibration and Waves icon - dynamic waveform */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                <defs>
                  <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "#f0f0f0", stopOpacity: 0.6 }} />
                  </linearGradient>
                </defs>
                {/* Base line */}
                <line x1="20" y1="100" x2="180" y2="100" stroke="#64748b" strokeWidth="1" opacity="0.5" />
                {/* Wave line 1 */}
                <path
                  d="M 20,100 Q 35,60 50,100 Q 65,140 80,100 Q 95,60 110,100 Q 125,140 140,100 Q 155,60 170,100 Q 185,140 200,100"
                  stroke="#ffffff"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Wave line 2 */}
                <path
                  d="M 20,100 Q 42.5,70 65,100 Q 87.5,130 110,100 Q 132.5,70 155,100 Q 177.5,130 200,100"
                  stroke="#ffffff"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
                {/* Wave line 3 */}
                <path
                  d="M 20,100 Q 50,80 80,100 Q 110,120 140,100 Q 170,80 200,100"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
                {/* Wave points */}
                <circle cx="50" cy="100" r="6" fill="#ffffff" />
                <circle cx="110" cy="100" r="6" fill="#ffffff" />
                <circle cx="170" cy="100" r="6" fill="#ffffff" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">振动与波动</h3>
            </div>
          </a>
        </div>
      </div>

      {/* Second row: Optics, Interdisciplinary, Junior High Physics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Optics */}
        <div className="transform transition-all duration-300 hover:scale-105 hover:rotate-1">
          <a href="#" className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-red-600 to-red-500 aspect-[3/2] flex items-center justify-center p-4">
              {/* Background decoration */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-yellow-400 opacity-20"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-300 opacity-20"></div>

              {/* Optics and Modern Physics icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                <defs>
                  <linearGradient id="optics-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "#f0f0f0", stopOpacity: 0.6 }} />
                  </linearGradient>
                </defs>
                {/* Prism */}
                <polygon points="50,70 100,50 150,70 120,130 80,130" fill="#ffffff" opacity="0.6" />
                {/* Light ray */}
                <line x1="20" y1="90" x2="50" y2="70" stroke="#ffffff" strokeWidth="2" />
                {/* Spectrum */}
                <path d="M 120,130 Q 150,150 180,120" stroke="#FF0000" strokeWidth="3" fill="none" />
                <path d="M 120,130 Q 150,145 180,115" stroke="#FF7F00" strokeWidth="3" fill="none" />
                <path d="M 120,130 Q 150,140 180,110" stroke="#FFFF00" strokeWidth="3" fill="none" />
                <path d="M 120,130 Q 150,135 180,105" stroke="#00FF00" strokeWidth="3" fill="none" />
                <path d="M 120,130 Q 150,130 180,100" stroke="#0000FF" strokeWidth="3" fill="none" />
                <path d="M 120,130 Q 150,125 180,95" stroke="#4B0082" strokeWidth="3" fill="none" />
                <path d="M 120,130 Q 150,120 180,90" stroke="#8F00FF" strokeWidth="3" fill="none" />
                {/* Atomic model */}
                <circle cx="70" cy="160" r="5" fill="#ffffff" />
                <ellipse cx="70" cy="160" rx="20" ry="10" fill="none" stroke="#ffffff" strokeWidth="1" />
                <ellipse cx="70" cy="160" rx="30" ry="15" fill="none" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">光学与现代物理</h3>
            </div>
          </a>
        </div>

        {/* Interdisciplinary */}
        <div className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
          <a href="#" className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-700 to-gray-500 aspect-[3/2] flex items-center justify-center p-4">
              {/* Background decoration */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-400 opacity-20"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-green-300 opacity-20"></div>

              {/* Interdisciplinary icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                {/* Microscope */}
                <rect x="80" y="120" width="40" height="20" rx="2" fill="#ffffff" opacity="0.8" />
                <rect x="90" y="140" width="20" height="10" rx="1" fill="#ffffff" opacity="0.8" />
                <rect x="95" y="70" width="10" height="50" fill="#ffffff" opacity="0.8" />
                {/* Turntable */}
                <circle cx="100" cy="60" r="20" fill="#ffffff" opacity="0.6" />
                <circle cx="100" cy="60" r="15" fill="none" stroke="#ffffff" strokeWidth="2" />
                {/* Data chart */}
                <rect x="140" y="70" width="40" height="40" rx="2" fill="#ffffff" opacity="0.4" />
                <polyline points="145,100 155,80 165,90 175,75" fill="none" stroke="#F97316" strokeWidth="2" />
                {/* Chemistry beaker */}
                <path d="M 30,90 L 40,120 L 60,120 L 70,90" fill="none" stroke="#ffffff" strokeWidth="2" />
                <line x1="25" y1="90" x2="75" y2="90" stroke="#ffffff" strokeWidth="2" />
                <path d="M 40,100 Q 50,110 60,100" fill="none" stroke="#3B82F6" strokeWidth="2" />
                {/* Connection lines */}
                <line x1="70" y1="100" x2="90" y2="100" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,2" />
                <line x1="110" y1="100" x2="140" y2="100" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,2" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">交叉领域与实验技能</h3>
            </div>
          </a>
        </div>

        {/* Junior High Physics */}
        <div className="transform transition-all duration-300 hover:scale-105 hover:rotate-1">
          <a href="#" className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 aspect-[3/2] flex items-center justify-center p-4">
              {/* Background decoration */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-yellow-300 opacity-20"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-orange-300 opacity-20"></div>

              {/* Junior High Physics icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                <defs>
                  <linearGradient id="book-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "#f0f0f0", stopOpacity: 0.6 }} />
                  </linearGradient>
                </defs>
                {/* Book */}
                <path
                  d="M50,50 L150,50 L150,150 L50,150 C40,150 40,50 50,50"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <path d="M50,50 C60,50 60,150 50,150" fill="none" stroke="#ffffff" strokeWidth="2" />
                {/* Book pages */}
                <line x1="70" y1="70" x2="130" y2="70" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                <line x1="70" y1="85" x2="130" y2="85" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                <line x1="70" y1="100" x2="110" y2="100" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                {/* Magnifying glass */}
                <circle cx="130" cy="115" r="20" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
                <line x1="145" y1="130" x2="160" y2="145" stroke="#ffffff" strokeWidth="3" />
                {/* Arrow */}
                <path d="M100,180 L120,165 L100,150 Q110,165 100,180" fill="#ffffff" opacity="0.9" />
                <line x1="80" y1="165" x2="100" y2="165" stroke="#ffffff" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">跳转到初中物理</h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
