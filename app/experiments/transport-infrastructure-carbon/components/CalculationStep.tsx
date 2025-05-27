import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Info, Truck, Hammer, Zap, Package } from "lucide-react"
import { CarbonCalculationData, CalculationResults, ExperimentStep, emissionFactors } from "./types"

interface CalculationStepProps {
  carbonData: CarbonCalculationData
  calculationResults: CalculationResults | null
  onDataUpdate: (category: keyof CarbonCalculationData, field: string, value: number) => void
  onCalculate: () => void
  onNext: (step: ExperimentStep) => void
  onPrevious: (step: ExperimentStep) => void
}

export function CalculationStep({
  carbonData,
  calculationResults,
  onDataUpdate,
  onCalculate,
  onNext,
  onPrevious
}: CalculationStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          碳核算
        </CardTitle>
        <CardDescription>
          分别计算人工、机械使用、材料、能源四个方面的碳排放
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="labor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="labor" className="flex items-center">
              <Truck className="w-4 h-4 mr-2" />
              人工
            </TabsTrigger>
            <TabsTrigger value="machinery" className="flex items-center">
              <Hammer className="w-4 h-4 mr-2" />
              机械使用
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              材料
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              能源
            </TabsTrigger>
          </TabsList>

          {/* 人工碳排放 */}
          <TabsContent value="labor" className="space-y-4">
            <h3 className="text-lg font-semibold">人工碳排放</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>施工人员数量（人）</Label>
                <Input
                  type="number"
                  value={carbonData.labor.workers}
                  onChange={(e) => onDataUpdate("labor", "workers", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>施工天数（天）</Label>
                <Input
                  type="number"
                  value={carbonData.labor.workDays}
                  onChange={(e) => onDataUpdate("labor", "workDays", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>通勤距离（公里/天）</Label>
                <Input
                  type="number"
                  value={carbonData.labor.transportDistance}
                  onChange={(e) => onDataUpdate("labor", "transportDistance", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                人工碳排放主要包括施工人员的住宿和通勤产生的碳排放。
                住宿排放因子：2.5 kg CO₂e/人/天，通勤排放因子：0.12 kg CO₂e/公里。
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* 机械使用碳排放 */}
          <TabsContent value="machinery" className="space-y-4">
            <h3 className="text-lg font-semibold">机械使用碳排放</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>挖掘机数量（台）</Label>
                <Input
                  type="number"
                  value={carbonData.machinery.excavators}
                  onChange={(e) => onDataUpdate("machinery", "excavators", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>运输卡车数量（台）</Label>
                <Input
                  type="number"
                  value={carbonData.machinery.trucks}
                  onChange={(e) => onDataUpdate("machinery", "trucks", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>起重机数量（台）</Label>
                <Input
                  type="number"
                  value={carbonData.machinery.cranes}
                  onChange={(e) => onDataUpdate("machinery", "cranes", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>平均作业时间（小时/天）</Label>
                <Input
                  type="number"
                  value={carbonData.machinery.operatingHours}
                  onChange={(e) => onDataUpdate("machinery", "operatingHours", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                机械设备排放因子：挖掘机 25.0 kg CO₂e/小时，卡车 2.8 kg CO₂e/公里，起重机 18.0 kg CO₂e/小时。
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* 材料碳排放 */}
          <TabsContent value="materials" className="space-y-4">
            <h3 className="text-lg font-semibold">材料碳排放</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>混凝土用量（立方米）</Label>
                <Input
                  type="number"
                  value={carbonData.materials.concrete}
                  onChange={(e) => onDataUpdate("materials", "concrete", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>钢材用量（吨）</Label>
                <Input
                  type="number"
                  value={carbonData.materials.steel}
                  onChange={(e) => onDataUpdate("materials", "steel", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>沥青用量（吨）</Label>
                <Input
                  type="number"
                  value={carbonData.materials.asphalt}
                  onChange={(e) => onDataUpdate("materials", "asphalt", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>碎石用量（立方米）</Label>
                <Input
                  type="number"
                  value={carbonData.materials.gravel}
                  onChange={(e) => onDataUpdate("materials", "gravel", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                材料排放因子：混凝土 0.35 kg CO₂e/kg，钢材 2.1 kg CO₂e/kg，沥青 0.45 kg CO₂e/kg，碎石 0.008 kg CO₂e/kg。
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* 能源碳排放 */}
          <TabsContent value="energy" className="space-y-4">
            <h3 className="text-lg font-semibold">能源碳排放</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>电力消耗（千瓦时）</Label>
                <Input
                  type="number"
                  value={carbonData.energy.electricity}
                  onChange={(e) => onDataUpdate("energy", "electricity", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>柴油消耗（升）</Label>
                <Input
                  type="number"
                  value={carbonData.energy.diesel}
                  onChange={(e) => onDataUpdate("energy", "diesel", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>汽油消耗（升）</Label>
                <Input
                  type="number"
                  value={carbonData.energy.gasoline}
                  onChange={(e) => onDataUpdate("energy", "gasoline", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                能源排放因子：电力 0.6 kg CO₂e/kWh，柴油 2.7 kg CO₂e/L，汽油 2.3 kg CO₂e/L。
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => onPrevious("inventory")}>
            上一步
          </Button>
          <Button onClick={onCalculate}>
            计算碳排放
          </Button>
        </div>

        {/* 计算结果 */}
        {calculationResults && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">碳排放计算结果</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{calculationResults.labor}</div>
                <div className="text-sm text-gray-600">人工 (kg CO₂e)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">{calculationResults.machinery}</div>
                <div className="text-sm text-gray-600">机械 (kg CO₂e)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{calculationResults.materials}</div>
                <div className="text-sm text-gray-600">材料 (kg CO₂e)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{calculationResults.energy}</div>
                <div className="text-sm text-gray-600">能源 (kg CO₂e)</div>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-300">
              <div className="text-3xl font-bold text-red-600">{calculationResults.total}</div>
              <div className="text-lg text-gray-600">总碳排放 (kg CO₂e)</div>
            </div>
            <div className="mt-4 text-center">
              <Button onClick={() => onNext("report")}>
                生成实验报告
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 