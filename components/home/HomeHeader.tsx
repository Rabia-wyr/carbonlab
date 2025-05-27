"use client"

import { useEffect } from "react"

export default function HomeHeader() {
  useEffect(() => {
    const mobileMenuButton = document.getElementById("mobile-menu-button")
    const mobileMenu = document.getElementById("mobile-menu")

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden")
      })
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const anchorElement = e.currentTarget as HTMLAnchorElement;
        const href = anchorElement?.getAttribute("href");
        if (href) {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
            })

            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
              mobileMenu.classList.add("hidden")
            }
          }
        }
      })
    })
  }, [])

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">
              <i className="fas fa-leaf mr-2 text-green-500"></i>
              碳经济与管理AI实训平台
            </span>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#intro"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              简介
            </a>
            <a
              href="#categories"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              四大模块
            </a>
            <a
              href="#courses"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              热门课程
            </a>
            <a
              href="#experiments"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              热门实验
            </a>
            <a
              href="#about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              关于项目
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-button"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-white shadow-sm">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#intro"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            简介
          </a>
          <a
            href="#categories"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            四大模块
          </a>
          <a
            href="#courses"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            热门课程
          </a>
          <a
            href="#experiments"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            热门实验
          </a>
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
          >
            关于项目
          </a>
        </div>
      </div>
    </nav>
  )
}
