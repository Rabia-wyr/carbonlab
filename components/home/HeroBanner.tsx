export function HeroBanner() {
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

  return (
    <div 
      id="intro" 
      className="relative h-[600px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white mb-12"
      style={{
        backgroundImage: 'url("/banner-1.webp")'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          碳经济与管理AI实训平台
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          领航新一代绿色未来
        </h2>
        <p className="text-xl md:text-2xl">
          全链条低碳实训，让你成为“双碳”时代的专业人才
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
