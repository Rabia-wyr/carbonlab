import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Info, FileText, Calculator, BarChart3 } from "lucide-react"
import { ExperimentStep } from "./types"

interface StepNavigationProps {
  currentStep: ExperimentStep
  completedSteps: Set<ExperimentStep>
  onStepChange: (step: ExperimentStep) => void
}

const steps = [
  { id: "intro", title: "实验介绍", icon: Info },
  { id: "inventory", title: "工程内容清单", icon: FileText },
  { id: "calculation", title: "碳核算", icon: Calculator },
  { id: "report", title: "实验报告", icon: BarChart3 }
]

export function StepIndicator({ currentStep, completedSteps }: Omit<StepNavigationProps, 'onStepChange'>) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = completedSteps.has(step.id as ExperimentStep)
            const isCurrent = currentStep === step.id
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                    ${isCompleted 
                      ? "bg-green-500 border-green-500 text-white" 
                      : isCurrent 
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    }
                  `}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-sm font-medium ${isCurrent ? "text-blue-600" : "text-gray-600"}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function StepSidebar({ currentStep, completedSteps, onStepChange }: StepNavigationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>实验步骤</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map((step) => {
          const Icon = step.icon
          const isCompleted = completedSteps.has(step.id as ExperimentStep)
          const isCurrent = currentStep === step.id
          
          return (
            <Button
              key={step.id}
              variant={isCurrent ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onStepChange(step.id as ExperimentStep)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {step.title}
              {isCompleted && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
} 