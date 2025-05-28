"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Play, FileText, BarChart3, TrendingUp, Leaf } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import VideoPlayer from './video-player'

// 类型定义
type ProvinceData = {
  name: string
  code: string
  center: [number, number]
  carbonEmission: number // 碳排放量 (万吨)
  population: number // 常住人口 (万人)
  urbanizationRate: number // 城镇化率 (%)
  gdp: number // 省GDP (亿元)
  energyConsumption: number // 总能耗 (万吨标准煤)
  coalConsumption: number // 煤炭消耗量 (万吨)
  secondaryIndustryValue: number // 第二产业增加值 (亿元)
  landTypes: {
    farmland: number // 耕地面积 (万公顷)
    forestland: number // 林地面积 (万公顷)
    grassland: number // 草地面积 (万公顷)
    urbanGreen: number // 城市绿地面积 (万公顷)
  }
  carbonAbsorption: number // 碳吸收量 (万吨)
}

// 中国各省份数据（示例数据）
const provinceData: ProvinceData[] = [
  {
    name: "北京",
    code: "110000",
    center: [116.4074, 39.9042],
    carbonEmission: 12500,
    population: 2189,
    urbanizationRate: 86.5,
    gdp: 40269,
    energyConsumption: 7200,
    coalConsumption: 1800,
    secondaryIndustryValue: 7716,
    landTypes: { farmland: 12.8, forestland: 61.4, grassland: 8.2, urbanGreen: 4.6 },
    carbonAbsorption: 245.2
  },
  {
    name: "上海",
    code: "310000",
    center: [121.4737, 31.2304],
    carbonEmission: 18900,
    population: 2487,
    urbanizationRate: 88.1,
    gdp: 43214,
    energyConsumption: 11200,
    coalConsumption: 2800,
    secondaryIndustryValue: 10968,
    landTypes: { farmland: 18.5, forestland: 9.8, grassland: 2.1, urbanGreen: 3.2 },
    carbonAbsorption: 52.4
  },
  {
    name: "广东",
    code: "440000",
    center: [113.2644, 23.1291],
    carbonEmission: 65800,
    population: 12601,
    urbanizationRate: 74.2,
    gdp: 129118,
    energyConsumption: 32500,
    coalConsumption: 8900,
    secondaryIndustryValue: 53728,
    landTypes: { farmland: 156.2, forestland: 1052.8, grassland: 45.6, urbanGreen: 12.8 },
    carbonAbsorption: 4058.7
  },
  {
    name: "江苏",
    code: "320000",
    center: [118.7633, 32.0615],
    carbonEmission: 78200,
    population: 8515,
    urbanizationRate: 73.4,
    gdp: 122875,
    energyConsumption: 35600,
    coalConsumption: 12800,
    secondaryIndustryValue: 56909,
    landTypes: { farmland: 345.6, forestland: 156.8, grassland: 12.4, urbanGreen: 8.9 },
    carbonAbsorption: 625.8
  },
  {
    name: "山东",
    code: "370000",
    center: [117.0009, 36.6758],
    carbonEmission: 89500,
    population: 10152,
    urbanizationRate: 63.8,
    gdp: 83095,
    energyConsumption: 42800,
    coalConsumption: 18900,
    secondaryIndustryValue: 33546,
    landTypes: { farmland: 456.8, forestland: 298.5, grassland: 34.2, urbanGreen: 15.6 },
    carbonAbsorption: 1205.4
  },
  {
    name: "河南",
    code: "410000",
    center: [113.6401, 34.7566],
    carbonEmission: 67800,
    population: 9883,
    urbanizationRate: 56.5,
    gdp: 61345,
    energyConsumption: 28900,
    coalConsumption: 15600,
    secondaryIndustryValue: 27598,
    landTypes: { farmland: 678.9, forestland: 245.6, grassland: 56.8, urbanGreen: 12.3 },
    carbonAbsorption: 1025.6
  }
]

// 碳吸收系数
const carbonAbsorptionCoefficients = {
  farmland: 0.007, // t·hm²·a⁻¹
  forestland: 3.8096,
  grassland: 0.9482,
  urbanGreen: 2.3789 // (林地+草地)/2
}

// 动态导入地图组件
const ChinaMap = dynamic(
  () => import('./china-map-component'),
  { ssr: false }
)

export default function CarbonNeutralPredictionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedProvince, setSelectedProvince] = useState<string>("全国")
  const [predictionYears, setPredictionYears] = useState(30)
  const [carbonIntensityReduction, setCarbonIntensityReduction] = useState(3.5) // 年递减率 %
  const [policyAdvice, setPolicyAdvice] = useState("")
  
  // 计算碳吸收量
  const calculateCarbonAbsorption = (province: ProvinceData) => {
    const { landTypes } = province
    return (
      landTypes.farmland * 10000 * carbonAbsorptionCoefficients.farmland +
      landTypes.forestland * 10000 * carbonAbsorptionCoefficients.forestland +
      landTypes.grassland * 10000 * carbonAbsorptionCoefficients.grassland +
      landTypes.urbanGreen * 10000 * carbonAbsorptionCoefficients.urbanGreen
    ) / 10000 // 转换为万吨
  }

  // 碳排放预测模型
  const predictCarbonEmission = (province: ProvinceData, year: number) => {
    const baseYear = 2023
    const yearDiff = year - baseYear
    
    // 简化的STIRPAT模型参数
    const a = 0.5 // 模型系数
    const b = 0.8 // 人口弹性系数
    const c = 0.6 // 城镇化率弹性系数
    const d = 0.9 // 人均GDP弹性系数
    const f = -0.1 // 人均GDP平方项系数
    const g = -0.05 * yearDiff * (carbonIntensityReduction / 100) // 碳排放强度递减
    const h = -0.03 * yearDiff // 能源强度改善
    const j = -0.02 * yearDiff // 能源结构优化
    const k = -0.01 * yearDiff // 产业结构调整
    
    const perCapitaGDP = province.gdp * 10000 / province.population // 元/人
    const carbonIntensity = province.carbonEmission / (province.gdp / 10000) // t/万元
    const energyIntensity = province.energyConsumption / (province.gdp / 10000) // tce/万元
    const energyStructure = (province.coalConsumption / province.energyConsumption) * 100 // %
    const industryStructure = (province.secondaryIndustryValue / province.gdp) * 100 // %
    
    const lnI = Math.log(a) + 
                b * Math.log(province.population) +
                c * Math.log(province.urbanizationRate) +
                d * Math.log(perCapitaGDP) +
                f * Math.pow(Math.log(perCapitaGDP), 2) +
                g * Math.log(carbonIntensity) +
                h * Math.log(energyIntensity) +
                j * Math.log(energyStructure) +
                k * Math.log(industryStructure)
    
    return Math.exp(lnI)
  }

  // 生成预测数据
  const generatePredictionData = () => {
    const currentYear = 2023
    const data = []
    
    for (let i = 0; i <= predictionYears; i++) {
      const year = currentYear + i
      let totalEmission = 0
      let totalAbsorption = 0
      
      if (selectedProvince === "全国") {
        provinceData.forEach(province => {
          totalEmission += predictCarbonEmission(province, year)
          totalAbsorption += calculateCarbonAbsorption(province)
        })
      } else {
        const province = provinceData.find(p => p.name === selectedProvince)
        if (province) {
          totalEmission = predictCarbonEmission(province, year)
          totalAbsorption = calculateCarbonAbsorption(province)
        }
      }
      
      data.push({
        year,
        emission: Math.round(totalEmission),
        absorption: Math.round(totalAbsorption),
        net: Math.round(totalEmission - totalAbsorption)
      })
    }
    
    return data
  }

  const predictionData = generatePredictionData()
  const carbonNeutralYear = predictionData.find(d => d.net <= 0)?.year || null

  const steps = [
    { id: 1, title: "实验介绍", icon: Play },
    { id: 2, title: "数据可视化", icon: BarChart3 },
    { id: 3, title: "碳排放预测", icon: TrendingUp },
    { id: 4, title: "碳吸收预测", icon: Leaf },
    { id: 5, title: "碳中和预测", icon: TrendingUp },
    { id: 6, title: "报告撰写", icon: FileText }
  ]

  // 数据下载功能
  const downloadData = () => {
    const csvContent = [
      ["省份", "碳排放量(万吨)", "常住人口(万人)", "城镇化率(%)", "GDP(亿元)", "总能耗(万吨标准煤)", "煤炭消耗量(万吨)", "第二产业增加值(亿元)", "碳吸收量(万吨)"],
      ...provinceData.map(province => [
        province.name,
        province.carbonEmission,
        province.population,
        province.urbanizationRate,
        province.gdp,
        province.energyConsumption,
        province.coalConsumption,
        province.secondaryIndustryValue,
        calculateCarbonAbsorption(province).toFixed(1)
      ])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "carbon_data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 报告下载功能
  const downloadReport = () => {
    const reportContent = `
碳中和预测实验报告

一、实验概述
本实验基于STIRPAT模型对${selectedProvince}的碳排放进行预测，结合土地利用类型计算碳吸收量，分析碳中和实现路径。

二、碳排放预测结果
根据STIRPAT模型预测，在当前发展趋势下，${selectedProvince}的碳排放量将在未来${predictionYears}年内呈现${carbonIntensityReduction > 3 ? "快速" : "缓慢"}下降趋势。年均递减率设定为${carbonIntensityReduction}%。

三、碳吸收量分析
基于土地利用类型和碳吸收系数计算，${selectedProvince}当前碳吸收能力为${predictionData[0]?.absorption.toLocaleString()}万吨/年。其中林地贡献最大，碳吸收系数为3.8096 t·hm²·a⁻¹。

四、碳中和预测
综合碳排放和碳吸收预测结果，${selectedProvince}预计在${carbonNeutralYear || "2060年后"}实现碳中和目标。当前净排放量为${predictionData[0]?.net.toLocaleString()}万吨。

五、政策建议
${policyAdvice || "请在实验中填写政策建议"}

报告生成时间：${new Date().toLocaleString()}
    `.trim()
    
    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `碳中和预测报告_${selectedProvince}_${new Date().toISOString().split('T')[0]}.txt`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 步骤导航 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            碳中和预测实验
          </CardTitle>
          <CardDescription>
            基于机器学习和大数据分析的全球碳中和路径预测与情景模拟
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {steps.map((step) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(step.id)}
                className="flex items-center gap-2"
              >
                <step.icon className="h-4 w-4" />
                {step.title}
              </Button>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* 步骤1: 实验介绍 */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>实验介绍</CardTitle>
            <CardDescription>了解碳中和预测实验的背景、目标和方法</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="video">视频介绍</TabsTrigger>
                <TabsTrigger value="text">文字说明</TabsTrigger>
                <TabsTrigger value="images">图片展示</TabsTrigger>
              </TabsList>
              
              <TabsContent value="video" className="mt-4">
                <div className="aspect-video bg-gray-100 rounded-lg">
                  <VideoPlayer />
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">实验背景</h3>
                    <p className="text-gray-700">
                      碳中和是指在规定时期内，通过植树造林、节能减排等形式，抵消自身产生的二氧化碳排放量，实现二氧化碳"零排放"。
                      本实验基于STIRPAT模型和碳吸收计算模型，对中国各省份的碳排放和碳吸收进行预测分析。
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">实验目标</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>掌握碳排放预测的STIRPAT模型原理和应用</li>
                      <li>学习碳吸收量的计算方法和影响因素</li>
                      <li>理解碳中和路径规划的科学方法</li>
                      <li>培养数据分析和政策建议撰写能力</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">实验方法</h3>
                    <p className="text-gray-700">
                      采用STIRPAT（Stochastic Impacts by Regression on Population, Affluence, and Technology）模型进行碳排放预测，
                      结合土地利用类型和碳吸收系数计算碳吸收量，最终预测碳中和实现时间。
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="images" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">碳排放趋势图</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Leaf className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">碳吸收分布图</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end mt-6">
              <Button onClick={() => setCurrentStep(2)}>
                开始实验 →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 步骤2: 数据可视化 */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>数据可视化及下载</CardTitle>
            <CardDescription>基于中国地图的各省碳排放量和相关指标可视化</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 地图可视化 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">中国各省碳排放分布图</h3>
                  <div className="flex gap-2">
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="全国">全国</SelectItem>
                        {provinceData.map(province => (
                          <SelectItem key={province.code} value={province.name}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" onClick={downloadData}>
                      <Download className="h-4 w-4 mr-2" />
                      下载数据
                    </Button>
                  </div>
                </div>
                
                <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
                  <ChinaMap 
                    selectedProvince={selectedProvince === "全国" ? undefined : selectedProvince}
                    onProvinceSelect={(province) => setSelectedProvince(province)}
                  />
                </div>
              </div>

              {/* 数据表格 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">省份数据详情</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">省份</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">碳排放量(万吨)</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">常住人口(万人)</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">城镇化率(%)</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">GDP(亿元)</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">碳吸收量(万吨)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provinceData.map(province => (
                        <tr key={province.code} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium">{province.name}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{province.carbonEmission.toLocaleString()}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{province.population.toLocaleString()}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{province.urbanizationRate}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{province.gdp.toLocaleString()}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{calculateCarbonAbsorption(province).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                ← 上一步
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                下一步 →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 步骤3: 碳排放预测 */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>碳排放量预测</CardTitle>
            <CardDescription>基于STIRPAT模型的碳排放预测分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 模型公式 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">STIRPAT模型公式</h3>
                <div className="font-mono text-sm bg-white p-3 rounded border">
                  ln I = ln a + b ln P + c ln U + d ln A + f (ln A)² + g ln T + h ln E₁ + j ln E₂ + k ln I₂
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p><strong>式中：</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>I: CO₂排放量(单位:t)</li>
                    <li>P: 常住人口(单位:万人)</li>
                    <li>U: 城镇化率(单位:%)</li>
                    <li>A: 人均GDP(单位:元)</li>
                    <li>T: 碳排放强度(单位:t/万元)</li>
                    <li>E₁: 能源强度(单位:tce/万元)</li>
                    <li>E₂: 能源结构(单位:%，煤炭消耗占比)</li>
                    <li>I₂: 产业结构(单位:%，第二产业增加值占GDP比重)</li>
                  </ul>
                </div>
              </div>

              {/* 预测参数设置 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>预测年限: {predictionYears} 年</Label>
                  <Slider
                    value={[predictionYears]}
                    min={10}
                    max={50}
                    step={5}
                    onValueChange={([value]) => setPredictionYears(value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>碳排放强度年递减率: {carbonIntensityReduction}%</Label>
                  <Slider
                    value={[carbonIntensityReduction]}
                    min={1}
                    max={10}
                    step={0.5}
                    onValueChange={([value]) => setCarbonIntensityReduction(value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* 预测结果图表 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">碳排放预测结果</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="emission" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="碳排放量(万吨)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                ← 上一步
              </Button>
              <Button onClick={() => setCurrentStep(4)}>
                下一步 →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 步骤4: 碳吸收预测 */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>碳吸收量预测</CardTitle>
            <CardDescription>基于土地利用类型的碳吸收量计算</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 计算公式 */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">碳吸收量计算公式</h3>
                <div className="font-mono text-sm bg-white p-3 rounded border">
                  C = Σ(Sᵢ × Vᵢ)
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p><strong>式中：</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>C: 总碳吸收量(单位:t)</li>
                    <li>Sᵢ: 第i类土地利用类型的面积(单位:hm²)</li>
                    <li>Vᵢ: 第i类土地利用类型的碳吸收系数(单位:t·hm²·a⁻¹)</li>
                    <li>i = 1,2,3,4 分别为耕地、林地、草地、城市绿地</li>
                  </ul>
                </div>
              </div>

              {/* 碳吸收系数表 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">碳吸收系数</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">0.007</div>
                      <div className="text-sm text-gray-600">耕地</div>
                      <div className="text-xs text-gray-500">t·hm²·a⁻¹</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">3.8096</div>
                      <div className="text-sm text-gray-600">林地</div>
                      <div className="text-xs text-gray-500">t·hm²·a⁻¹</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-lime-600">0.9482</div>
                      <div className="text-sm text-gray-600">草地</div>
                      <div className="text-xs text-gray-500">t·hm²·a⁻¹</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-600">2.3789</div>
                      <div className="text-sm text-gray-600">城市绿地</div>
                      <div className="text-xs text-gray-500">t·hm²·a⁻¹</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 各省碳吸收量对比 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">各省碳吸收量对比</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={provinceData.map(p => ({
                      name: p.name,
                      absorption: calculateCarbonAbsorption(p)
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="absorption" fill="#22c55e" name="碳吸收量(万吨)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                ← 上一步
              </Button>
              <Button onClick={() => setCurrentStep(5)}>
                下一步 →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 步骤5: 碳中和预测 */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>碳中和预测</CardTitle>
            <CardDescription>基于碳排放和碳吸收的碳中和时间轴预测</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 预测结果摘要 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {carbonNeutralYear || "未实现"}
                    </div>
                    <div className="text-sm text-gray-600">预计碳中和年份</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {predictionData[0]?.emission.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">当前碳排放量(万吨)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {predictionData[0]?.absorption.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">当前碳吸收量(万吨)</div>
                  </CardContent>
                </Card>
              </div>

              {/* 碳中和时间轴图 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">碳中和时间轴预测</h3>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="emission" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="碳排放量(万吨)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="absorption" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="碳吸收量(万吨)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="net" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="净排放量(万吨)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 情景对比 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">不同减排情景对比</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-red-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-red-600">保守情景</CardTitle>
                      <CardDescription className="text-xs">年递减率 2%</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-lg font-bold">2065年</div>
                      <div className="text-xs text-gray-500">预计碳中和年份</div>
                    </CardContent>
                  </Card>
                  <Card className="border-yellow-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-yellow-600">中等情景</CardTitle>
                      <CardDescription className="text-xs">年递减率 3.5%</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-lg font-bold">{carbonNeutralYear || "2060年"}</div>
                      <div className="text-xs text-gray-500">预计碳中和年份</div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-600">积极情景</CardTitle>
                      <CardDescription className="text-xs">年递减率 5%</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-lg font-bold">2055年</div>
                      <div className="text-xs text-gray-500">预计碳中和年份</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                ← 上一步
              </Button>
              <Button onClick={() => setCurrentStep(6)}>
                下一步 →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 步骤6: 报告撰写 */}
      {currentStep === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>实验报告撰写</CardTitle>
            <CardDescription>自动生成实验报告并添加政策建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 自动生成的报告内容 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">碳中和预测实验报告</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold">一、实验概述</h4>
                    <p>本实验基于STIRPAT模型对{selectedProvince}的碳排放进行预测，结合土地利用类型计算碳吸收量，分析碳中和实现路径。</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">二、碳排放预测结果</h4>
                    <p>根据STIRPAT模型预测，在当前发展趋势下，{selectedProvince}的碳排放量将在未来{predictionYears}年内呈现{carbonIntensityReduction > 3 ? "快速" : "缓慢"}下降趋势。年均递减率设定为{carbonIntensityReduction}%。</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">三、碳吸收量分析</h4>
                    <p>基于土地利用类型和碳吸收系数计算，{selectedProvince}当前碳吸收能力为{predictionData[0]?.absorption.toLocaleString()}万吨/年。其中林地贡献最大，碳吸收系数为3.8096 t·hm²·a⁻¹。</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">四、碳中和预测</h4>
                    <p>综合碳排放和碳吸收预测结果，{selectedProvince}预计在{carbonNeutralYear || "2060年后"}实现碳中和目标。当前净排放量为{predictionData[0]?.net.toLocaleString()}万吨。</p>
                  </div>
                </div>
              </div>

              {/* 政策建议输入区域 */}
              <div>
                <Label htmlFor="policy-advice" className="text-lg font-semibold">
                  五、政策建议
                </Label>
                <Textarea
                  id="policy-advice"
                  placeholder="请根据预测结果，提出具体的政策建议和减排措施..."
                  value={policyAdvice}
                  onChange={(e) => setPolicyAdvice(e.target.value)}
                  className="mt-2 min-h-[200px]"
                />
                <div className="text-sm text-gray-500 mt-2">
                  建议包含：产业结构调整、能源结构优化、技术创新、碳汇建设等方面的具体措施
                </div>
              </div>

              {/* 报告操作 */}
              <div className="flex gap-4">
                <Button className="flex items-center gap-2" onClick={downloadReport}>
                  <Download className="h-4 w-4" />
                  下载PDF报告
                </Button>
                <Button variant="outline" className="flex items-center gap-2" onClick={downloadReport}>
                  <FileText className="h-4 w-4" />
                  导出Word文档
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(5)}>
                ← 上一步
              </Button>
              <Button onClick={() => setCurrentStep(1)}>
                重新开始实验
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 