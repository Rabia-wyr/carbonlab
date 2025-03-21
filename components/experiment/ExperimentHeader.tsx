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
import { getExperiment, modules } from "@/lib/database"

interface ExperimentHeaderProps {
  experimentId: string
}

export function ExperimentHeader({ experimentId }: ExperimentHeaderProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [experiment, setExperiment] = useState<any>(null)
  const [module, setModule] = useState<any>(null)
  
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
      }
      
      setLoading(false)
    } catch (err) {
      setError("加载实验数据时出错")
      setLoading(false)
    }
  }, [experimentId])
  
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
        </div>
      </div>
    </nav>
  )
} 