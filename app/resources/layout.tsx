"use client"

import { ReactNode } from "react"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface ResourceLayoutProps {
  children: ReactNode
}

export default function ResourceLayout({ children }: ResourceLayoutProps) {
  const params = useParams<{ "resource-id": string }>()
  const pathname = usePathname()
  
  // 提取资源ID，可能从路径参数或URL路径中获取
  const getResourceId = (): string => {
    // 直接从 params 对象获取资源 ID
    if (params && params["resource-id"]) {
      return params["resource-id"]
    }
    
    // 如果没有路径参数，从URL路径中提取
    // URL路径形如 /resources/carbon-credits
    const segments = pathname.split('/')
    if (segments.length > 2) {
      return segments[2] // 获取 'carbon-credits' 部分
    }
    
    return ""
  }
  
  const resourceId = getResourceId()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
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
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-sm text-gray-600 hover:text-gray-900">首页</BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    <BreadcrumbSeparator className="text-gray-400" />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/resources" className="text-sm text-gray-600 hover:text-gray-900">
                        资源目录
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {resourceId && (
                      <>
                        <BreadcrumbSeparator className="text-gray-400" />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="text-sm font-medium text-gray-900">资源详情</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
} 