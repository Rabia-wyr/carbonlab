"use client"

import { useEffect } from "react"
import HeroSection from "@/components/home/HeroSection"
import FeaturesGrid from "@/components/home/FeaturesGrid"
import Footer from "@/components/home/Footer"
import HomeHeader from "@/components/home/HomeHeader"

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
      <HomeHeader />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <FeaturesGrid />

        <section id="experiments" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">热门实验</h2>
          <p className="mb-8 text-gray-600">这些是我们平台上精选的模拟实验，每个领域各一个。每个模拟都提供了交互控制，让您能够调整参数，观察变化。更多模块可在各领域页面中找到。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 碳足迹计算器 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-emerald-50 flex items-center justify-center">
                <i className="fas fa-shoe-prints text-6xl text-emerald-600"></i>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">碳足迹计算器</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">基础</span>
                </div>
                <p className="text-gray-600 mb-4">模拟不同场景下的碳排放计算与可视化分析</p>
                <a
                  href="#"
                  className="inline-block bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-calculator mr-2"></i>开始计算
                </a>
              </div>
            </div>

            {/* 碳交易模拟器 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-purple-50 flex items-center justify-center">
                <i className="fas fa-coins text-6xl text-purple-600"></i>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">碳交易模拟</h3>
                  <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">中级</span>
                </div>
                <p className="text-gray-600 mb-4">模拟碳排放权交易市场，体验配额分配与交易策略</p>
                <a
                  href="#"
                  className="inline-block bg-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-hand-holding-usd mr-2"></i>开始交易
                </a>
              </div>
            </div>

            {/* 碳中和路径规划 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden bg-green-50 flex items-center justify-center">
                <i className="fas fa-chart-pie text-6xl text-green-600"></i>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">碳中和路径</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">高级</span>
                </div>
                <p className="text-gray-600 mb-4">多场景碳中和方案设计与效果模拟</p>
                <a
                  href="#"
                  className="inline-block bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-road mr-2"></i>路径规划
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">关于项目</h2>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="md:flex items-start">
              <div className="md:flex-1 mr-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">项目目标</h3>
                <p className="text-gray-600 mb-4">
                  本项目旨在通过交互式可视化模拟，帮助用户更直观地理解碳经济概念和原理。每个模块都经过精心设计，既符合实际应用场景，又能激发用户的学习兴趣。
                </p>
                <p className="text-gray-600 mb-4">
                  通过调整参数、观察现象变化，用户可以主动探索碳经济规律，培养环保意识和实践能力。
                </p>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 mt-6">作者简介</h3>
                <p className="text-gray-600">碳经济研究团队，专注于碳经济可视化教学与模拟</p>
              </div>
              <div className="md:flex-1 mt-6 md:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">使用建议</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>将模拟演示与实际案例相结合，加深理解</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>鼓励自主探索，提出问题并寻找解决方案</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>设计实践任务，引导用户发现碳经济规律</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>结合实际生活场景，增强学习的实用性</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
