"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon, SearchIcon, ChevronDown } from "lucide-react"
import { modules, Module } from "@/lib/database"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface ModuleNavbarProps {
  currentModule: Module
}

export default function ModuleNavbar({ currentModule }: ModuleNavbarProps) {
  const router = useRouter()
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#category-dropdown") && !target.closest("#category-menu")) {
        setCategoryMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center gap-4 px-4">
        {/* 返回首页按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          返回首页
        </Link>

        {/* 模块选择器 */}
        <div className="flex-1 md:max-w-[180px]">
          <Select
            defaultValue={currentModule.id}
            onValueChange={(value) => router.push(`/module/${value}`)}
          >
            <SelectTrigger>
              <SelectValue placeholder={currentModule.title} />
            </SelectTrigger>
            <SelectContent>
              {modules.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 搜索框 */}
        <div className="flex flex-1 items-center gap-2">
          <SearchIcon className="h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="搜索实验..."
            className="h-9 md:max-w-[300px] bg-transparent"
          />
        </div>

        {/* 物理领域下拉菜单 */}
        <div className="relative">
          <button
            id="category-dropdown"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
          >
            <span>物理领域</span>
            <ChevronDown className="ml-1" />
          </button>
          {categoryMenuOpen && (
            <div
              id="category-menu"
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                  role="menuitem"
                >
                  力学
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  电磁学
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  振动与波动
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  光学与现代物理
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  交叉领域与实验技能
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 