"use client"

import { useEffect, useState } from "react"
import ModulesGrid from "@/components/home/ModulesGrid"
import Footer from "@/components/home/Footer"
import HomeHeader from "@/components/home/HomeHeader"
import { CourseCard } from "@/components/course/CourseCard"
import { experiments } from "@/lib/database"
import { getCourses } from "@/lib/courses"
import { HeroBanner } from "@/components/home/HeroBanner"
import Link from "next/link"
import { BookOpen, FileText, BarChart3, Globe, ArrowRight } from "lucide-react"

// 获取模块背景样式
const getModuleBgClass = (module: string) => {
  switch (module) {
    case "carbon-monitor":
      return "bg-emerald-50";
    case "carbon-calculate":
      return "bg-blue-50";
    case "carbon-trading":
      return "bg-purple-50";
    case "carbon-neutral":
      return "bg-orange-50";
    default:
      return "bg-gray-50";
  }
};

// 获取模块图标样式
const getModuleIconClass = (module: string) => {
  switch (module) {
    case "carbon-monitor":
      return "text-emerald-600";
    case "carbon-calculate":
      return "text-blue-600";
    case "carbon-trading":
      return "text-purple-600";
    case "carbon-neutral":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
};

// 获取状态颜色
const getStatusColor = (status: string) => {
  switch (status) {
    case "开发中":
      return "bg-yellow-100 text-yellow-800";
    case "维护中":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 获取难度颜色
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "基础":
      return "bg-green-100 text-green-800";
    case "中级":
      return "bg-blue-100 text-blue-800";
    case "高级":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 获取模块按钮样式
const getModuleButtonClass = (module: string) => {
  switch (module) {
    case "carbon-monitor":
      return "bg-gradient-to-r from-green-600 to-emerald-700";
    case "carbon-calculate":
      return "bg-gradient-to-r from-blue-600 to-indigo-700";
    case "carbon-trading":
      return "bg-gradient-to-r from-purple-600 to-violet-700";
    case "carbon-neutral":
      return "bg-gradient-to-r from-orange-600 to-amber-700";
    default:
      return "bg-gradient-to-r from-gray-600 to-gray-700";
  }
};

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

    // 获取课程数据
    async function fetchCourses() {
      setLoading(true);
      const coursesData = await getCourses();
      // 只显示已上线的课程，并且限制为4个
      const availableCourses = coursesData
        .filter(course => course.status !== "draft" && course.status !== "archived")        
        .slice(0, 4);
      setCourses(availableCourses);
      setLoading(false);
    }

    fetchCourses();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeader />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroBanner />

        <section id="consulting" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">碳经济咨询</h2>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">碳经济信息中心</h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                汇聚最新的碳经济政策法规、权威研究文章和公开数据资源，为您提供全面、及时、准确的碳经济信息服务，助力双碳目标实现。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">政策法规</h4>
                <p className="text-gray-600 text-sm">国家和地方层面的碳经济相关政策法规文件，及时跟踪政策动态</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">公开文章</h4>
                <p className="text-gray-600 text-sm">权威机构发布的碳经济研究文章和报告，深度解读行业趋势</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">公开数据</h4>
                <p className="text-gray-600 text-sm">碳经济相关的公开数据集和统计资料，支持研究和决策分析</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/consulting"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>探索碳经济咨询</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <ModulesGrid />

        <section id="courses" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">热门课程</h2>
          <p className="mb-8 text-gray-600">探索我们平台上的精选课程，每个课程都包含了系统化的学习路径和丰富的实践内容，帮助您从零开始掌握碳经济相关知识。</p>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">加载课程中...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>

        <section id="experiments" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">热门实验</h2>
          <p className="mb-8 text-gray-600">探索我们平台上的精选模拟实验，每个实验都提供了交互控制，让您能够调整参数，观察变化。更多实验可在各领域模块页面中找到。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                className="card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
              >
                <div className="h-48 overflow-hidden relative">
                  {experiment.image ? (
                    <img 
                      src={experiment.image.startsWith('/') ? experiment.image : `/${experiment.image}`}
                      alt={experiment.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`h-full ${getModuleBgClass(experiment.module)} flex items-center justify-center`}>
                      {experiment.icon && <i className={`fas fa-${experiment.icon} text-6xl ${getModuleIconClass(experiment.module)}`}></i>}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{experiment.title}</h3>
                    <div className="flex items-center gap-2">
                      {experiment.status && (experiment.status === "开发中" || experiment.status === "维护中") && (
                        <span className={`text-xs font-medium ${getStatusColor(experiment.status)} px-2 py-1 rounded`}>
                          {experiment.status}
                        </span>
                      )}
                      <span className={`text-xs font-medium ${getDifficultyColor(experiment.difficulty)} px-2 py-1 rounded`}>
                        {experiment.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{experiment.description}</p>
                  <Link
                    href={experiment.route || '#'}
                    className={`inline-block ${getModuleButtonClass(experiment.module)} text-white font-medium px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105`}
                  >
                    <BookOpen className="h-4 w-4 inline-block mr-2" />
                    开始实验
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 关于平台 */}   
        <section id="about" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">关于平台</h2>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="md:flex items-stretch gap-8">
              <div className="md:flex-1">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-full">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">平台简介</h3>
                  <p className="text-gray-600 text-lg leading-relaxed indent-8 text-justify">
                    为积极践行国家双碳战略，助力高校、行业机构、企业决策者提升"双碳"知识、能力和战略高度，设计涵盖应用场景、知识模块以及系统资源的碳经济与管理AI实训平台，加强学生对碳排放、碳交易、碳足迹等关键知识的理解和应用能力，推动教学内容的改革和教学创新。
                  </p>
                </div>
              </div>
              <div className="md:flex-1 mt-6 md:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-full">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">平台优势</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>从碳监测、核算、管理到碳市场、金融、规则，打造闭环式碳能力实训体系，培育市场急需的"双碳"精英人才。</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>整合数字教材、真实案例、虚拟实验与AI智能助教，突破传统局限，支持按需组合的个性化教学与学习体验。</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>构建绿色交通、零碳园区等高仿真多元化场景，赋能学生跨学科应用能力，无缝对接产业真实挑战。</span>
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