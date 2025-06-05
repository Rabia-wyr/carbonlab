"use client"

import { useState } from "react"
import { Stepper } from "@/components/experiment-stepper"
import {
  ExperimentStep,
  CarbonCalculationData,
  CalculationResults,
  IntroductionStep,
  InventoryStep,
  CalculationStep,
  ReportStep,
  calculateEmissions
} from "./components"

export default function TransportInfrastructureCarbonPage() {
  // 使用数字索引来匹配 Stepper 组件的接口
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  
  // 定义步骤配置
  const steps = [
    { title: "实验介绍", description: "了解实验背景和目标" },
    { title: "工程清单内容", description: "查看项目工程量数据" },
    { title: "碳核算", description: "计算各类碳排放" },
    { title: "实验报告", description: "查看结果和分析" }
  ]

  // 步骤名称映射
  const stepNames: ExperimentStep[] = ["intro", "inventory", "calculation", "report"]
  const currentStep = stepNames[currentStepIndex]

  // 静态项目数据（用于报告生成）
  const projectName = "某市环城快速路建设项目"
  const projectDescription = "该项目为某市环城快速路建设工程，全长约15公里，包括主线道路、桥梁、隧道等基础设施建设。项目采用双向六车道设计，设计时速80公里/小时。"

  // 碳核算数据
  const [carbonData, setCarbonData] = useState<CarbonCalculationData>({
    labor: [],
    transport: [],
    materials: [],
    energy: [],
    temporary: [],
    waste: [],
    carbonSink: []
  })

  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)

  // 处理步骤变更
  const handleStepChange = (stepIndex: number) => {
    // 如果是最后一步的"完成实验"按钮
    if (stepIndex >= steps.length) {
      console.log("实验完成！")
      // 这里可以添加实验完成后的逻辑，比如跳转到其他页面
      return
    }
    setCurrentStepIndex(stepIndex)
  }

  // 更新碳核算数据
  const updateCarbonData = (newData: CarbonCalculationData) => {
    setCarbonData(newData)
  }

  // 计算碳排放
  const handleCalculateEmissions = () => {
    const results = calculateEmissions(carbonData)
    setCalculationResults(results)
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

      {/* 使用自定义 Stepper 组件 */}
      <Stepper 
        steps={steps}
        currentStep={currentStepIndex}
        onStepChange={handleStepChange}
      />

      {/* 步骤内容 */}
      <div className="max-w-4xl mx-auto">
        {/* 第一步：实验介绍 */}
        {currentStep === "intro" && (
          <IntroductionStep
            onComplete={() => {}}
            onNext={() => setCurrentStepIndex(1)}
          />
        )}

        {/* 第二步：工程清单内容 */}
        {currentStep === "inventory" && (
          <InventoryStep
            onComplete={() => {}}
            onNext={() => setCurrentStepIndex(2)}
            onPrevious={() => setCurrentStepIndex(0)}
          />
        )}

        {/* 第三步：碳核算 */}
        {currentStep === "calculation" && (
          <CalculationStep
            carbonData={carbonData}
            calculationResults={calculationResults}
            onDataUpdate={updateCarbonData}
            onCalculate={handleCalculateEmissions}
            onNext={() => setCurrentStepIndex(3)}
            onPrevious={() => setCurrentStepIndex(1)}
          />
        )}

        {/* 第四步：实验报告 */}
        {currentStep === "report" && calculationResults && (
          <ReportStep
            projectName={projectName}
            projectDescription={projectDescription}
            calculationResults={calculationResults}
            onComplete={() => {}}
            onPrevious={() => setCurrentStepIndex(2)}
            onDownloadReport={handleDownloadReport}
          />
        )}
      </div>
    </div>
  )
} 