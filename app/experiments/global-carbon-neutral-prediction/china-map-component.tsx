"use client"

import { useEffect, useRef } from 'react'

interface ChinaMapProps {
  data?: any[]
  selectedProvince?: string
  onProvinceSelect?: (province: string) => void
}

export default function ChinaMapComponent({ data, selectedProvince, onProvinceSelect }: ChinaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 这里可以集成真实的地图库，如 AntV L7 或 ECharts
    // 目前使用占位符
  }, [data])

  // 模拟省份数据
  const provinces = [
    { name: "北京", x: 60, y: 25, value: 12500 },
    { name: "上海", x: 75, y: 45, value: 18900 },
    { name: "广东", x: 65, y: 75, value: 65800 },
    { name: "江苏", x: 70, y: 40, value: 78200 },
    { name: "山东", x: 65, y: 35, value: 89500 },
    { name: "河南", x: 60, y: 45, value: 67800 }
  ]

  const maxValue = Math.max(...provinces.map(p => p.value))

  return (
    <div ref={mapRef} className="w-full h-full relative bg-blue-50 rounded-lg overflow-hidden">
      {/* 地图背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute top-4 left-4 text-sm text-gray-600">
          中国各省碳排放分布图
        </div>
        
        {/* 模拟中国轮廓 */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* 简化的中国边界 */}
          <path
            d="M20,30 Q30,20 50,25 Q70,20 85,35 Q90,50 85,70 Q75,85 50,80 Q30,85 15,70 Q10,50 20,30 Z"
            fill="rgba(34, 197, 94, 0.1)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.5"
          />
          
          {/* 省份标记点 */}
          {provinces.map((province) => {
            const radius = 2 + (province.value / maxValue) * 8
            const isSelected = selectedProvince === province.name
            
            return (
              <g key={province.name}>
                <circle
                  cx={province.x}
                  cy={province.y}
                  r={radius}
                  fill={isSelected ? "#ef4444" : "#f59e0b"}
                  stroke={isSelected ? "#dc2626" : "#d97706"}
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-200 hover:scale-110"
                  onClick={() => onProvinceSelect?.(province.name)}
                />
                <text
                  x={province.x}
                  y={province.y - radius - 2}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 pointer-events-none"
                  fontSize="3"
                >
                  {province.name}
                </text>
                <text
                  x={province.x}
                  y={province.y + radius + 4}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 pointer-events-none"
                  fontSize="2.5"
                >
                  {(province.value / 10000).toFixed(1)}万吨
                </text>
              </g>
            )
          })}
        </svg>
        
        {/* 图例 */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 text-xs">
          <div className="font-semibold mb-2">碳排放量图例</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>一般排放</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span>中等排放</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
            <span>高排放</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>已选择</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 