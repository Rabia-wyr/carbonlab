"use client"

import { useState } from "react"
import {
  ExperimentStep,
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
  // 静态项目数据（用于报告生成）
  const projectName = "某市环城快速路建设项目"
  const projectDescription = "该项目为某市环城快速路建设工程，全长约15公里，包括主线道路、桥梁、隧道等基础设施建设。项目采用双向六车道设计，设计时速80公里/小时。"

  // 碳核算数据
  const [carbonData, setCarbonData] = useState<CarbonCalculationData>({
    labor: [],
    machinery: [],
    materials: [],
    energy: []
  })

  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)

  // 完成步骤
  const completeStep = (step: ExperimentStep) => {
    setCompletedSteps(prev => new Set([...prev, step]))
  }



  // 更新碳核算数据
  const updateCarbonData = (newData: CarbonCalculationData) => {
    setCarbonData(newData)
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