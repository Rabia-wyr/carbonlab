"use client"

import { useEffect } from "react"
import HeroSection from "@/components/home/HeroSection"
import FeaturesGrid from "@/components/home/FeaturesGrid"
import Footer from "@/components/home/Footer"
import HomeHeader from "@/components/home/HomeHeader"
import ExperimentList from "@/components/module/ExperimentList"
import { experiments } from "@/lib/database"

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
          <p className="mb-8 text-gray-600">探索我们平台上的精选模拟实验，每个实验都提供了交互控制，让您能够调整参数，观察变化。更多实验可在各领域模块页面中找到。</p>
          
          {/* 使用 ExperimentList 组件展示所有实验，不显示额外的标题 */}
          <ExperimentList experiments={experiments} title="" />
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
