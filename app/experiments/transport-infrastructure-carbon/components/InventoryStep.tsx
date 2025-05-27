import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import { InventoryItem, ExperimentStep } from "./types"

interface InventoryStepProps {
  projectName: string
  projectDescription: string
  inventory: InventoryItem[]
  onProjectNameChange: (name: string) => void
  onProjectDescriptionChange: (description: string) => void
  onInventoryUpdate: (id: string, field: keyof InventoryItem, value: string | number) => void
  onComplete: () => void
  onNext: (step: ExperimentStep) => void
  onPrevious: (step: ExperimentStep) => void
}

export function InventoryStep({
  projectName,
  projectDescription,
  inventory,
  onProjectNameChange,
  onProjectDescriptionChange,
  onInventoryUpdate,
  onComplete,
  onNext,
  onPrevious
}: InventoryStepProps) {
  const handleNext = () => {
    onComplete()
    onNext("calculation")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          工程内容清单
        </CardTitle>
        <CardDescription>
          建立详细的工程量清单，为碳核算提供基础数据
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 项目基本信息 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">项目基本信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">项目名称</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                placeholder="请输入项目名称"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="projectDescription">项目描述</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => onProjectDescriptionChange(e.target.value)}
                placeholder="请输入项目描述"
                rows={3}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* 工程量清单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">工程量清单</h3>
          <div className="space-y-4">
            {inventory.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label>工程项目</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => onInventoryUpdate(item.id, "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>单位</Label>
                    <Input
                      value={item.unit}
                      onChange={(e) => onInventoryUpdate(item.id, "unit", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>工程量</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onInventoryUpdate(item.id, "quantity", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label>描述</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => onInventoryUpdate(item.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onPrevious("intro")}>
            上一步
          </Button>
          <Button onClick={handleNext}>
            下一步：碳核算
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 