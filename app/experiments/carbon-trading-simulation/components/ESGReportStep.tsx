import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Leaf, Users, Shield, TrendingUp, Award, FileText, Download } from "lucide-react"
import { SimulationData } from "./index"

interface ESGReportStepProps {
  simulationData: SimulationData
  onPrevious: () => void
  onComplete: () => void
}

export function ESGReportStep({ simulationData, onPrevious, onComplete }: ESGReportStepProps) {
  const { companyState } = simulationData

  // 计算ESG评分
  const calculateESGScore = () => {
    // 环境评分 (E) - 基于碳减排和技术升级
    const totalUpgrades = companyState.productionUpgrades.energy + companyState.productionUpgrades.emission
    const carbonReduction = ((10 - companyState.currentEmissionPerUnit) / 5) * 100
    const energyEfficiency = ((10 - companyState.currentEnergyPerUnit) / 5) * 100
    const environmentScore = Math.min(100, (carbonReduction + energyEfficiency + totalUpgrades * 10) / 3)

    // 社会评分 (S) - 基于经营稳定性和可持续发展
    const operationalYears = Math.min(companyState.currentYear, 5)
    const financialStability = companyState.funds > 0 ? 100 : 50
    const sustainabilityScore = (operationalYears / 5) * 100
    const socialScore = (financialStability + sustainabilityScore) / 2

    // 治理评分 (G) - 基于规划执行和风险管理
    const planningEfficiency = companyState.quarterlyRecords.length > 0 ? 85 : 50
    const riskManagement = companyState.gameOver ? 60 : 90
    const governanceScore = (planningEfficiency + riskManagement) / 2

    const overallScore = (environmentScore + socialScore + governanceScore) / 3

    return {
      environment: Math.round(environmentScore),
      social: Math.round(socialScore),
      governance: Math.round(governanceScore),
      overall: Math.round(overallScore)
    }
  }

  const esgScore = calculateESGScore()

  // 获取ESG等级
  const getESGRating = (score: number) => {
    if (score >= 90) return { rating: "AAA", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 80) return { rating: "AA", color: "text-green-500", bg: "bg-green-50" }
    if (score >= 70) return { rating: "A", color: "text-blue-600", bg: "bg-blue-100" }
    if (score >= 60) return { rating: "BBB", color: "text-yellow-600", bg: "bg-yellow-100" }
    if (score >= 50) return { rating: "BB", color: "text-orange-600", bg: "bg-orange-100" }
    return { rating: "B", color: "text-red-600", bg: "bg-red-100" }
  }

  const overallRating = getESGRating(esgScore.overall)

  // 计算碳足迹数据
  const calculateCarbonFootprint = () => {
    const totalEmissions = companyState.quarterlyRecords.reduce((sum, record) => sum + record.carbonEmitted, 0)
    const totalProduction = companyState.quarterlyRecords.reduce((sum, record) => sum + record.productsProduced, 0)
    const carbonIntensity = totalProduction > 0 ? totalEmissions / totalProduction : 0
    
    return {
      totalEmissions,
      totalProduction,
      carbonIntensity: Math.round(carbonIntensity * 100) / 100,
      reductionRate: Math.round(((10 - companyState.currentEmissionPerUnit) / 10) * 100)
    }
  }

  const carbonData = calculateCarbonFootprint()

  // 生成改进建议
  const generateRecommendations = () => {
    const recommendations = []
    
    if (esgScore.environment < 70) {
      recommendations.push({
        category: "环境",
        priority: "高",
        suggestion: "加大清洁技术投资，进一步降低碳排放强度"
      })
    }
    
    if (esgScore.social < 70) {
      recommendations.push({
        category: "社会",
        priority: "中",
        suggestion: "提升经营稳定性，确保可持续发展能力"
      })
    }
    
    if (esgScore.governance < 70) {
      recommendations.push({
        category: "治理",
        priority: "中",
        suggestion: "完善风险管理体系，提高决策执行效率"
      })
    }
    
    if (companyState.funds < 100) {
      recommendations.push({
        category: "财务",
        priority: "高",
        suggestion: "优化资金配置，提高投资回报率"
      })
    }

    return recommendations
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-6">
      {/* ESG评分概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-600" />
            企业ESG绩效评估报告
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {/* 综合评分 */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${overallRating.bg} mb-3`}>
                <span className={`text-2xl font-bold ${overallRating.color}`}>
                  {overallRating.rating}
                </span>
              </div>
              <div className="text-sm text-gray-500">综合评级</div>
              <div className="text-lg font-bold">{esgScore.overall}分</div>
            </div>

            {/* 环境评分 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="font-medium">环境 (E)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>评分</span>
                  <span className="font-medium">{esgScore.environment}分</span>
                </div>
                <Progress value={esgScore.environment} className="h-2" />
              </div>
            </div>

            {/* 社会评分 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">社会 (S)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>评分</span>
                  <span className="font-medium">{esgScore.social}分</span>
                </div>
                <Progress value={esgScore.social} className="h-2" />
              </div>
            </div>

            {/* 治理评分 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="font-medium">治理 (G)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>评分</span>
                  <span className="font-medium">{esgScore.governance}分</span>
                </div>
                <Progress value={esgScore.governance} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 环境绩效详情 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              环境绩效指标
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-500">总碳排放</div>
                <div className="text-xl font-bold text-green-600">{carbonData.totalEmissions}</div>
                <div className="text-xs text-gray-500">单位</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-500">碳强度</div>
                <div className="text-xl font-bold text-blue-600">{carbonData.carbonIntensity}</div>
                <div className="text-xs text-gray-500">单位/产品</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>碳减排率</span>
                  <span>{carbonData.reductionRate}%</span>
                </div>
                <Progress value={carbonData.reductionRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>能效提升</span>
                  <span>{Math.round(((10 - companyState.currentEnergyPerUnit) / 10) * 100)}%</span>
                </div>
                <Progress value={((10 - companyState.currentEnergyPerUnit) / 10) * 100} className="h-2" />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">技术升级投资</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>能耗技术：</span>
                  <span>Lv.{companyState.productionUpgrades.energy}</span>
                </div>
                <div className="flex justify-between">
                  <span>碳排技术：</span>
                  <span>Lv.{companyState.productionUpgrades.emission}</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span>总投资：</span>
                  <span>{(companyState.productionUpgrades.energy + companyState.productionUpgrades.emission) * 10}M</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 社会与治理绩效 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              社会与治理绩效
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">经营稳定性</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>经营年限：</span>
                  <span>{Math.min(companyState.currentYear, 5)}/5年</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>财务状况：</span>
                  <span className={companyState.funds >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {companyState.funds >= 0 ? '健康' : '困难'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>游戏状态：</span>
                  <span className={!companyState.gameOver ? 'text-green-600' : 'text-red-600'}>
                    {!companyState.gameOver ? '正常运营' : '提前结束'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">治理水平</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>规划执行：</span>
                  <span>{companyState.quarterlyRecords.length}个季度</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>升级决策：</span>
                  <span>{companyState.upgradeHistory.length}次</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>风险管理：</span>
                  <span className={!companyState.gameOver ? 'text-green-600' : 'text-orange-600'}>
                    {!companyState.gameOver ? '良好' : '需改进'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">碳配额管理</h4>
              <div className="space-y-2">
                {companyState.carbonAllowances.slice(0, companyState.currentYear).map((allowance, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>第{allowance.year}年：</span>
                    <span className={allowance.used <= allowance.allowance ? 'text-green-600' : 'text-red-600'}>
                      {allowance.used}/{allowance.allowance}
                      {allowance.traded !== 0 && (
                        <span className="ml-1">
                          ({allowance.traded > 0 ? '+' : ''}{allowance.traded})
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 改进建议 */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              ESG改进建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Badge variant={rec.priority === "高" ? "destructive" : "secondary"}>
                    {rec.priority}
                  </Badge>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{rec.category}</div>
                    <div className="text-sm text-gray-600">{rec.suggestion}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 报告总结 */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-purple-700">📊 ESG报告总结</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">主要成就</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {esgScore.environment >= 70 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>环境绩效表现优秀，碳减排效果显著</span>
                  </li>
                )}
                {companyState.upgradeHistory.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>积极投资清洁技术，提升生产效率</span>
                  </li>
                )}
                {!companyState.gameOver && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>成功完成5年经营目标，展现可持续发展能力</span>
                  </li>
                )}
                {companyState.funds > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>保持良好的财务状况和经营稳定性</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">发展前景</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  基于当前ESG绩效表现，企业在可持续发展方面展现了{overallRating.rating}级水平。
                  通过持续的技术创新和管理优化，有望进一步提升ESG评级。
                </p>
                <p>
                  建议继续加强环境保护投入，完善社会责任体系，提升治理水平，
                  以实现更高质量的可持续发展目标。
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-purple-500">
            <h4 className="font-medium text-gray-800 mb-2">💡 ESG价值体现</h4>
            <p className="text-sm text-gray-600">
              本次模拟展示了ESG理念在企业经营中的重要作用。通过平衡环境保护、社会责任和公司治理，
              企业不仅能够应对碳约束挑战，还能够实现长期可持续发展，为所有利益相关者创造价值。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 控制按钮 */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回分析
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="bg-blue-50 hover:bg-blue-100">
            <Download className="mr-2 h-4 w-4" />
            下载报告
          </Button>
          
          <Button onClick={onComplete} className="bg-purple-600 hover:bg-purple-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            完成实验
          </Button>
        </div>
      </div>
    </div>
  )
} 