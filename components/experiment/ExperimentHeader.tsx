"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getExperiment, modules, getModuleExperiments, Experiment } from "@/lib/database"
import { ChevronDown } from "lucide-react"

interface ExperimentHeaderProps {
  experimentId: string
}

export function ExperimentHeader({ experimentId }: ExperimentHeaderProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [experiment, setExperiment] = useState<Experiment | null>(null)
  const [module, setModule] = useState<any>(null)
  const [moduleExperiments, setModuleExperiments] = useState<Experiment[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  
  // 获取实验和模块数据
  useEffect(() => {
    try {
      if (!experimentId) {
        setError("实验ID为空")
        setLoading(false)
        return
      }
      
      const exp = getExperiment(experimentId)
      if (!exp) {
        setError(`未找到ID为 ${experimentId} 的实验`)
        setLoading(false)
        return
      }
      
      setExperiment(exp)
      
      const mod = modules.find(m => m.id === exp.module)
      if (mod) {
        setModule(mod)
        // 获取该模块下的所有实验
        const experiments = getModuleExperiments(mod.id)
        setModuleExperiments(experiments)
      }
      
      setLoading(false)
    } catch (err) {
      setError("加载实验数据时出错")
      setLoading(false)
    }
  }, [experimentId])
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#experiments-dropdown") && !target.closest("#experiments-menu")) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-semibold text-gray-800 shrink-0">
              <i className="fas fa-leaf mr-2 text-green-500"></i>
              碳经济可视化教学平台
            </Link>
            
            {/* 面包屑导航 */}
            <div className="md:flex hidden">
              {loading ? (
                <div className="text-sm text-gray-500">加载中...</div>
              ) : error ? (
                <div className="text-sm text-gray-500">首页</div>
              ) : (
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-sm text-gray-600 hover:text-gray-900">首页</BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {module && (
                      <>
                        <BreadcrumbSeparator className="text-gray-400" />
                        <BreadcrumbItem>
                          <BreadcrumbLink href={`/modules/${module.id}`} className="text-sm text-gray-600 hover:text-gray-900">
                            {module.title}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </>
                    )}
                    
                    {experiment && (
                      <>
                        <BreadcrumbSeparator className="text-gray-400" />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="text-sm font-medium text-gray-900">{experiment.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              )}
            </div>
          </div>
          
          {/* 实验切换下拉菜单 */}
          {!loading && !error && experiment && moduleExperiments.length > 0 && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  id="experiments-dropdown"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span>{experiment.title}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {menuOpen && (
                  <div
                    id="experiments-menu"
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {moduleExperiments.map((exp) => (
                        <Link
                          key={exp.id}
                          href={exp.route || `/experiments/${exp.id}`}
                          className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                            exp.id === experiment.id 
                              ? "font-semibold text-indigo-600" 
                              : "text-gray-700"
                          }`}
                          role="menuitem"
                        >
                          {exp.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 