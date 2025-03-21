"use client"

import Link from "next/link"
import { MonitorIcon, CalculateIcon, TradeIcon, NeutralIcon } from "@/components/module/ModuleIcons"
import { modules } from "@/lib/database"

// 图标映射
const iconMap = {
  "carbon-monitor": MonitorIcon,
  "carbon-calculate": CalculateIcon,
  "carbon-trading": TradeIcon,
  "carbon-neutral": NeutralIcon,
} as const

export default function ModulesGrid() {
  return (
    <section id="categories" className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">四大领域</h2>
      <p className="mb-8 text-gray-600">掌握碳经济关键环节，构建完整知识体系</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = iconMap[module.id as keyof typeof iconMap]
          return (
            <Link 
              key={module.id} 
              href={`/modules/${module.id}`} 
              className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1 block"
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br ${
                module.id === "carbon-monitor" ? "from-green-600 to-emerald-700" :
                module.id === "carbon-calculate" ? "from-blue-600 to-indigo-700" :
                module.id === "carbon-trading" ? "from-purple-600 to-violet-700" :
                "from-orange-600 to-amber-700"
              } aspect-[3/2] flex items-center justify-center p-4`}>
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-yellow-400 opacity-20"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-white opacity-20"></div>
                <Icon />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
                <p className="text-gray-600 mt-2">{module.description}</p>
              </div>
            </Link>
          )
        })} 
      </div>
    </section>
  )
}
