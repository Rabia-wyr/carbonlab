"use client"

import { useState, useEffect, useRef } from "react"

export function HeroBanner() {
  // 背景图片列表
  const backgroundImages = [
    "/banner-1.webp",
    "/banner-2.webp",
    "/banner-3.webp",
    "/banner-4.webp"
  ]

  // 当前显示的图片索引
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // 是否正在切换
  const [isTransitioning, setIsTransitioning] = useState(false)
  // 记录上一次自动切换的时间戳
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 自动切换背景图片
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
          )
          setIsTransitioning(false)
        }, 1000)
      }
    }, 6000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isTransitioning])

  // 手动切换图片
  const handleDotClick = (idx: number) => {
    if (idx === currentImageIndex || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(idx)
      setIsTransitioning(false)
    }, 1000)
  }

  const handleScrollToCategories = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const categoriesElement = document.getElementById('categories')
    if (categoriesElement) {
      categoriesElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // 计算下一张图片的索引
  const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length

  return (
    <div 
      id="intro" 
      className="relative h-[600px] overflow-hidden flex items-center justify-center text-white mb-12"
    >
      {/* 当前背景图片 */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
          isTransitioning ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: `url("${backgroundImages[currentImageIndex]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: isTransitioning ? 0 : 1
        }}
      >
        {/* 黑色遮罩层 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* 下一张背景图片 */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
          isTransitioning ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundImage: `url("${backgroundImages[nextImageIndex]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: isTransitioning ? 1 : 0
        }}
      >
        {/* 黑色遮罩层 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          碳经济与管理AI实训平台
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          领航新一代绿色未来
        </h2>
        <p className="text-xl md:text-2xl">
          全链条低碳实训，让你成为"双碳"时代的专业人才
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#categories"
            onClick={handleScrollToCategories}
            className="inline-block bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 transform hover:scale-105"
          >
            <i className="fas fa-play-circle mr-2"></i>开始探索
          </a>
          <a
            href="/resources"
            className="inline-block bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-800 transition duration-300 transform hover:scale-105 border border-white/20"
          >
            <i className="fas fa-book mr-2"></i>浏览资源
          </a>
        </div>
      </div>
      {/* 进度条/小圆点，绝对定位到底部 */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex justify-center items-center gap-3 z-20">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 focus:outline-none ${
              idx === currentImageIndex ? 'bg-white border-white shadow-lg scale-125' : 'bg-white/40 border-white/40'
            }`}
            style={{ cursor: isTransitioning ? 'not-allowed' : 'pointer' }}
            onClick={() => handleDotClick(idx)}
            aria-label={`切换到第${idx + 1}张图片`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  )
}
