"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-500">&copy; 2025 物理可视化教学平台. 保留所有权利.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <i className="fab fa-weixin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 inline-block"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M17 7L7 17M7 7l10 10" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
