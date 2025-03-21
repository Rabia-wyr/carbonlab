"use client"

import { Module, Experiment, Difficulty } from "@/lib/database"
import Link from "next/link"
import { Play } from "lucide-react"
import { MonitorIcon, CalculateIcon, TradeIcon, NeutralIcon } from "@/components/module/ModuleIcons"

interface ExperimentListProps {
  module: Module
  searchTerm?: string
  difficultyFilter?: Difficulty | "all"
  categoryFilter?: string | "all"
}

export default function ExperimentList({
  module,
  searchTerm = "",
  difficultyFilter = "all",
  categoryFilter = "all"
}: ExperimentListProps) {
  // 过滤实验
  const filteredExperiments = module.experiments.filter((experiment: Experiment) => {
    const matchesSearch =
      experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDifficulty = difficultyFilter === "all" || experiment.difficulty === difficultyFilter
    
    // 由于 category 不存在于 Experiment 类型中，我们只使用 all 过滤
    const matchesCategory = categoryFilter === "all"

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{module.title}实验</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiments.map((experiment: Experiment) => (
          <div
            key={experiment.id}
            className="card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
          >
            <div className={`h-48 overflow-hidden ${module.color ? `bg-${module.color}-50` : 'bg-indigo-50'} flex items-center justify-center`}>
              {experiment.svg || 
                (experiment.icon && <i className={`fas fa-${experiment.icon} text-6xl ${module.color ? `text-${module.color}-600` : 'text-indigo-600'}`}></i>)
              }
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{experiment.title}</h3>
                <span className={`text-xs font-medium ${getDifficultyColor(experiment.difficulty)} px-2 py-1 rounded`}>
                  {experiment.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{experiment.description}</p>
              <Link
                href={experiment.route || `/experiment/${experiment.id}`}
                className={`inline-block ${module.color ? `bg-${module.color}-600 hover:bg-${module.color}-700` : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105`}
              >
                {experiment.icon ? <i className="fas fa-play mr-2"></i> : <Play className="h-4 w-4 inline-block mr-2" />}
                开始实验
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "基础":
      return "bg-green-100 text-green-800"
    case "中级":
      return "bg-indigo-100 text-indigo-800"
    case "高级":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
} 