"use client"

import { ReactNode, useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { ExperimentHeader } from "@/components/experiment/ExperimentHeader"

interface ExperimentLayoutProps {
  children: ReactNode
}

export default function ExperimentLayout({ children }: ExperimentLayoutProps) {
  const params = useParams<{ "experiment-id": string }>()
  const pathname = usePathname()
  
  // 提取实验ID，可能从路径参数或URL路径中获取
  const getExperimentId = () => {
    // 首先尝试从路径参数获取
    if (params && params["experiment-id"]) {
      return params["experiment-id"] as string
    }
    
    // 如果没有路径参数，从URL路径中提取
    // URL路径形如 /experiments/personal-carbon-footprint
    const segments = pathname.split('/')
    if (segments.length > 2) {
      return segments[2] // 获取 'personal-carbon-footprint' 部分
    }
    
    return ""
  }
  
  const experimentId = getExperimentId()
  
  // 如果找不到实验或模块数据，仍然渲染子组件
  // 子组件可能有自己的错误处理逻辑
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <ExperimentHeader experimentId={experimentId} />

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
} 