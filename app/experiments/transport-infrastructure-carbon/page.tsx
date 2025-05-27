"use client"

import { useState } from "react"
import {
  ExperimentStep,
  InventoryItem,
  CarbonCalculationData,
  CalculationResults,
  StepIndicator,
  StepSidebar,
  IntroductionStep,
  InventoryStep,
  CalculationStep,
  ReportStep,
  calculateEmissions
} from "./components"

export default function TransportInfrastructureCarbonPage() {
  const [currentStep, setCurrentStep] = useState<ExperimentStep>("intro")
  const [completedSteps, setCompletedSteps] = useState<Set<ExperimentStep>>(new Set())
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  
  // 工程内容清单
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "1", name: "路基土方开挖", unit: "立方米", quantity: 0, description: "道路路基开挖土方量" },
    { id: "2", name: "路面混凝土浇筑", unit: "立方米", quantity: 0, description: "道路路面混凝土用量" },
    { id: "3", name: "钢筋使用", unit: "吨", quantity: 0, description: "桥梁和结构钢筋用量" },
    { id: "4", name: "沥青路面铺设", unit: "平方米", quantity: 0, description: "沥青路面铺设面积" },
    { id: "5", name: "碎石垫层", unit: "立方米", quantity: 0, description: "路基碎石垫层用量" }
  ])

  // 碳核算数据
  const [carbonData, setCarbonData] = useState<CarbonCalculationData>({
    labor: {
      workers: 0,
      workDays: 0,
      transportDistance: 0
    },
    machinery: {
      excavators: 0,
      trucks: 0,
      cranes: 0,
      operatingHours: 0
    },
    materials: {
      concrete: 0,
      steel: 0,
      asphalt: 0,
      gravel: 0
    },
    energy: {
      electricity: 0,
      diesel: 0,
      gasoline: 0
    }
  })

  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)

  // 完成步骤
  const completeStep = (step: ExperimentStep) => {
    setCompletedSteps(prev => new Set([...prev, step]))
  }

  // 更新清单项目
  const updateInventoryItem = (id: string, field: keyof InventoryItem, value: string | number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  // 更新碳核算数据
  const updateCarbonData = (category: keyof CarbonCalculationData, field: string, value: number) => {
    setCarbonData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  // 计算碳排放
  const handleCalculateEmissions = () => {
    const results = calculateEmissions(carbonData)
    setCalculationResults(results)
    completeStep("calculation")
  }

  // 生成报告
  const handleGenerateReport = () => {
    completeStep("report")
  }

  // 下载报告
  const handleDownloadReport = () => {
    // 这里可以实现报告下载逻辑
    console.log("下载报告")
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* 页面标题 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">交通基础设施碳核算实验</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过实际案例学习交通基础设施建设项目的全生命周期碳排放核算方法
        </p>
      </div>

      {/* 步骤导航 */}
      <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />

      {/* 步骤内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左侧导航 */}
        <div className="lg:col-span-1">
          <StepSidebar 
            currentStep={currentStep} 
            completedSteps={completedSteps} 
            onStepChange={setCurrentStep} 
          />
        </div>

        {/* 主要内容区域 */}
        <div className="lg:col-span-3">
          {/* 第一步：实验介绍 */}
          {currentStep === "intro" && (
            <IntroductionStep
              onComplete={() => completeStep("intro")}
              onNext={setCurrentStep}
            />
          )}

          {/* 第二步：工程内容清单 */}
          {currentStep === "inventory" && (
            <InventoryStep
              projectName={projectName}
              projectDescription={projectDescription}
              inventory={inventory}
              onProjectNameChange={setProjectName}
              onProjectDescriptionChange={setProjectDescription}
              onInventoryUpdate={updateInventoryItem}
              onComplete={() => completeStep("inventory")}
              onNext={setCurrentStep}
              onPrevious={setCurrentStep}
            />
          )}

          {/* 第三步：碳核算 */}
          {currentStep === "calculation" && (
            <CalculationStep
              carbonData={carbonData}
              calculationResults={calculationResults}
              onDataUpdate={updateCarbonData}
              onCalculate={handleCalculateEmissions}
              onNext={setCurrentStep}
              onPrevious={setCurrentStep}
            />
          )}

          {/* 第四步：实验报告 */}
          {currentStep === "report" && calculationResults && (
            <ReportStep
              projectName={projectName}
              projectDescription={projectDescription}
              calculationResults={calculationResults}
              onComplete={handleGenerateReport}
              onPrevious={setCurrentStep}
              onDownloadReport={handleDownloadReport}
            />
          )}
        </div>
      </div>
    </div>
  )
} 