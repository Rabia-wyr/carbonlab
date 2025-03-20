"use client"

import { useEffect } from "react"
import HeroSection from "@/components/home/HeroSection"
import FeaturesGrid from "@/components/home/FeaturesGrid"
import Footer from "@/components/home/Footer"

export default function Home() {
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

  const href = anchor.getAttribute("href");
  if (href) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  }
});
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
        <HeroSection />

        <FeaturesGrid />

        <section id="simulations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">热门模块</h2>
          <p className="mb-8 text-gray-600">
            这些是我们平台上精选的物理模拟实验，每个领域各一个。每个模拟都提供了交互控制，让您能够调整参数，观察变化。更多模块可在各领域页面中找到。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mechanics - Momentum Conservation */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-indigo-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  className="w-full h-full p-4"
                >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  className="w-full h-full p-4"
                >
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
                  <path
                    d="M 60,100 Q 80,70 100,100 Q 120,130 140,100"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 60,90 Q 80,60 100,90 Q 120,120 140,90"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                  />
                  <path
                    d="M 60,110 Q 80,80 100,110 Q 120,140 140,110"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  className="w-full h-full p-4"
                >
                  {/* 2D wave interference pattern */}
                  {/* Wave source 1 */}
                  <circle cx="50" cy="100" r="5" fill="#5E6AD2" />
                  {/* Wave source 2 */}
                  <circle cx="150" cy="100" r="5" fill="#5E6AD2" />
                  {/* Ripples - source 1 */}
                  <circle
                    cx="50"
                    cy="100"
                    r="20"
                    fill="none"
                    stroke="#5E6AD2"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <circle
                    cx="50"
                    cy="100"
                    r="40"
                    fill="none"
                    stroke="#5E6AD2"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <circle
                    cx="50"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="#5E6AD2"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <circle
                    cx="50"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#5E6AD2"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                  {/* Ripples - source 2 */}
                  <circle
                    cx="150"
                    cy="100"
                    r="20"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <circle
                    cx="150"
                    cy="100"
                    r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <circle
                    cx="150"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <circle
                    cx="150"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    opacity="0.2"
                  />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  className="w-full h-full p-4"
                >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  className="w-full h-full p-4"
                >
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
                <p className="text-gray-600 mb-4">
                  学习物理实验数据的统计分析、误差处理和图形可视化技巧。
                </p>
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

        {Footer()}
      </main>
    </div>
  )
}
