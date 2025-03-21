"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">碳经济可视化教学平台</h3>
            <p className="text-gray-600">面向双碳战略的仿真模拟教学系统</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">资源链接</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    碳管理指南
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    常见问题
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    版本更新
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">相关资源</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    碳排放标准
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    碳核算指南
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    行业案例
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-500">&copy; 2025 碳经济可视化教学平台. All Rights Reserved.</p>
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
                fill="currentColor"
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
