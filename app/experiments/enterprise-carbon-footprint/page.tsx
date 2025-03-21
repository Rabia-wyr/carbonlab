"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Pie, 
  Cell,
  Line
} from "recharts"

// 类型定义
type SourceItem = {
  label: string;
  defaultValue: number;
  unit: string;
  factor: number;
}

type SourceCategory = {
  [key: string]: SourceItem;
}

type CarbonSources = {
  [key: string]: SourceCategory;
}

type ReductionTip = {
  tip: string;
  potential: string;
}

type ReductionTips = {
  [key: string]: ReductionTip[];
}

type IndustryData = {
  industry: string;
  value: number;
}

type CategoryFootprint = {
  name: string;
  value: number;
}

// 企业碳足迹来源及其默认值和单位
const carbonSources: CarbonSources = {
  energy: {
    electricity: { label: "电力消耗", defaultValue: 0, unit: "万度/月", factor: 400 },
    fuel: { label: "燃料使用", defaultValue: 0, unit: "吨/月", factor: 3000 },
    heating: { label: "供暖消耗", defaultValue: 0, unit: "万立方米/月", factor: 2000 }
  },
  production: {
    rawMaterials: { label: "原材料加工", defaultValue: 0, unit: "吨/月", factor: 500 },
    waste: { label: "废弃物处理", defaultValue: 0, unit: "吨/月", factor: 300 },
    water: { label: "工业用水", defaultValue: 0, unit: "万吨/月", factor: 150 }
  },
  logistics: {
    transportation: { label: "产品运输", defaultValue: 0, unit: "万公里/月", factor: 120 },
    businessTravel: { label: "商务差旅", defaultValue: 0, unit: "万公里/月", factor: 100 },
    warehousing: { label: "仓储能耗", defaultValue: 0, unit: "万平米/月", factor: 80 }
  },
  operations: {
    officeEquipment: { label: "办公设备", defaultValue: 0, unit: "百台/年", factor: 5000 },
    employeeCommute: { label: "员工通勤", defaultValue: 0, unit: "万公里/月", factor: 70 },
    paperConsumption: { label: "纸张消耗", defaultValue: 0, unit: "吨/年", factor: 2000 }
  }
}

// 减排建议数据
const reductionTips: ReductionTips = {
  energy: [
    { tip: "采用可再生能源，如太阳能、风能等", potential: "可减少30-60%能源碳排放" },
    { tip: "优化能源使用效率，升级节能设备", potential: "可减少15-30%能源碳排放" },
    { tip: "实施智能化能源管理系统，优化运行参数", potential: "可减少10-20%能源碳排放" },
  ],
  production: [
    { tip: "采用循环经济模式，提高资源利用效率", potential: "可减少20-40%生产碳排放" },
    { tip: "选择低碳原材料和清洁生产工艺", potential: "可减少15-35%生产碳排放" },
    { tip: "优化废弃物管理，实施资源回收再利用", potential: "可减少10-25%生产碳排放" },
  ],
  logistics: [
    { tip: "优化物流路线，提高车辆装载率", potential: "可减少10-30%物流碳排放" },
    { tip: "使用电动或混合动力车辆替代传统燃油车", potential: "可减少20-50%物流碳排放" },
    { tip: "减少不必要的商务差旅，提倡视频会议", potential: "可减少5-15%差旅碳排放" }
  ],
  operations: [
    { tip: "实施无纸化办公，减少纸张使用", potential: "可减少5-10%办公碳排放" },
    { tip: "鼓励员工使用公共交通、拼车或远程办公", potential: "可减少10-20%通勤碳排放" },
    { tip: "延长办公设备使用寿命，选择能效高的产品", potential: "可减少5-15%设备碳排放" }
  ]
}

// 行业人均碳排放数据（示例数据）
const industryData: IndustryData[] = [
  { industry: "制造业", value: 8.5 },
  { industry: "能源行业", value: 15.2 },
  { industry: "交通物流", value: 6.8 },
  { industry: "建筑业", value: 7.3 },
  { industry: "服务业", value: 3.1 },
  { industry: "IT行业", value: 2.8 },
  { industry: "农业", value: 5.2 },
  { industry: "平均水平", value: 6.4 }
]

// 饼图色彩
const COLORS = ['var(--primary-custom)', 'var(--secondary-custom)', 'var(--accent-custom)', 'var(--chart-5)'];

export default function EnterpriseCarbonFootprintPage() {
  // 状态管理
  const [activeCategory, setActiveCategory] = useState<string>("energy")
  const [values, setValues] = useState<{ [key: string]: { [key: string]: number } }>({
    energy: {
      electricity: 0,
      fuel: 0,
      heating: 0
    },
    production: {
      rawMaterials: 0,
      waste: 0,
      water: 0
    },
    logistics: {
      transportation: 0,
      businessTravel: 0,
      warehousing: 0
    },
    operations: {
      officeEquipment: 0,
      employeeCommute: 0,
      paperConsumption: 0
    }
  })
  const [totalFootprint, setTotalFootprint] = useState<number>(0)
  const [categoryFootprints, setCategoryFootprints] = useState<CategoryFootprint[]>([])
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false)
  const [factors, setFactors] = useState<CarbonSources>({...carbonSources})
  const [isCalculated, setIsCalculated] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("calculator")
  const [employeeCount, setEmployeeCount] = useState<number>(100)

  // 处理输入变化
  const handleInputChange = (category: string, item: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value
      }
    }))
  }

  // 处理员工数量变化
  const handleEmployeeCountChange = (value: number) => {
    setEmployeeCount(value)
  }

  // 处理因子变化（高级设置）
  const handleFactorChange = (category: string, item: string, value: number) => {
    setFactors(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: { 
          ...prev[category][item],
          factor: value 
        }
      }
    }))
  }

  // 计算碳足迹
  const calculateFootprint = () => {
    let total = 0
    const categoryTotals: CategoryFootprint[] = []
    
    // 遍历各类别
    Object.keys(values).forEach(category => {
      let categoryTotal = 0
      
      // 遍历类别内项目
      Object.keys(values[category]).forEach(item => {
        const value = values[category][item]
        const factor = factors[category][item].factor
        
        // 根据项目的使用量和排放因子计算碳排放
        let itemFootprint = 0
        
        // 根据不同类别的时间周期调整计算
        if (category === "operations") {
          if (item === "officeEquipment" || item === "paperConsumption") {
            // 办公设备和纸张使用是按年计算的
            itemFootprint = value * factor / 12
          } else {
            // 员工通勤是按月计算的
            itemFootprint = value * factor
          }
        } else {
          // 其他类别都是按月计算的
          itemFootprint = value * factor
        }
        
        categoryTotal += itemFootprint
      })
      
      // 添加类别合计
      categoryTotals.push({
        name: getCategoryName(category),
        value: Math.round(categoryTotal)
      })
      
      total += categoryTotal
    })
    
    setTotalFootprint(Math.round(total))
    setCategoryFootprints(categoryTotals)
    setIsCalculated(true)
  }

  // 重置所有输入值
  const resetInputs = () => {
    const initialValues: { [key: string]: { [key: string]: number } } = {}
    
    Object.keys(carbonSources).forEach(category => {
      initialValues[category] = {}
      Object.keys(carbonSources[category]).forEach(item => {
        initialValues[category][item] = 0
      })
    })
    
    setValues(initialValues)
    setEmployeeCount(100)
    setIsCalculated(false)
  }

  // 获取类别的中文名称
  const getCategoryName = (category: string): string => {
    switch(category) {
      case "energy": return "能源使用"
      case "production": return "生产过程"
      case "logistics": return "运输物流"
      case "operations": return "办公运营"
      default: return category
    }
  }

  // 计算人均碳足迹（吨/年）
  const getPerCapitaFootprint = (): number => {
    return parseFloat(((totalFootprint / employeeCount) * 12 / 1000).toFixed(2))
  }

  // 获取碳足迹评价等级
  const getFootprintLevel = () => {
    const perCapita = getPerCapitaFootprint()
    if (perCapita <= 3) return { level: "低碳企业", color: "text-[var(--secondary-custom)]", description: "贵公司的碳排放水平处于行业领先水平，继续保持！" }
    if (perCapita <= 6) return { level: "中等碳排", color: "text-[var(--accent-custom)]", description: "贵公司的碳排放处于行业平均水平，仍有改进空间。" }
    return { level: "高碳排放", color: "text-[var(--destructive)]", description: "贵公司的碳排放高于行业平均水平，建议采取减排措施。" }
  }

  // 计算行业平均水平的百分比
  const getPercentOfIndustryAverage = (): number => {
    const perCapita = getPerCapitaFootprint()
    const industryAverage = 6.4 // 行业平均值
    return Math.round((perCapita / industryAverage) * 100)
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧控制面板 */}
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="calculator">计算器</TabsTrigger>
              <TabsTrigger value="tips">减排建议</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>企业碳足迹计算器</CardTitle>
                  <CardDescription>
                    输入贵公司的生产经营数据，计算企业的月度碳足迹
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* 企业基本信息 */}
                    <div className="space-y-4 pb-4 border-b border-gray-200">
                      <h4 className="text-sm font-medium">企业基本信息</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="employeeCount" className="text-sm">
                            员工数量
                          </Label>
                          <span className="text-xs text-gray-500">
                            {`${employeeCount} 人`}
                          </span>
                        </div>
                        <Slider
                          id="employeeCount"
                          min={10}
                          max={5000}
                          step={10}
                          value={[employeeCount]}
                          onValueChange={(value) => handleEmployeeCountChange(value[0])}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* 分类标签 */}
                    <div className="flex space-x-1 bg-gray-50 rounded-lg p-1">
                      {Object.keys(carbonSources).map((category) => (
                        <button
                          key={category}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors
                            ${activeCategory === category 
                              ? "bg-white shadow-sm" 
                              : "text-gray-600 hover:text-gray-900"}`}
                          onClick={() => setActiveCategory(category)}
                        >
                          {getCategoryName(category)}
                        </button>
                      ))}
                    </div>

                    {/* 输入表单 */}
                    <div className="space-y-4">
                      {Object.keys(factors[activeCategory]).map((item) => (
                        <div key={item} className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={item} className="text-sm">
                              {factors[activeCategory][item].label}
                            </Label>
                            <span className="text-xs text-gray-500">
                              {`${values[activeCategory][item]} ${factors[activeCategory][item].unit}`}
                            </span>
                          </div>
                          <Slider
                            id={item}
                            min={0}
                            max={
                              activeCategory === "energy" ? 50 :
                              activeCategory === "production" ? 100 :
                              activeCategory === "logistics" ? 30 :
                              20
                            }
                            step={1}
                            value={[values[activeCategory][item]]}
                            onValueChange={(value) => handleInputChange(activeCategory, item, value[0])}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>

                    {/* 高级设置切换 */}
                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                      <Checkbox 
                        id="advanced" 
                        checked={showAdvancedSettings}
                        onCheckedChange={(checked) => 
                          setShowAdvancedSettings(checked === true)
                        }
                      />
                      <label
                        htmlFor="advanced"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        显示高级设置
                      </label>
                    </div>

                    {/* 高级设置 - 排放因子调整 */}
                    {showAdvancedSettings && (
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium">排放因子调整 (kgCO₂e)</h4>
                        {Object.keys(factors[activeCategory]).map((item) => (
                          <div key={`factor-${item}`} className="grid grid-cols-2 gap-2 items-center">
                            <Label htmlFor={`factor-${item}`} className="text-sm">
                              {factors[activeCategory][item].label}
                            </Label>
                            <Input
                              id={`factor-${item}`}
                              type="number"
                              min="0"
                              step="10"
                              value={factors[activeCategory][item].factor}
                              onChange={(e) => handleFactorChange(
                                activeCategory,
                                item,
                                parseFloat(e.target.value) || 0
                              )}
                              className="h-8"
                            />
                          </div>
                        ))}
                        <p className="text-xs text-gray-500">
                          注：排放因子表示每单位活动或消费的碳排放量
                        </p>
                      </div>
                    )}

                    {/* 按钮组 */}
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={resetInputs}
                      >
                        重置
                      </Button>
                      <Button 
                        className="flex-1 bg-[var(--primary-custom)] hover:bg-[var(--primary-light)]" 
                        onClick={calculateFootprint}
                      >
                        计算碳足迹
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>企业减排建议</CardTitle>
                  <CardDescription>
                    根据贵公司的生产经营特点，以下是一些减少碳足迹的建议
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="energy" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="energy">能源</TabsTrigger>
                      <TabsTrigger value="production">生产</TabsTrigger>
                      <TabsTrigger value="logistics">物流</TabsTrigger>
                      <TabsTrigger value="operations">运营</TabsTrigger>
                    </TabsList>
                    
                    {Object.keys(reductionTips).map((category) => (
                      <TabsContent key={category} value={category} className="space-y-4">
                        {reductionTips[category].map((item, index) => (
                          <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex items-start mb-1">
                              <div className="bg-[var(--secondary-custom)]/10 text-[var(--secondary-custom)] p-1 rounded-full mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium">{item.tip}</span>
                            </div>
                            <p className="text-xs text-gray-500 ml-7">{item.potential}</p>
                          </div>
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 右侧结果与可视化 */}
        <div className="lg:col-span-2 space-y-6">
          {isCalculated ? (
            <>
              {/* 结果卡片 */}
              <Card>
                <CardHeader>
                  <CardTitle>企业碳足迹分析</CardTitle>
                  <CardDescription>
                    基于贵公司提供的信息，以下是月度碳足迹计算结果
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 总碳足迹 */}
                  <div className="text-center p-6 bg-[var(--light)] border border-gray-100 rounded-lg">
                    <div className="text-5xl font-bold mb-2">{totalFootprint}</div>
                    <div className="text-lg text-gray-500">千克二氧化碳当量/月</div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">每位员工年均碳排放</span>
                        <span className="text-sm font-medium">{getPerCapitaFootprint()} 吨CO₂e/年</span>
                      </div>
                      <Progress 
                        value={getPercentOfIndustryAverage()} 
                        className="h-2 bg-gray-200 [&>div]:bg-[var(--primary-custom)]" 
                      />
                      <div className="text-xs text-gray-500 mt-1">相当于行业平均水平的 {getPercentOfIndustryAverage()}%</div>
                    </div>
                    
                    <div className="mt-4">
                      <div className={`text-lg font-semibold ${
                        getPerCapitaFootprint() <= 3 ? "text-[var(--secondary-custom)]" : 
                        getPerCapitaFootprint() <= 6 ? "text-[var(--accent-custom)]" : 
                        "text-[var(--destructive)]"
                      }`}>
                        {getFootprintLevel().level}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {getFootprintLevel().description}
                      </p>
                    </div>
                  </div>

                  {/* 类别分析 */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-base font-medium mb-4">碳足迹构成</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={categoryFootprints}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {categoryFootprints.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} 千克CO₂e`, ""]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-4">类别排放量</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                          data={categoryFootprints}
                          layout="vertical"
                          margin={{ top: 5, right: 5, left: 40, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" />
                          <Tooltip formatter={(value) => [`${value} 千克CO₂e`, ""]} />
                          <Bar dataKey="value" fill="var(--primary-custom)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 行业对比数据 */}
              <Card>
                <CardHeader>
                  <CardTitle>行业碳足迹对比</CardTitle>
                  <CardDescription>
                    与其他行业的人均碳排放量对比
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        ...industryData,
                        { industry: "贵公司", value: getPerCapitaFootprint() }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis dataKey="industry" />
                      <YAxis label={{ value: '吨CO₂e/年/人', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} 吨CO₂e/年/人`, ""]} />
                      <Bar dataKey="value" fill="var(--primary-custom)">
                        {[...industryData, { industry: "贵公司", value: 0 }].map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.industry === "贵公司" ? "var(--accent-custom)" : "var(--primary-custom)"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>企业碳足迹计算器</CardTitle>
                <CardDescription>
                  了解并量化贵公司在生产经营中的碳排放
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-8 text-center bg-[var(--light)] border border-gray-100 rounded-lg">
                  <div className="text-5xl font-light text-gray-400 mb-4">?</div>
                  <h3 className="text-xl font-medium mb-2">计算企业碳足迹</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    在左侧表单中输入贵公司的生产经营数据，点击"计算碳足迹"按钮即可查看企业碳排放情况。
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-xl font-medium mb-4">什么是企业碳足迹？</h3>
                  <p className="text-gray-600 mb-4">
                    企业碳足迹是指企业在生产经营过程中直接或间接产生的温室气体排放总量，通常以二氧化碳当量（CO₂e）计量。
                  </p>
                  <p className="text-gray-600 mb-4">
                    企业碳足迹主要来源于能源使用、生产过程、运输物流和办公运营等方面。通过量化和分析企业碳足迹，可以识别主要排放源，制定有针对性的减排策略。
                  </p>
                  <p className="text-gray-600">
                    随着全球气候变化问题日益严峻，低碳经济成为大势所趋。减少碳排放不仅有利于环境保护，也能提升企业竞争力和社会形象。
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-xl font-medium mb-4">碳足迹管理的好处</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">1</span>
                      <span>降低运营成本，提高能源和资源利用效率</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">2</span>
                      <span>满足监管要求，降低政策和市场风险</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">3</span>
                      <span>提升品牌形象，满足消费者对环保的期望</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">4</span>
                      <span>吸引投资者，提高企业在资本市场的估值</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
