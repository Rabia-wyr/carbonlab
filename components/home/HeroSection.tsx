"use client"

export default function HeroSection() {
  return (
    <section id="intro" className="mb-12">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">高中物理可视化教学平台</h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">通过交互式动画模拟，深入理解物理概念和原理</p>
            <p className="text-base md:text-lg mb-8 opacity-80">
              本平台提供多个经典物理现象的可视化模拟，帮助学生直观地理解抽象概念，培养物理直觉和科学思维。
            </p>
            <a
              href="#simulations"
              className="inline-block bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 transform hover:scale-105"
            >
              <i className="fas fa-play-circle mr-2"></i>开始探索
            </a>
          </div>
          <div className="md:flex-1 flex items-center justify-center p-8 md:p-12 bg-indigo-800 bg-opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="rounded-lg shadow-lg max-h-80 w-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <g fill="#ffffff">
                <circle cx="100" cy="100" r="15" fill="#ffffff" opacity="0.9" />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="80"
                  ry="30"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.6"
                  transform="rotate(0,100,100)"
                />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="80"
                  ry="30"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.6"
                  transform="rotate(60,100,100)"
                />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="80"
                  ry="30"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.6"
                  transform="rotate(120,100,100)"
                />
                <circle cx="180" cy="100" r="5" fill="#ffffff" opacity="0.8" />
                <circle cx="40" cy="115" r="5" fill="#ffffff" opacity="0.8" />
                <circle cx="100" cy="30" r="5" fill="#ffffff" opacity="0.8" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
