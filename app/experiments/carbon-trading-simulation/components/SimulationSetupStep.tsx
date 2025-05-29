import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Settings, Info } from "lucide-react"
import { SimulationData } from "./index"

interface SimulationSetupStepProps {
  simulationData: SimulationData
  onDataUpdate: (data: Partial<SimulationData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function SimulationSetupStep({ simulationData, onDataUpdate, onNext, onPrevious }: SimulationSetupStepProps) {
  const { companyState, marketData } = simulationData

  return (
    <div className="space-y-6">
      {/* 企业状态确认 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            企业初始状态确认
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">财务与库存状态</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">初始资金：</span>
                  <span className="font-medium">{companyState.funds}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">原材料库存：</span>
                  <span className="font-medium">{companyState.rawMaterialInventory} 单位</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">产成品库存：</span>
                  <span className="font-medium">{companyState.productInventory} 单位</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">基础产能：</span>
                  <span className="font-medium">{companyState.baseProductionCapacity} 单位/季度</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">生产线参数</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">单位能耗：</span>
                  <span className="font-medium">{companyState.currentEnergyPerUnit} 单位</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">单位碳排：</span>
                  <span className="font-medium">{companyState.currentEmissionPerUnit} 单位</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">能耗升级级别：</span>
                  <span className="font-medium">{companyState.productionUpgrades.energy} 级</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">碳排升级级别：</span>
                  <span className="font-medium">{companyState.productionUpgrades.emission} 级</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 碳配额计划 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-green-600" />
            5年碳配额计划
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {marketData.yearlyAllowances.map((allowance, index) => (
              <div key={index} className="text-center">
                <div className={`p-4 rounded-lg ${
                  index === 0 ? 'bg-red-50 border-red-200' :
                  index === 1 ? 'bg-orange-50 border-orange-200' :
                  index === 2 ? 'bg-yellow-50 border-yellow-200' :
                  index === 3 ? 'bg-blue-50 border-blue-200' :
                  'bg-green-50 border-green-200'
                } border-2`}>
                  <div className="text-sm text-gray-500 mb-1">第{index + 1}年</div>
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-red-600' :
                    index === 1 ? 'text-orange-600' :
                    index === 2 ? 'text-yellow-600' :
                    index === 3 ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {allowance}
                  </div>
                  <div className="text-xs text-gray-500">单位配额</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>提示：</strong>碳配额逐年递减，企业需要通过产线升级降低碳排放，或在年底通过碳交易市场购买额外配额。
              碳配额价格固定为 {marketData.carbonPrice}M/单位。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 游戏规则提醒 */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-700">⚠️ 重要规则提醒</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>每年进行一次规划，包括产线升级和订单选择，年度内无法更改</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>产线升级：能耗/碳排每级降低1单位，成本10M，最多升级5级</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span><strong>季度约束：每季度只能安排一次技术升级，升级时无法生产</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>销售订单：平均50M/单位，2年内交付，有违约金风险</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>采购订单：平均35M/单位，1年内交付，保证按期到货</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>年底结算：超出碳配额需购买，结余可出售，资金不足游戏结束</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          上一步
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          开始5年经营模拟
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 