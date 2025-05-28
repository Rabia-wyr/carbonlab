import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import { ExperimentStep } from "./types"

interface InventoryStepProps {
  onComplete: () => void
  onNext: (step: ExperimentStep) => void
  onPrevious: (step: ExperimentStep) => void
}

// 静态项目数据
const staticProjectData = {
  name: "某市环城快速路建设项目",
  description: "该项目为某市环城快速路建设工程，全长约15公里，包括主线道路、桥梁、隧道等基础设施建设。项目采用双向六车道设计，设计时速80公里/小时。"
}

// 静态工程量清单数据
const staticInventory = [
  { 
    id: "1", 
    name: "路基土方开挖", 
    unit: "立方米", 
    quantity: 125000, 
    description: "道路路基开挖土方量，包括表土清理和基础开挖" 
  },
  { 
    id: "2", 
    name: "路面混凝土浇筑", 
    unit: "立方米", 
    quantity: 18500, 
    description: "道路路面C30混凝土浇筑，厚度25cm" 
  },
  { 
    id: "3", 
    name: "钢筋使用", 
    unit: "吨", 
    quantity: 2800, 
    description: "桥梁和结构用HRB400钢筋" 
  },
  { 
    id: "4", 
    name: "沥青路面铺设", 
    unit: "平方米", 
    quantity: 180000, 
    description: "AC-20沥青混凝土路面铺设，厚度8cm" 
  },
  { 
    id: "5", 
    name: "碎石垫层", 
    unit: "立方米", 
    quantity: 45000, 
    description: "路基级配碎石垫层，厚度30cm" 
  }
]

export function InventoryStep({
  onComplete,
  onNext,
  onPrevious
}: InventoryStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          工程内容清单
        </CardTitle>
        <CardDescription>
          以下为本次实验的工程量清单数据，用于碳核算计算
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 项目基本信息 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">项目基本信息</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div>
              <span className="font-medium text-gray-700">项目名称：</span>
              <span className="text-gray-900">{staticProjectData.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">项目描述：</span>
              <p className="text-gray-900 mt-1">{staticProjectData.description}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* 工程量清单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">工程量清单</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">序号</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">工程项目</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">单位</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">工程量</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">描述</th>
                </tr>
              </thead>
              <tbody>
                {staticInventory.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.unit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      {item.quantity.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>说明：</strong>以上工程量清单为实验教学数据，基于真实项目案例整理。在实际项目中，工程量清单应根据设计图纸和现场勘察结果进行详细计算。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 