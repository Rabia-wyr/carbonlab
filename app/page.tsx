"use client"

import { useEffect } from "react"

export default function Home() {
  // Mobile menu toggle
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
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const href = this.getAttribute("href")
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800">
                <i className="fas fa-atom mr-2 text-indigo-600"></i>
                物理可视化教学
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
                五大领域
              </a>
              <a
                href="#simulations"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                热门模块
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
              五大领域
            </a>
            <a
              href="#simulations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              热门模块
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

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro section */}
        <section id="intro" className="mb-12">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-1 p-8 md:p-12 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">高中物理可视化教学平台</h1>
                <p className="text-lg md:text-xl mb-6 opacity-90">通过交互式动画模拟，深入理解物理概念和原理</p>
                <p className="mb-8 opacity-80">
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
                  {/* 物理科学图标 */}
                  <g fill="#ffffff">
                    {/* 原子模型 */}
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

                    {/* 电子 */}
                    <circle cx="180" cy="100" r="5" fill="#ffffff" opacity="0.8" />
                    <circle cx="40" cy="115" r="5" fill="#ffffff" opacity="0.8" />
                    <circle cx="100" cy="30" r="5" fill="#ffffff" opacity="0.8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Five Major Areas */}
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
                    {/* Base line */}
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#ffffff" strokeWidth="1" opacity="0.5" />

                    {/* Wave line 1 */}
                    <path
                      d="M 20,100 Q 35,60 50,100 Q 65,140 80,100 Q 95,60 110,100 Q 125,140 140,100 Q 155,60 170,100 Q 185,140 200,100"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Wave line 2 - semi-transparent */}
                    <path
                      d="M 20,100 Q 42.5,70 65,100 Q 87.5,130 110,100 Q 132.5,70 155,100 Q 177.5,130 200,100"
                      stroke="#ffffff"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                      strokeLinecap="round"
                    />

                    {/* Wave line 3 - more transparent */}
                    <path
                      d="M 20,100 Q 50,80 80,100 Q 110,120 140,100 Q 170,80 200,100"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.4"
                      strokeLinecap="round"
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
            {/* Optics and Modern Physics */}
            <div className="transform transition-all duration-300 hover:scale-105 hover:rotate-1">
              <a href="#" className="block">
                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-red-600 to-red-500 aspect-[3/2] flex items-center justify-center p-4">
                  {/* Background decoration */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-yellow-400 opacity-20"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-300 opacity-20"></div>

                  {/* Optics and Modern Physics icon - prism and quantum effects */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
                    {/* Optics icon - prism */}
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

            {/* Interdisciplinary Areas and Experimental Skills */}
            <div className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
              <a href="#" className="block">
                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-700 to-gray-500 aspect-[3/2] flex items-center justify-center p-4">
                  {/* Background decoration */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-400 opacity-20"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-green-300 opacity-20"></div>

                  {/* Interdisciplinary Areas and Experimental Skills icon */}
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

                    {/* Arrow - indicating jump */}
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

        {/* Popular Modules */}
        <section id="simulations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">热门模块</h2>
          <p className="mb-8 text-gray-600">
            这些是我们平台上精选的物理模拟实验，每个领域各一个。每个模拟都提供了交互控制，让您能够调整参数，观察变化。更多模块可在各领域页面中找到。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mechanics - Momentum Conservation */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-indigo-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full p-4">
                  {/* Water surface */}
                  <rect x="0" y="150" width="200" height="50" fill="#5E6AD2" opacity="0.3" />
                  {/* Boat */}
                  <path d="M 50 130 L 150 130 L 160 150 L 40 150 Z" fill="#F59E0B" />
                  {/* Person */}
                  {/* Head */}
                  <circle cx="100" cy="90" r="10" fill="#10B981" />
                  {/* Body */}
                  <line x1="100" y1="100" x2="100" y2="120" stroke="#10B981" strokeWidth="4" />
                  {/* Arms */}
                  <line x1="100" y1="105" x2="85" y2="115" stroke="#10B981" strokeWidth="3" />
                  <line x1="100" y1="105" x2="115" y2="115" stroke="#10B981" strokeWidth="3" />
                  {/* Legs */}
                  <line x1="100" y1="120" x2="90" y2="130" stroke="#10B981" strokeWidth="3" />
                  <line x1="100" y1="120" x2="110" y2="130" stroke="#10B981" strokeWidth="3" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">动量守恒模型</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">基础</span>
                </div>
                <p className="text-gray-600 mb-4">探索动量守恒定律在不同物理系统中的应用和表现。</p>
                <a
                  href="#"
                  className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-exchange-alt mr-2"></i>开始实验
                </a>
              </div>
            </div>

            {/* Electromagnetism */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-indigo-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full p-4">
                  {/* Electromagnetic induction pattern */}
                  <circle cx="100" cy="100" r="40" fill="none" stroke="#5E6AD2" strokeWidth="2" />
                  <circle
                    cx="100"
                    cy="100"
                    r="30"
                    fill="none"
                    stroke="#5E6AD2"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                  />
                  {/* Magnetic field lines */}
                  <path d="M 60,100 Q 80,70 100,100 Q 120,130 140,100" fill="none" stroke="#F59E0B" strokeWidth="2" />
                  <path
                    d="M 60,90 Q 80,60 100,90 Q 120,120 140,90"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  <path
                    d="M 60,110 Q 80,80 100,110 Q 120,140 140,110"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  {/* Wire and current */}
                  <line x1="100" y1="50" x2="100" y2="150" stroke="#10B981" strokeWidth="3" />
                  <polygon points="100,60 95,70 105,70" fill="#10B981" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">电磁感应实验</h3>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">中级</span>
                </div>
                <p className="text-gray-600 mb-4">探索移动导体棒在磁场中产生感应电动势的现象和规律。</p>
                <a
                  href="#"
                  className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-bolt mr-2"></i>开始实验
                </a>
              </div>
            </div>

            {/* Wave Interference */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-indigo-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full p-4">
                  {/* 2D wave interference pattern */}
                  {/* Wave source 1 */}
                  <circle cx="50" cy="100" r="5" fill="#5E6AD2" />
                  {/* Wave source 2 */}
                  <circle cx="150" cy="100" r="5" fill="#5E6AD2" />

                  {/* Ripples - source 1 */}
                  <circle cx="50" cy="100" r="20" fill="none" stroke="#5E6AD2" strokeWidth="1" opacity="0.8" />
                  <circle cx="50" cy="100" r="40" fill="none" stroke="#5E6AD2" strokeWidth="1" opacity="0.6" />
                  <circle cx="50" cy="100" r="60" fill="none" stroke="#5E6AD2" strokeWidth="1" opacity="0.4" />
                  <circle cx="50" cy="100" r="80" fill="none" stroke="#5E6AD2" strokeWidth="1" opacity="0.2" />

                  {/* Ripples - source 2 */}
                  <circle cx="150" cy="100" r="20" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
                  <circle cx="150" cy="100" r="40" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
                  <circle cx="150" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
                  <circle cx="150" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.2" />

                  {/* Interference area */}
                  <path
                    d="M 80 40 C 100 60, 100 140, 120 160"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,3"
                  />
                  <path
                    d="M 80 160 C 100 140, 100 60, 120 40"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,3"
                  />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">波的二维干涉</h3>
                  <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded">高级</span>
                </div>
                <p className="text-gray-600 mb-4">观察两个波源在二维平面上产生的干涉图样，有多种效果可以选择。</p>
                <a
                  href="#"
                  className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-water mr-2"></i>开始实验
                </a>
              </div>
            </div>

            {/* Double-slit Interference */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-indigo-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full p-4">
                  {/* Double-slit interference pattern */}
                  <rect x="20" y="80" width="10" height="40" fill="#5E6AD2" opacity="0.9" />
                  <rect x="50" y="80" width="10" height="40" fill="#5E6AD2" opacity="0.9" />

                  {/* Incident light */}
                  <line x1="0" y1="100" x2="20" y2="100" stroke="#F59E0B" strokeWidth="2" />
                  <polygon points="15,95 20,100 15,105" fill="#F59E0B" />

                  {/* Interference pattern */}
                  <path
                    d="M 60 100 Q 80 60, 100 100 Q 120 140, 140 100 Q 160 60, 180 100"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 60 100 Q 80 140, 100 100 Q 120 60, 140 100 Q 160 140, 180 100"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.5"
                  />

                  {/* Interference fringes */}
                  <rect x="180" y="70" width="5" height="10" fill="#10B981" opacity="0.8" />
                  <rect x="180" y="90" width="5" height="10" fill="#10B981" opacity="0.8" />
                  <rect x="180" y="110" width="5" height="10" fill="#10B981" opacity="0.8" />
                  <rect x="180" y="130" width="5" height="10" fill="#10B981" opacity="0.8" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">双缝干涉测波长</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">基础</span>
                </div>
                <p className="text-gray-600 mb-4">探索光的波动性，通过双缝干涉现象测量光的波长。</p>
                <a
                  href="#"
                  className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-microscope mr-2"></i>开始实验
                </a>
              </div>
            </div>

            {/* Data Analysis */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-indigo-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full p-4">
                  {/* Data analysis icon */}
                  <rect x="40" y="60" width="120" height="80" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />

                  {/* Coordinate axes */}
                  <line x1="60" y1="120" x2="140" y2="120" stroke="#64748b" strokeWidth="2" />
                  <line x1="60" y1="120" x2="60" y2="80" stroke="#64748b" strokeWidth="2" />

                  {/* Data points and fitting curve */}
                  <circle cx="80" cy="100" r="3" fill="#3b82f6" />
                  <circle cx="90" cy="90" r="3" fill="#3b82f6" />
                  <circle cx="100" cy="95" r="3" fill="#3b82f6" />
                  <circle cx="110" cy="85" r="3" fill="#3b82f6" />
                  <circle cx="120" cy="80" r="3" fill="#3b82f6" />

                  <path d="M 60,105 Q 90,75 120,80" stroke="#ef4444" strokeWidth="2" fill="none" />

                  {/* Error bars */}
                  <line x1="80" y1="95" x2="80" y2="105" stroke="#64748b" strokeWidth="1" />
                  <line x1="90" y1="85" x2="90" y2="95" stroke="#64748b" strokeWidth="1" />
                  <line x1="100" y1="90" x2="100" y2="100" stroke="#64748b" strokeWidth="1" />
                  <line x1="110" y1="80" x2="110" y2="90" stroke="#64748b" strokeWidth="1" />
                  <line x1="120" y1="75" x2="120" y2="85" stroke="#64748b" strokeWidth="1" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">数据分析与处理</h3>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">中级</span>
                </div>
                <p className="text-gray-600 mb-4">学习物理实验数据的统计分析、误差处理和图形可视化技巧。</p>
                <a
                  href="#"
                  className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-chart-line mr-2"></i>开始学习
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Project */}
        <section id="about" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">关于项目</h2>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="md:flex items-start">
              <div className="md:flex-1 mr-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">项目目标</h3>
                <p className="text-gray-600 mb-4">
                  本项目旨在通过交互式可视化模拟，帮助高中生更直观地理解物理概念和原理。每个模拟都经过精心设计，既符合教学大纲要求，又能激发学生的学习兴趣。
                </p>
                <p className="text-gray-600 mb-4">
                  通过调整参数、观察现象变化，学生可以主动探索物理规律，培养科学思维和实验能力。
                </p>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 mt-6">作者简介</h3>
                <p className="text-gray-600">Lisa（stardust），AI+物理教育爱好者制作</p>
              </div>
              <div className="md:flex-1 mt-6 md:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">教学建议</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>将模拟演示与课堂讲解相结合，加深学生理解</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>鼓励学生自主探索，提出问题并寻找答案</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>设计探究性任务，引导学生发现物理规律</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>结合实际生活现象，增强学习的实用性</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">高中物理可视化教学平台</h3>
              <p className="text-gray-600">让抽象的物理概念变得直观易懂</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-4">资源链接</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      教学指南
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      常见问题
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      更新日志
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-4">相关资源</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      物理教学资料
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      实验指导
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      学习社区
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 md:flex md:items-center md:justify-between">
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
    </div>
  )
}

