"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Play, Pause, FastForward, TrendingUp, Factory, DollarSign, Zap, Calendar, AlertTriangle } from "lucide-react"
import { SimulationData, QuarterlyActivity, UpgradeType, AnnualPlan, Order, QuarterlyUpgrade, QuarterlyProduction } from "./index"
import { calculateQuarterlyCapacity, validateAnnualPlan, calculateUpgradedValue } from "./utils"

interface SimulationRunStepProps {
  simulationData: SimulationData
  onDataUpdate: (data: Partial<SimulationData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function SimulationRunStep({ simulationData, onDataUpdate, onNext, onPrevious }: SimulationRunStepProps) {
  const { companyState, marketData } = simulationData
  const [isRunning, setIsRunning] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<AnnualPlan | null>(null)
  const [planningYear, setPlanningYear] = useState(1)

  // 初始化当前年度规划
  useEffect(() => {
    if (!currentPlan && companyState.currentYear <= 5) {
      initializeAnnualPlan(companyState.currentYear)
    }
  }, [companyState.currentYear])

  // 初始化年度规划
  const initializeAnnualPlan = (year: number) => {
    const newPlan: AnnualPlan = {
      year,
      plannedUpgrades: [],
      selectedSaleOrders: [],
      selectedPurchaseOrders: [],
      totalUpgradeCost: 0,
      totalOrderValue: 0,
      quarterlyActivities: {
        1: "production",
        2: "production", 
        3: "production",
        4: "production"
      }
    }
    setCurrentPlan(newPlan)
    setPlanningYear(year)
    
    // 自动补充原材料到40单位（确保一年生产需求）
    const currentMaterials = companyState.rawMaterialInventory
    const neededMaterials = Math.max(0, 40 - currentMaterials)
    if (neededMaterials > 0 && companyState.funds >= neededMaterials * 35) {
      const updatedState = {
        ...companyState,
        rawMaterialInventory: companyState.rawMaterialInventory + neededMaterials,
        funds: companyState.funds - neededMaterials * 35
      }
      onDataUpdate({ companyState: updatedState })
    }
  }

  // 更新季度活动
  const updateQuarterlyActivity = (quarter: number, activity: QuarterlyActivity) => {
    if (!currentPlan) return
    
    const updatedPlan = {
      ...currentPlan,
      quarterlyActivities: {
        ...currentPlan.quarterlyActivities,
        [quarter]: activity
      }
    }
    
    // 如果改为非升级活动，移除对应的升级计划
    if (activity !== "upgrade") {
      updatedPlan.plannedUpgrades = updatedPlan.plannedUpgrades.filter(
        upgrade => upgrade.quarter !== quarter
      )
    }
    
    setCurrentPlan(updatedPlan)
  }

  // 添加升级计划
  const addUpgrade = (quarter: number, upgradeType: UpgradeType) => {
    if (!currentPlan) return
    
    const currentLevel = upgradeType === "energy" 
      ? companyState.productionUpgrades.energy 
      : companyState.productionUpgrades.emission
    
    if (currentLevel >= 5) return // 已达最高级别
    
    const upgrade: QuarterlyUpgrade = {
      quarter,
      year: currentPlan.year,
      upgradeType,
      fromLevel: currentLevel,
      toLevel: currentLevel + 1,
      cost: 10
    }
    
    const updatedPlan = {
      ...currentPlan,
      plannedUpgrades: [...currentPlan.plannedUpgrades.filter(u => u.quarter !== quarter), upgrade],
      quarterlyActivities: {
        ...currentPlan.quarterlyActivities,
        [quarter]: "upgrade" as QuarterlyActivity
      },
      totalUpgradeCost: currentPlan.totalUpgradeCost + 10
    }
    
    setCurrentPlan(updatedPlan)
  }

  // 确认年度规划
  const confirmAnnualPlan = () => {
    if (!currentPlan) return
    
    const validation = validateAnnualPlan(currentPlan)
    if (!validation.isValid) {
      alert(`规划验证失败：\n${validation.errors.join('\n')}`)
      return
    }
    
    // 更新模拟数据
    const updatedData = {
      ...simulationData,
      annualPlans: [...simulationData.annualPlans, currentPlan],
      currentPlan
    }
    onDataUpdate(updatedData)
    
    // 开始执行年度计划
    executeAnnualPlan(currentPlan)
  }

  // 执行年度计划
  const executeAnnualPlan = async (plan: AnnualPlan) => {
    setIsRunning(true)
    
    let currentState = { ...companyState }
    
    for (let quarter = 1; quarter <= 4; quarter++) {
      currentState = await executeQuarter(plan, quarter, currentState)
      await new Promise(resolve => setTimeout(resolve, 500)) // 模拟延迟
    }
    
    // 年底结算
    currentState = await executeYearEndSettlement(plan.year, currentState)
    
    // 检查游戏是否结束
    if (currentState.currentYear >= 5 || currentState.gameOver) {
      setIsRunning(false)
      return
    }
    
    // 准备下一年
    const nextYear = currentState.currentYear + 1
    initializeAnnualPlan(nextYear)
    setIsRunning(false)
  }

  // 执行季度
  const executeQuarter = async (plan: AnnualPlan, quarter: number, currentState: any): Promise<any> => {
    const activity = plan.quarterlyActivities[quarter]
    const upgrade = plan.plannedUpgrades.find(u => u.quarter === quarter)
    
    let production: QuarterlyProduction = {
      quarter,
      year: plan.year,
      activity,
      rawMaterialsUsed: 0,
      productsProduced: 0,
      energyConsumed: 0,
      carbonEmitted: 0,
      revenue: 0,
      costs: 0
    }
    
    let updatedState = { ...currentState }
    
    if (activity === "production") {
      // 执行生产
      const capacity = calculateQuarterlyCapacity(activity, currentState.baseProductionCapacity)
      const actualProduction = Math.min(capacity, currentState.rawMaterialInventory)
      
      production.rawMaterialsUsed = actualProduction
      production.productsProduced = actualProduction
      production.energyConsumed = actualProduction * currentState.currentEnergyPerUnit
      production.carbonEmitted = actualProduction * currentState.currentEmissionPerUnit
      production.costs = production.energyConsumed * 1 // 能源成本1M/单位
      
      // 更新库存
      updatedState = {
        ...currentState,
        rawMaterialInventory: currentState.rawMaterialInventory - actualProduction,
        productInventory: currentState.productInventory + actualProduction,
        funds: currentState.funds - production.costs,
        quarterlyRecords: [...currentState.quarterlyRecords, production],
        currentQuarter: quarter
      }
      
    } else if (activity === "upgrade" && upgrade) {
      // 执行升级
      production.costs = upgrade.cost
      production.upgradeExecuted = upgrade
      
      const updatedUpgrades = { ...currentState.productionUpgrades }
      if (upgrade.upgradeType === "energy") {
        updatedUpgrades.energy = upgrade.toLevel
      } else {
        updatedUpgrades.emission = upgrade.toLevel
      }
      
      updatedState = {
        ...currentState,
        productionUpgrades: updatedUpgrades,
        currentEnergyPerUnit: calculateUpgradedValue(0, updatedUpgrades.energy, 10),
        currentEmissionPerUnit: calculateUpgradedValue(0, updatedUpgrades.emission, 10),
        funds: currentState.funds - upgrade.cost,
        upgradeHistory: [...currentState.upgradeHistory, upgrade],
        quarterlyRecords: [...currentState.quarterlyRecords, production],
        currentQuarter: quarter
      }
    } else {
      // 空闲季度
      updatedState = {
        ...currentState,
        quarterlyRecords: [...currentState.quarterlyRecords, production],
        currentQuarter: quarter
      }
    }
    
    // 更新状态
    onDataUpdate({ companyState: updatedState })
    return updatedState
  }

  // 年底结算
  const executeYearEndSettlement = async (year: number, currentState: any): Promise<any> => {
    const yearlyEmissions = currentState.quarterlyRecords
      .filter((record: QuarterlyProduction) => record.year === year)
      .reduce((total: number, record: QuarterlyProduction) => total + record.carbonEmitted, 0)
    
    const allowance = currentState.carbonAllowances.find((a: any) => a.year === year)
    if (!allowance) return currentState
    
    const excessEmissions = yearlyEmissions - allowance.allowance
    let tradingCost = 0
    let traded = 0
    
    if (excessEmissions > 0) {
      // 需要购买配额
      traded = excessEmissions
      tradingCost = excessEmissions * marketData.carbonPrice
    } else {
      // 可以出售配额
      traded = excessEmissions // 负数表示出售
      tradingCost = excessEmissions * marketData.carbonPrice // 负数表示收入
    }
    
    const updatedAllowances = currentState.carbonAllowances.map((a: any) => 
      a.year === year 
        ? { ...a, used: yearlyEmissions, traded, tradingCost }
        : a
    )
    
    const newFunds = currentState.funds - tradingCost
    
    // 检查资金是否足够
    if (newFunds < 0) {
      const updatedState = {
        ...currentState,
        funds: newFunds,
        carbonAllowances: updatedAllowances,
        gameOver: true,
        gameOverReason: "资金不足，无法支付碳配额费用"
      }
      onDataUpdate({ companyState: updatedState })
      return updatedState
    }
    
    // 更新到下一年
    const updatedState = {
      ...currentState,
      funds: newFunds,
      carbonAllowances: updatedAllowances,
      currentYear: year + 1,
      currentQuarter: 1
    }
    
    onDataUpdate({ companyState: updatedState })
    return updatedState
  }

  // 快进到下一年
  const fastForwardToNextYear = () => {
    if (currentPlan) {
      confirmAnnualPlan()
    }
  }

  // 演示模式 - 快速完成5年模拟
  const runDemoSimulation = async () => {
    setIsRunning(true)
    
    let currentState = { ...companyState }
    
    // 模拟5年经营
    for (let year = currentState.currentYear; year <= 5; year++) {
      // 创建演示年度规划
      const demoPlan: AnnualPlan = {
        year,
        plannedUpgrades: year <= 3 ? [{
          quarter: 1,
          year,
          upgradeType: year % 2 === 1 ? "emission" : "energy",
          fromLevel: year % 2 === 1 ? currentState.productionUpgrades.emission : currentState.productionUpgrades.energy,
          toLevel: (year % 2 === 1 ? currentState.productionUpgrades.emission : currentState.productionUpgrades.energy) + 1,
          cost: 10
        }] : [],
        selectedSaleOrders: [],
        selectedPurchaseOrders: [],
        totalUpgradeCost: year <= 3 ? 10 : 0,
        totalOrderValue: 0,
        quarterlyActivities: {
          1: year <= 3 ? "upgrade" : "production",
          2: "production",
          3: "production",
          4: "production"
        }
      }
      
      // 补充原材料
      const neededMaterials = Math.max(0, 40 - currentState.rawMaterialInventory)
      if (neededMaterials > 0 && currentState.funds >= neededMaterials * 35) {
        currentState = {
          ...currentState,
          rawMaterialInventory: currentState.rawMaterialInventory + neededMaterials,
          funds: currentState.funds - neededMaterials * 35
        }
      }
      
      // 执行年度计划
      for (let quarter = 1; quarter <= 4; quarter++) {
        currentState = await executeQuarter(demoPlan, quarter, currentState)
        await new Promise(resolve => setTimeout(resolve, 200)) // 快速演示
      }
      
      // 年底结算
      currentState = await executeYearEndSettlement(year, currentState)
      
      if (currentState.gameOver) break
    }
    
    setIsRunning(false)
  }

  return (
    <div className="space-y-6">
      {/* 当前状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5 text-blue-600" />
            企业经营状态 - 第{companyState.currentYear}年 Q{companyState.currentQuarter}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">资金余额</div>
              <div className={`text-xl font-bold ${companyState.funds >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {companyState.funds}M
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">原材料</div>
              <div className="text-xl font-bold text-green-600">{companyState.rawMaterialInventory}</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-500">产成品</div>
              <div className="text-xl font-bold text-purple-600">{companyState.productInventory}</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-500">单位能耗</div>
              <div className="text-xl font-bold text-orange-600">{companyState.currentEnergyPerUnit}</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-500">单位碳排</div>
              <div className="text-xl font-bold text-red-600">{companyState.currentEmissionPerUnit}</div>
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>5年经营进度</span>
              <span>{companyState.currentYear}/5年</span>
            </div>
            <Progress value={(companyState.currentYear - 1) * 20 + (companyState.currentQuarter - 1) * 5} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 游戏结束检查 */}
      {companyState.gameOver && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              游戏结束
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{companyState.gameOverReason}</p>
            <Button onClick={onNext} className="mt-4">查看结果分析</Button>
          </CardContent>
        </Card>
      )}

      {/* 年度规划界面 */}
      {!companyState.gameOver && companyState.currentYear <= 5 && (
        <Tabs defaultValue="planning" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="planning">年度规划</TabsTrigger>
            <TabsTrigger value="monitoring">实时监控</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          {/* 年度规划标签页 */}
          <TabsContent value="planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  第{planningYear}年度经营规划
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 使用提示 */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">💡 操作指南</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 选择每季度的活动类型：生产、技术升级或空闲</li>
                    <li>• 技术升级季度无法生产，但可以降低后续的能耗和碳排放</li>
                    <li>• 建议在碳配额紧张时优先升级碳排放技术</li>
                    <li>• 资金充足时可以升级能耗技术降低运营成本</li>
                    <li>• 点击"演示模式"可以快速体验完整的5年模拟</li>
                  </ul>
                </div>

                {/* 季度活动安排 */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">季度活动安排</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(quarter => (
                      <div key={quarter} className="space-y-3">
                        <Label>第{quarter}季度</Label>
                        <Select
                          value={currentPlan?.quarterlyActivities[quarter] || "production"}
                          onValueChange={(value: QuarterlyActivity) => updateQuarterlyActivity(quarter, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production">生产</SelectItem>
                            <SelectItem value="upgrade">技术升级</SelectItem>
                            <SelectItem value="idle">空闲</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* 升级选项 */}
                        {currentPlan?.quarterlyActivities[quarter] === "upgrade" && (
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addUpgrade(quarter, "energy")}
                              disabled={companyState.productionUpgrades.energy >= 5}
                            >
                              能耗升级 (Lv.{companyState.productionUpgrades.energy})
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addUpgrade(quarter, "emission")}
                              disabled={companyState.productionUpgrades.emission >= 5}
                            >
                              碳排升级 (Lv.{companyState.productionUpgrades.emission})
                            </Button>
                          </div>
                        )}
                        
                        {/* 显示已安排的升级 */}
                        {currentPlan?.plannedUpgrades.find(u => u.quarter === quarter) && (
                          <Badge variant="secondary" className="text-xs">
                            {currentPlan.plannedUpgrades.find(u => u.quarter === quarter)?.upgradeType === "energy" ? "能耗" : "碳排"}升级
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 规划总结 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">规划总结</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">升级投资：</span>
                      <span className="font-medium">{currentPlan?.totalUpgradeCost || 0}M</span>
                    </div>
                    <div>
                      <span className="text-gray-600">生产季度：</span>
                      <span className="font-medium">
                        {Object.values(currentPlan?.quarterlyActivities || {}).filter(a => a === "production").length}个
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">升级季度：</span>
                      <span className="font-medium">
                        {Object.values(currentPlan?.quarterlyActivities || {}).filter(a => a === "upgrade").length}个
                      </span>
                    </div>
                  </div>
                </div>

                {/* 碳配额预警 */}
                {(() => {
                  const productionQuarters = Object.values(currentPlan?.quarterlyActivities || {}).filter(a => a === "production").length
                  const estimatedProduction = productionQuarters * companyState.baseProductionCapacity
                  const estimatedEmissions = estimatedProduction * companyState.currentEmissionPerUnit
                  const currentYearAllowance = marketData.yearlyAllowances[planningYear - 1] || 0
                  const excessEmissions = estimatedEmissions - currentYearAllowance
                  
                  if (excessEmissions > 0) {
                    return (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          碳配额预警
                        </h4>
                        <div className="text-sm text-red-700 space-y-1">
                          <p>预计年度碳排放：{estimatedEmissions} 单位</p>
                          <p>年度配额限制：{currentYearAllowance} 单位</p>
                          <p>超额排放：{excessEmissions} 单位</p>
                          <p>预计购买成本：{excessEmissions * marketData.carbonPrice}M</p>
                          <p className="font-medium">建议：增加技术升级或减少生产季度</p>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">配额状况良好</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <p>预计年度碳排放：{estimatedEmissions} 单位</p>
                          <p>年度配额限制：{currentYearAllowance} 单位</p>
                          <p>结余配额：{Math.abs(excessEmissions)} 单位</p>
                          <p>预计出售收入：{Math.abs(excessEmissions) * marketData.carbonPrice}M</p>
                        </div>
                      </div>
                    )
                  }
                })()}

                {/* 确认规划按钮 */}
                <div className="flex justify-center">
                  <Button 
                    onClick={confirmAnnualPlan}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isRunning ? "执行中..." : "确认并执行年度规划"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 实时监控标签页 */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  实时经营监控
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 碳配额使用情况 */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">碳配额使用情况</h4>
                    <div className="space-y-3">
                      {companyState.carbonAllowances.slice(0, companyState.currentYear).map((allowance, index) => {
                        const usagePercent = (allowance.used / allowance.allowance) * 100
                        return (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>第{allowance.year}年</span>
                              <span>{allowance.used}/{allowance.allowance}</span>
                            </div>
                            <Progress 
                              value={usagePercent} 
                              className={`h-2 ${usagePercent > 100 ? 'bg-red-100' : 'bg-green-100'}`}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 财务状况 */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">财务状况</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">当前资金：</span>
                        <span className={`font-medium ${companyState.funds >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {companyState.funds}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">库存价值：</span>
                        <span className="font-medium">
                          {(companyState.rawMaterialInventory * 35 + companyState.productInventory * 50)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">升级投资：</span>
                        <span className="font-medium">
                          {(companyState.productionUpgrades.energy + companyState.productionUpgrades.emission) * 10}M
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">总资产：</span>
                        <span className="font-medium text-blue-600">
                          {companyState.funds + (companyState.rawMaterialInventory * 35 + companyState.productInventory * 50)}M
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 生产效率分析 */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3">生产效率分析</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">技术升级状况</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">能耗技术：</span>
                          <div className="flex items-center gap-2">
                            <Progress value={(companyState.productionUpgrades.energy / 5) * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">Lv.{companyState.productionUpgrades.energy}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">碳排技术：</span>
                          <div className="flex items-center gap-2">
                            <Progress value={(companyState.productionUpgrades.emission / 5) * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">Lv.{companyState.productionUpgrades.emission}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">效率指标</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">单位生产成本：</span>
                          <span className="font-medium">{companyState.currentEnergyPerUnit}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">碳效率：</span>
                          <span className="font-medium">{(10 - companyState.currentEmissionPerUnit + 10) / 10 * 100}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">能效提升：</span>
                          <span className="font-medium">{(10 - companyState.currentEnergyPerUnit) / 10 * 100}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 风险预警 */}
                {(() => {
                  const warnings = []
                  if (companyState.funds < 50) warnings.push("资金不足，建议减少投资")
                  if (companyState.rawMaterialInventory < 20) warnings.push("原材料库存偏低")
                  if (companyState.currentYear > 1) {
                    const currentAllowance = companyState.carbonAllowances[companyState.currentYear - 1]
                    if (currentAllowance && currentAllowance.used > currentAllowance.allowance * 0.8) {
                      warnings.push("碳配额使用率过高")
                    }
                  }
                  
                  if (warnings.length > 0) {
                    return (
                      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          风险预警
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {warnings.map((warning, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="mt-1">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  return null
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 历史记录标签页 */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>季度经营记录</CardTitle>
              </CardHeader>
              <CardContent>
                {companyState.quarterlyRecords.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">年份</th>
                          <th className="text-left p-2">季度</th>
                          <th className="text-left p-2">活动</th>
                          <th className="text-left p-2">生产量</th>
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
                              <Badge variant={
                                record.activity === 'production' ? 'default' :
                                record.activity === 'upgrade' ? 'secondary' : 'outline'
                              }>
                                {record.activity === 'production' ? '生产' :
                                 record.activity === 'upgrade' ? '升级' : '空闲'}
                              </Badge>
                            </td>
                            <td className="p-2">{record.productsProduced}</td>
                            <td className="p-2">{record.costs}M</td>
                            <td className="p-2">{record.carbonEmitted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">暂无经营记录</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* 控制按钮 */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回设置
        </Button>
        
        <div className="flex gap-2">
          {!companyState.gameOver && companyState.currentYear <= 5 && (
            <>
              <Button 
                variant="outline" 
                onClick={fastForwardToNextYear}
                disabled={isRunning}
              >
                <FastForward className="mr-2 h-4 w-4" />
                快进执行
              </Button>
              <Button 
                variant="outline" 
                onClick={runDemoSimulation}
                disabled={isRunning}
                className="bg-purple-50 hover:bg-purple-100 border-purple-200"
              >
                <Play className="mr-2 h-4 w-4" />
                演示模式
              </Button>
            </>
          )}
          
          <Button 
            onClick={onNext} 
            className="bg-green-600 hover:bg-green-700"
            disabled={!companyState.gameOver && companyState.currentYear < 5}
          >
            查看结果分析
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 