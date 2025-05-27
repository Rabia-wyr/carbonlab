import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"
import { ExperimentStep } from "./types"

interface IntroductionStepProps {
  onComplete: () => void
  onNext: (step: ExperimentStep) => void
}

export function IntroductionStep({ onComplete, onNext }: IntroductionStepProps) {
  const handleStartExperiment = () => {
    onComplete()
    onNext("inventory")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="w-5 h-5 mr-2" />
          实验介绍
        </CardTitle>
        <CardDescription>
          了解交通基础设施碳核算的基本概念和实验流程
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 视频区域 */}
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <Play className="w-16 h-16 mx-auto text-gray-400" />
            <p className="text-gray-500">实验介绍视频</p>
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              播放视频
            </Button>
          </div>
        </div>

        {/* 文字介绍 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">实验背景</h3>
          <p className="text-gray-600">
            交通基础设施建设是国民经济发展的重要支撑，但同时也是碳排放的重要来源。
            随着"双碳"目标的提出，交通基础设施的碳核算成为行业关注的焦点。
          </p>
          
          <h3 className="text-xl font-semibold">实验目标</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>掌握交通基础设施碳核算的基本方法</li>
            <li>了解建设过程中各环节的碳排放特征</li>
            <li>学会使用碳核算工具进行实际计算</li>
            <li>分析碳排放结构，提出减排建议</li>
          </ul>

          <h3 className="text-xl font-semibold">实验流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">第一步：工程内容清单</h4>
              <p className="text-sm text-gray-600">建立详细的工程量清单，包括土方、混凝土、钢材等</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">第二步：碳核算</h4>
              <p className="text-sm text-gray-600">分别计算人工、机械、材料、能源四个方面的碳排放</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleStartExperiment}>
            开始实验
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 