"use client"

import { useState, useEffect } from "react"
import { Module, modules } from "@/lib/database"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface ModuleHeaderProps {
  module: Module
}

export default function ModuleHeader({ module }: ModuleHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#modules-dropdown") && !target.closest("#modules-menu")) {
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
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-gray-800">
              <i className="fas fa-leaf mr-2 text-green-500"></i>
              碳经济可视化教学平台
            </Link>
          </div>
          
          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                id="modules-dropdown"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span>{module.title}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {menuOpen && (
                <div
                  id="modules-menu"
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {modules.map((m) => (
                      <Link
                        key={m.id}
                        href={`/modules/${m.id}`}
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                          m.id === module.id 
                            ? "font-semibold text-indigo-600" 
                            : "text-gray-700"
                        }`}
                        role="menuitem"
                      >
                        {m.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 