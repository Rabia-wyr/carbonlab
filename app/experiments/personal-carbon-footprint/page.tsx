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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

type CountryData = {
  country: string;
  value: number;
}

type HistoricalData = {
  month: string;
  footprint: number;
}

type CategoryFootprint = {
  name: string;
  value: number;
}

// 碳足迹来源及其默认值和单位
const carbonSources: CarbonSources = {
  transportation: {
    car: { label: "私家车", defaultValue: 0, unit: "公里/周", factor: 0.12 },
    bus: { label: "公交车", defaultValue: 0, unit: "公里/周", factor: 0.05 },
    subway: { label: "地铁", defaultValue: 0, unit: "公里/周", factor: 0.03 },
    plane: { label: "飞机", defaultValue: 0, unit: "小时/年", factor: 90 }
  },
  home: {
    electricity: { label: "电力消耗", defaultValue: 0, unit: "度/月", factor: 0.4 },
    gas: { label: "天然气", defaultValue: 0, unit: "立方米/月", factor: 2.0 },
    water: { label: "自来水", defaultValue: 0, unit: "吨/月", factor: 0.3 }
  },
  food: {
    meat: { label: "肉类消费", defaultValue: 0, unit: "千克/月", factor: 7.0 },
    dairy: { label: "乳制品", defaultValue: 0, unit: "千克/月", factor: 3.0 },
    vegetables: { label: "蔬菜水果", defaultValue: 0, unit: "千克/月", factor: 0.5 }
  },
  consumption: {
    clothes: { label: "服装消费", defaultValue: 0, unit: "件/年", factor: 10.0 },
    electronics: { label: "电子产品", defaultValue: 0, unit: "件/年", factor: 50.0 },
    others: { label: "其他消费品", defaultValue: 0, unit: "件/月", factor: 5.0 }
  }
}

// 减排建议数据
const reductionTips: ReductionTips = {
  transportation: [
    { tip: "选择步行、骑行或公共交通替代私家车出行", potential: "每周减少5-20kg碳排放" },
    { tip: "与同事拼车通勤", potential: "每周减少2-10kg碳排放" },
    { tip: "减少不必要的长途旅行，选择视频会议", potential: "每次减少300-1000kg碳排放" },
  ],
  home: [
    { tip: "使用节能电器，不用时关闭电源", potential: "每月减少10-30kg碳排放" },
    { tip: "安装太阳能热水器或光伏板", potential: "每月减少20-100kg碳排放" },
    { tip: "冬季适当降低室温，夏季适当提高室温", potential: "每月减少15-45kg碳排放" },
  ],
  food: [
    { tip: "减少肉类消费，增加素食比例", potential: "每月减少30-70kg碳排放" },
    { tip: "选择当地、季节性食材", potential: "每月减少5-15kg碳排放" },
    { tip: "减少食物浪费", potential: "每月减少10-30kg碳排放" }
  ],
  consumption: [
    { tip: "延长物品使用寿命，减少不必要购买", potential: "每年减少50-200kg碳排放" },
    { tip: "选择环保材料制作的产品", potential: "每年减少20-100kg碳排放" },
    { tip: "购买二手物品，参与循环经济", potential: "每年减少30-150kg碳排放" }
  ]
}

// 国家人均碳排放数据（示例数据）
const countryData: CountryData[] = [
  { country: "中国", value: 7.38 },
  { country: "美国", value: 15.52 },
  { country: "印度", value: 1.91 },
  { country: "俄罗斯", value: 11.44 },
  { country: "日本", value: 8.99 },
  { country: "德国", value: 9.44 },
  { country: "英国", value: 5.55 },
  { country: "法国", value: 5.13 },
  { country: "平均", value: 4.79 }
]

// 饼图色彩
const COLORS = ['var(--primary-custom)', 'var(--secondary-custom)', 'var(--accent-custom)', 'var(--chart-5)'];

export default function PersonalCarbonFootprintPage() {
  // 状态管理
  const [activeCategory, setActiveCategory] = useState<string>("transportation")
  const [values, setValues] = useState<{ [key: string]: { [key: string]: number } }>({
    transportation: {
      car: 0,
      bus: 0,
      subway: 0,
      plane: 0
    },
    home: {
      electricity: 0,
      gas: 0,
      water: 0
    },
    food: {
      meat: 0,
      dairy: 0,
      vegetables: 0
    },
    consumption: {
      clothes: 0,
      electronics: 0,
      others: 0
    }
  })
  const [totalFootprint, setTotalFootprint] = useState<number>(0)
  const [categoryFootprints, setCategoryFootprints] = useState<CategoryFootprint[]>([])
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false)
  const [factors, setFactors] = useState<CarbonSources>({...carbonSources})
  const [isCalculated, setIsCalculated] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("calculator")

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
        if (category === "transportation") {
          if (item === "plane") {
            // 飞机是按年计算的
            itemFootprint = value * factor / 12
          } else {
            // 其他交通方式是按周计算的
            itemFootprint = value * factor * 4.3 // 约4.3周/月
          }
        } else if (category === "consumption") {
          if (item === "clothes" || item === "electronics") {
            // 衣物和电子产品是按年计算的
            itemFootprint = value * factor / 12
          } else {
            // 其他消费品是按月计算的
            itemFootprint = value * factor
          }
        } else {
          // 家居和食物都是按月计算的
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
    setIsCalculated(false)
  }

  // 获取类别的中文名称
  const getCategoryName = (category: string): string => {
    switch(category) {
      case "transportation": return "交通出行"
      case "home": return "家庭能源"
      case "food": return "饮食消费"
      case "consumption": return "物品消费"
      default: return category
    }
  }

  // 获取碳足迹评价等级
  const getFootprintLevel = () => {
    if (totalFootprint <= 300) return { level: "低碳生活", color: "text-[var(--secondary-custom)]", description: "您的碳排放处于较低水平，感谢您对环保的贡献！" }
    if (totalFootprint <= 600) return { level: "中等碳排", color: "text-[var(--accent-custom)]", description: "您的碳排放处于中等水平，仍有改进空间。" }
    return { level: "高碳排放", color: "text-[var(--destructive)]", description: "您的碳排放处于较高水平，建议采取减排措施。" }
  }

  // 计算平均每人每月碳排放量（中国人均约为7.38吨/年 = 615公斤/月）
  const getPercentOfAverage = (): number => {
    const monthlyAverageChinese = 615
    return Math.round((totalFootprint / monthlyAverageChinese) * 100)
  }

  return (
    <div className="container bg-white">
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
                  <CardTitle>碳足迹计算器</CardTitle>
                  <CardDescription>
                    输入您的日常消费和活动数据，计算您的月度碳足迹
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                              item === "plane" ? 50 :
                              item === "clothes" || item === "electronics" ? 20 :
                              item === "meat" || item === "dairy" || item === "vegetables" ? 30 :
                              100
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
                              step="0.1"
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
                  <CardTitle>减排建议</CardTitle>
                  <CardDescription>
                    根据您的生活习惯，以下是一些减少碳足迹的建议
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="transportation" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="transportation">交通</TabsTrigger>
                      <TabsTrigger value="home">家居</TabsTrigger>
                      <TabsTrigger value="food">饮食</TabsTrigger>
                      <TabsTrigger value="consumption">消费</TabsTrigger>
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
                  <CardTitle>您的碳足迹分析</CardTitle>
                  <CardDescription>
                    基于您提供的信息，以下是您的月度碳足迹计算结果
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 总碳足迹 */}
                  <div className="text-center p-6 bg-[var(--light)] border border-gray-100 rounded-lg">
                    <div className="text-5xl font-bold mb-2">{totalFootprint}</div>
                    <div className="text-lg text-gray-500">千克二氧化碳当量/月</div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">相比中国平均水平</span>
                        <span className="text-sm font-medium">{getPercentOfAverage()}%</span>
                      </div>
                      <Progress 
                        value={getPercentOfAverage()} 
                        className="h-2 bg-gray-200 [&>div]:bg-[var(--primary-custom)]" 
                      />
                    </div>
                    
                    <div className="mt-4">
                      <div className={`text-lg font-semibold ${
                        totalFootprint <= 300 ? "text-[var(--secondary-custom)]" : 
                        totalFootprint <= 600 ? "text-[var(--accent-custom)]" : 
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

              {/* 对比数据 */}
              <Card>
                <CardHeader>
                  <CardTitle>碳足迹对比</CardTitle>
                  <CardDescription>
                    与其他国家人均碳排放量的对比
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        ...countryData,
                        { country: "您的足迹", value: totalFootprint / 1000 * 12 } // 转换为年吨数以便对比
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis dataKey="country" />
                      <YAxis label={{ value: '吨CO₂e/年', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} 吨CO₂e/年`, ""]} />
                      <Bar dataKey="value" fill="var(--primary-custom)">
                        {[...countryData, { country: "您的足迹", value: 0 }].map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.country === "您的足迹" ? "var(--accent-custom)" : "var(--primary-custom)"} 
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
                <CardTitle>个人碳足迹计算器</CardTitle>
                <CardDescription>
                  了解并量化您日常生活中的碳排放
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-8 text-center bg-[var(--light)] border border-gray-100 rounded-lg">
                  <div className="text-5xl font-light text-gray-400 mb-4">?</div>
                  <h3 className="text-xl font-medium mb-2">计算您的碳足迹</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    在左侧表单中输入您的日常生活数据，点击"计算碳足迹"按钮即可查看您的个人碳排放情况。
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-xl font-medium mb-4">什么是碳足迹？</h3>
                  <p className="text-gray-600 mb-4">
                    碳足迹是指个人、组织或产品在生产、使用和废弃过程中直接或间接产生的温室气体排放总量，通常以二氧化碳当量（CO₂e）计量。
                  </p>
                  <p className="text-gray-600 mb-4">
                    个人碳足迹主要来源于日常交通出行、家庭能源使用、饮食习惯以及消费行为。通过了解自己的碳足迹，可以有针对性地采取减排措施，为应对气候变化贡献力量。
                  </p>
                  <p className="text-gray-600">
                    本计算器根据您的输入数据估算碳排放量，结果仅供参考。实际碳排放会受到多种因素影响，包括地理位置、气候条件、能源结构等。
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-xl font-medium mb-4">如何使用本计算器</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">1</span>
                      <span>在左侧表单的各个标签页中输入您的日常生活数据</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">2</span>
                      <span>点击"计算碳足迹"按钮获取结果</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">3</span>
                      <span>查看分析结果和减排建议</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">4</span>
                      <span>根据建议调整生活习惯，定期重新计算以跟踪进展</span>
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