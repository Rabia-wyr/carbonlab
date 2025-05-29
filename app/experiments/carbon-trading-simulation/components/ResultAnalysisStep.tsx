import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, BarChart3, TrendingUp, DollarSign } from "lucide-react"
import { SimulationData } from "./index"

interface ResultAnalysisStepProps {
  simulationData: SimulationData
  onPrevious: () => void
  onComplete: () => void
}

export function ResultAnalysisStep({ simulationData, onPrevious, onComplete }: ResultAnalysisStepProps) {
  const { companyState, annualPlans } = simulationData

  return (
    <div className="space-y-6">
      {/* 最终经营结果 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            5年经营结果总览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">最终资金</div>
              <div className={`text-2xl font-bold ${companyState.funds >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {companyState.funds}M
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">完成年份</div>
              <div className="text-2xl font-bold text-green-600">{companyState.currentYear}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-500">产线升级</div>
              <div className="text-2xl font-bold text-purple-600">
                {companyState.productionUpgrades.energy + companyState.productionUpgrades.emission}级
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-500">经营状态</div>
              <div className={`text-lg font-bold ${companyState.gameOver ? 'text-red-600' : 'text-green-600'}`}>
                {companyState.gameOver ? companyState.gameOverReason || "资金不足" : "成功完成"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 碳管理绩效 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            碳管理绩效分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">产线升级投资</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">能耗降低级别：</span>
                  <span className="font-medium">{companyState.productionUpgrades.energy} 级</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">碳排降低级别：</span>
                  <span className="font-medium">{companyState.productionUpgrades.emission} 级</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">当前单位能耗：</span>
                  <span className="font-medium">{companyState.currentEnergyPerUnit} 单位</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">当前单位碳排：</span>
                  <span className="font-medium">{companyState.currentEmissionPerUnit} 单位</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">总升级投资：</span>
                  <span className="font-medium">
                    {(companyState.productionUpgrades.energy + companyState.productionUpgrades.emission) * 10}M
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">碳配额使用情况</h4>
              <div className="space-y-2">
                {companyState.carbonAllowances.map((allowance, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">第{allowance.year}年：</span>
                    <div className="text-right">
                      <div className="text-sm">
                        配额 {allowance.allowance} / 使用 {allowance.used}
                      </div>
                      {allowance.traded !== 0 && (
                        <div className={`text-xs ${allowance.traded > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {allowance.traded > 0 ? `购买 ${allowance.traded}` : `出售 ${Math.abs(allowance.traded)}`}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">升级历史记录</h4>
              {companyState.upgradeHistory.length > 0 ? (
                <div className="space-y-2">
                  {companyState.upgradeHistory.map((upgrade, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <span className="font-medium">第{upgrade.year}年Q{upgrade.quarter}</span>
                        <span className="ml-2 text-sm text-gray-600">
                          {upgrade.upgradeType === 'energy' ? '能耗' : '碳排'}升级
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          {upgrade.fromLevel} → {upgrade.toLevel} 级
                        </div>
                        <div className="text-xs text-gray-500">
                          成本: {upgrade.cost}M
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">未进行任何技术升级</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 财务分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            财务绩效分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">季度经营记录</h4>
            {companyState.quarterlyRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">年份</th>
                      <th className="text-left p-2">季度</th>
                      <th className="text-left p-2">活动</th>
                      <th className="text-left p-2">生产量</th>
                      <th className="text-left p-2">收入</th>
                      <th className="text-left p-2">成本</th>
                      <th className="text-left p-2">碳排放</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyState.quarterlyRecords.slice(-8).map((record, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{record.year}</td>
                        <td className="p-2">Q{record.quarter}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            record.activity === 'production' ? 'bg-green-100 text-green-700' :
                            record.activity === 'upgrade' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {record.activity === 'production' ? '生产' :
                             record.activity === 'upgrade' ? '升级' : '空闲'}
                          </span>
                        </td>
                        <td className="p-2">{record.productsProduced}</td>
                        <td className="p-2">{record.revenue}M</td>
                        <td className="p-2">{record.costs}M</td>
                        <td className="p-2">{record.carbonEmitted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">暂无经营记录数据</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 经营策略评估 */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-green-700">📊 经营策略评估</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">成功要素分析</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>合理的产线升级投资时机选择</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>平衡短期收益与长期减排目标</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>有效的库存和订单管理策略</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>碳配额交易的合理运用</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">改进建议</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span>提前规划产线升级，降低后期碳交易成本</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span>优化订单选择，提高资金周转效率</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span>建立风险预警机制，避免资金链断裂</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span>制定多情景应对策略，增强适应性</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-green-500">
            <h4 className="font-medium text-gray-800 mb-2">💡 学习收获</h4>
            <p className="text-sm text-gray-600">
              通过本次模拟，您体验了企业在碳约束下的经营决策过程，理解了碳管理与财务绩效的平衡关系，
              掌握了产线升级、订单管理、碳交易等关键策略的运用方法。这些经验对于实际企业的可持续发展具有重要指导意义。
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回模拟
        </Button>
        <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="mr-2 h-4 w-4" />
          生成ESG报告
        </Button>
      </div>
    </div>
  )
} 