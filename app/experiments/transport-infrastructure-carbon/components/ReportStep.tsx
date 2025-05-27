import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Download } from "lucide-react"
import { CalculationResults, ExperimentStep } from "./types"

interface ReportStepProps {
  projectName: string
  projectDescription: string
  calculationResults: CalculationResults
  onComplete: () => void
  onPrevious: (step: ExperimentStep) => void
  onDownloadReport: () => void
}

export function ReportStep({
  projectName,
  projectDescription,
  calculationResults,
  onComplete,
  onPrevious,
  onDownloadReport
}: ReportStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          实验报告
        </CardTitle>
        <CardDescription>
          查看完整的碳核算分析报告和减排建议
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 项目概况 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">项目概况</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p><strong>项目名称：</strong>{projectName || "未填写"}</p>
            <p><strong>项目描述：</strong>{projectDescription || "未填写"}</p>
            <p><strong>核算日期：</strong>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* 碳排放结果分析 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">碳排放结果分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 排放量统计 */}
            <div className="space-y-4">
              <h4 className="font-medium">各类别排放量</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>人工</span>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={(calculationResults.labor / calculationResults.total) * 100} 
                      className="w-20" 
                    />
                    <span className="text-sm">{calculationResults.labor} kg CO₂e</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>机械使用</span>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={(calculationResults.machinery / calculationResults.total) * 100} 
                      className="w-20" 
                    />
                    <span className="text-sm">{calculationResults.machinery} kg CO₂e</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>材料</span>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={(calculationResults.materials / calculationResults.total) * 100} 
                      className="w-20" 
                    />
                    <span className="text-sm">{calculationResults.materials} kg CO₂e</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>能源</span>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={(calculationResults.energy / calculationResults.total) * 100} 
                      className="w-20" 
                    />
                    <span className="text-sm">{calculationResults.energy} kg CO₂e</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 排放结构分析 */}
            <div>
              <h4 className="font-medium mb-3">排放结构分析</h4>
              <div className="space-y-2 text-sm">
                <p>• 材料排放占比最高，达到 {((calculationResults.materials / calculationResults.total) * 100).toFixed(1)}%</p>
                <p>• 机械使用排放占比 {((calculationResults.machinery / calculationResults.total) * 100).toFixed(1)}%</p>
                <p>• 能源消耗排放占比 {((calculationResults.energy / calculationResults.total) * 100).toFixed(1)}%</p>
                <p>• 人工相关排放占比 {((calculationResults.labor / calculationResults.total) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 减排建议 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">减排建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">材料优化</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 选择低碳水泥和混凝土</li>
                <li>• 提高钢材回收利用率</li>
                <li>• 使用再生骨料替代天然骨料</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">施工优化</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 优化施工工艺，提高效率</li>
                <li>• 使用新能源施工设备</li>
                <li>• 合理安排施工计划，减少怠速</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">能源管理</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 使用清洁能源供电</li>
                <li>• 提高设备能效水平</li>
                <li>• 实施能源监测管理</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">运输优化</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 就近采购材料，减少运输距离</li>
                <li>• 优化运输路线和装载率</li>
                <li>• 推广新能源运输车辆</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onPrevious("calculation")}>
            返回修改
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              下载报告
            </Button>
            <Button onClick={onComplete}>
              完成实验
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 