"use client"

import { useState, useEffect } from "react"

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
  // 是否正在滑动
  const [isSliding, setIsSliding] = useState(false)

  // 自动切换背景图片
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSliding) {
        setIsSliding(true)
        // 等待滑动动画完成后切换图片
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
          )
          setIsSliding(false)
        }, 500) // 500ms 后切换图片
      }
    }, 5000) // 每 5 秒切换一次

    return () => clearInterval(interval)
  }, [isSliding])

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
        className={`absolute inset-0 transition-transform duration-500 ${isSliding ? "-translate-x-full" : "translate-x-0"}`}
        style={{
          backgroundImage: `url("${backgroundImages[currentImageIndex]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 黑色遮罩层 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* 下一张背景图片 */}
      <div 
        className={`absolute inset-0 transition-transform duration-500 ${isSliding ? "translate-x-0" : "translate-x-full"}`}
        style={{
          backgroundImage: `url("${backgroundImages[nextImageIndex]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
    </div>
  )
}
