"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { modules, Module, Difficulty, getModuleExperiments, Course } from "@/lib/database"
import { getCoursesByModule } from "@/lib/courses"
import ModuleHeader from "@/components/module/ModuleHeader"
import ExperimentList from "@/components/module/ExperimentList"
import CourseList from "@/components/module/CourseList"
import SearchAndFilter from "@/components/module/SearchAndFilter"
import Footer from "@/components/home/Footer"
import Link from "next/link"
import { MonitorIcon, CalculateIcon, TradeIcon, NeutralIcon } from "@/components/module/ModuleIcons"
import React from "react"

export default function ModulePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all")

  const params = useParams<{ "module-id": string }>()
  const moduleId = params["module-id"]
  const module = modules.find((m: Module) => m.id === moduleId)

  if (!module) {
    notFound()
  }

  // 获取当前模块的所有课程
  const moduleCourses = getCoursesByModule(moduleId) as Course[]
  
  // 获取当前模块的所有实验
  const moduleExperiments = getModuleExperiments(moduleId)

  // 根据 module.id 选择合适的图标
  const getModuleIcon = () => {
    switch(module.id) {
      case "carbon-monitor":
        return <MonitorIcon />
      case "carbon-calculate":
        return <CalculateIcon />
      case "carbon-trading":
        return <TradeIcon />
      case "carbon-neutral":
        return <NeutralIcon />
      default:
        return <MonitorIcon />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 模块头部，包含导航栏 */}
      <ModuleHeader module={module} />

      {/* 模块内容容器 - 添加上边距，避免被固定导航栏遮挡 */}
      <div className="pt-6">
        {/* 模块介绍部分 */}
        <section className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r rounded-xl shadow-lg overflow-hidden ${
            module.id === "carbon-monitor" ? "from-green-600 to-emerald-700" :
            module.id === "carbon-calculate" ? "from-blue-600 to-indigo-700" :
            module.id === "carbon-trading" ? "from-purple-600 to-violet-700" :
            "from-orange-600 to-amber-700"
          }`}>
            <div className="md:flex">
              <div className="md:flex-1 p-8 md:p-12 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{module.title}</h1>
                <p className="text-lg md:text-xl mb-6 opacity-90">{module.subtitle || "面向双碳战略的仿真模拟教学系统"}</p>
                <p className="text-base md:text-lg mb-8 opacity-80">{module.description}</p>
                <Link
                  href="/"
                  className="inline-block bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-arrow-left mr-2"></i>返回首页
                </Link>
              </div>
              <div className="md:flex-1 flex items-center justify-center p-8 md:p-12 bg-opacity-30">
                {module.headerSvg || (
                  <div className="rounded-lg shadow-lg max-h-80 w-full bg-white bg-opacity-10 p-8 flex items-center justify-center">
                    {getModuleIcon()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 主要内容 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 搜索和过滤部分 */}
          <SearchAndFilter
            onSearch={setSearchTerm}
            onDifficultyChange={setDifficultyFilter}
          />

          {/* 课程列表 */}
          <CourseList
            courses={moduleCourses}
            searchTerm={searchTerm}
            difficultyFilter={difficultyFilter}
          />

          {/* 实验列表 */}
          <ExperimentList
            experiments={moduleExperiments}
            searchTerm={searchTerm}
            difficultyFilter={difficultyFilter}
          />
        </main>
      </div>

      <Footer />
    </div>
  )
} 