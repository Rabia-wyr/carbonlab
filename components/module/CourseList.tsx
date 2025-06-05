"use client"

import { Course } from "@/lib/database"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { toast } from "sonner"

interface CourseListProps {
  courses: Course[]
  searchTerm?: string
  difficultyFilter?: string | "all"
  title?: string
  onlyAvailable?: boolean
}

export default function CourseList({
  courses,
  searchTerm = "",
  difficultyFilter = "all",
  title = "课程列表",
  onlyAvailable = false
}: CourseListProps) {
  // 处理课程点击
  const handleCourseClick = (course: Course) => {
    if (course.status === "draft") {
      toast.info(`"${course.title}"课程正在开发中，敬请期待！`, {
        position: "top-center",
        duration: 3000,
      })
    } else if (course.status === "archived") {
      toast.warning(`"${course.title}"课程已下线，请选择其他课程！`, {
        position: "top-center",
        duration: 3000,
      })
    }
  }

  // 过滤课程
  const filteredCourses = courses.filter((course: Course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDifficulty = difficultyFilter === "all" || 
      (difficultyFilter === "基础" && course.difficulty === "beginner") ||
      (difficultyFilter === "中级" && course.difficulty === "intermediate") ||
      (difficultyFilter === "高级" && course.difficulty === "advanced")

    // 根据 onlyAvailable 参数决定是否只显示已上线的课程
    const matchesAvailability = onlyAvailable ? 
      (course.status === "published") : true

    return matchesSearch && matchesDifficulty && matchesAvailability
  })

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course: Course) => {
          const isAvailable = course.status === "published";
          
          return (
            <div
              key={course.id}
              className="card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <div className="h-48 overflow-hidden relative">
                {course.image ? (
                  <img 
                    src={course.image.startsWith('/') ? course.image : `/${course.image}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`h-full ${getModuleBgClass(course.module)} flex items-center justify-center`}>
                    {course.icon && <i className={`fas fa-${course.icon} text-6xl ${getModuleIconClass(course.module)}`}></i>}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                  <div className="flex items-center gap-2">
                    {course.status && (course.status === "draft" || course.status === "archived") && (
                      <span className={`text-xs font-medium ${getStatusColor(course.status)} px-2 py-1 rounded`}>
                        {course.status === "draft" ? "开发中" : "已下线"}
                      </span>
                    )}
                    <span className={`text-xs font-medium ${getDifficultyColor(course.difficulty)} px-2 py-1 rounded`}>
                      {course.difficulty === "beginner" ? "基础" : 
                       course.difficulty === "intermediate" ? "中级" : "高级"}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                {isAvailable ? (
                  <Link
                    href={course.route}
                    className={`inline-block ${getModuleButtonClass(course.module)} text-white font-medium px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105`}
                  >
                    <BookOpen className="h-4 w-4 inline-block mr-2" />
                    开始学习
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCourseClick(course)}
                    className={`inline-block ${getModuleButtonClass(course.module)} text-white font-medium px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105`}
                  >
                    <BookOpen className="h-4 w-4 inline-block mr-2" />
                    开始学习
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// 根据状态获取对应的颜色类名
function getStatusColor(status: string): string {
  switch (status) {
    case "draft":
      return "bg-amber-100 text-amber-800"
    case "archived":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-green-100 text-green-800"
  }
}

// 根据模块ID获取对应的背景颜色类名
function getModuleBgClass(moduleId: string): string {
  switch (moduleId) {
    case "carbon-monitor":
      return "bg-emerald-50"
    case "carbon-calculate":
      return "bg-blue-50"
    case "carbon-trading":
      return "bg-purple-50"
    case "carbon-neutral":
      return "bg-orange-50"
    default:
      return "bg-indigo-50"
  }
}

// 根据模块ID获取对应的图标颜色类名
function getModuleIconClass(moduleId: string): string {
  switch (moduleId) {
    case "carbon-monitor":
      return "text-emerald-600"
    case "carbon-calculate":
      return "text-blue-600"
    case "carbon-trading":
      return "text-purple-600"
    case "carbon-neutral":
      return "text-orange-600"
    default:
      return "text-indigo-600"
  }
}

// 根据模块ID获取对应的按钮背景颜色类名
function getModuleButtonClass(moduleId: string): string {
  switch (moduleId) {
    case "carbon-monitor":
      return "bg-emerald-600 hover:bg-emerald-700"
    case "carbon-calculate":
      return "bg-blue-600 hover:bg-blue-700"
    case "carbon-trading":
      return "bg-purple-600 hover:bg-purple-700"
    case "carbon-neutral":
      return "bg-orange-600 hover:bg-orange-700"
    default:
      return "bg-indigo-600 hover:bg-indigo-700"
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800"
    case "intermediate":
      return "bg-indigo-100 text-indigo-800"
    case "advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
} 