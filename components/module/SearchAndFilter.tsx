"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Difficulty } from "@/lib/database"

interface SearchAndFilterProps {
  onSearch?: (term: string) => void
  onDifficultyChange?: (difficulty: Difficulty | "all") => void
}

export default function SearchAndFilter({
  onSearch,
  onDifficultyChange
}: SearchAndFilterProps = {}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (onSearch) onSearch(value)
  }

  const handleDifficultyChange = (value: "all" | Difficulty) => {
    setDifficulty(value)
    if (onDifficultyChange) onDifficultyChange(value)
  }

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="relative md:w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="搜索实验..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value as "all" | Difficulty)}
              className="rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">所有难度</option>
              <option value="基础">基础</option>
              <option value="中级">中级</option>
              <option value="高级">高级</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
} 