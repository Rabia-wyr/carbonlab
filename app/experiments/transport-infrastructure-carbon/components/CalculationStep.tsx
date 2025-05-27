import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Info, Truck, Hammer, Zap, Package, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react"
import { CarbonCalculationData, CalculationResults, ExperimentStep, CarbonEmissionItem, presetEmissionFactors, EmissionScope } from "./types"
import { useState } from "react"

interface CalculationStepProps {
  carbonData: CarbonCalculationData
  calculationResults: CalculationResults | null
  onDataUpdate: (newData: CarbonCalculationData) => void
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
  // 控制各个折叠面板的展开状态
  const [openSections, setOpenSections] = useState({
    labor: true,
    machinery: false,
    materials: false,
    energy: false
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // 添加新条目
  const addItem = (category: keyof CarbonCalculationData) => {
    const newItem: CarbonEmissionItem = {
      id: Date.now().toString(),
      category: "",
      consumption: 0,
      unit: "",
      factor: 0,
      emission: 0,
      scope: "范围一"
    }
    
    const newData = {
      ...carbonData,
      [category]: [...carbonData[category], newItem]
    }
    onDataUpdate(newData)
  }

  // 删除条目
  const removeItem = (category: keyof CarbonCalculationData, itemId: string) => {
    const newData = {
      ...carbonData,
      [category]: carbonData[category].filter(item => item.id !== itemId)
    }
    onDataUpdate(newData)
  }

  // 更新条目
  const updateItem = (category: keyof CarbonCalculationData, itemId: string, field: keyof CarbonEmissionItem, value: string | number) => {
    const newData = {
      ...carbonData,
      [category]: carbonData[category].map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value }
          // 自动计算排放量
          if (field === "consumption" || field === "factor") {
            updatedItem.emission = Number((updatedItem.consumption * updatedItem.factor).toFixed(2))
          }
          return updatedItem
        }
        return item
      })
    }
    onDataUpdate(newData)
  }

  // 从预设选项中选择
  const selectPreset = (category: keyof CarbonCalculationData, itemId: string, presetCategory: string) => {
    const preset = presetEmissionFactors[category].find(p => p.category === presetCategory)
    if (preset) {
      updateItem(category, itemId, "category", preset.category)
      updateItem(category, itemId, "unit", preset.unit)
      updateItem(category, itemId, "factor", preset.factor)
      updateItem(category, itemId, "scope", preset.scope)
    }
  }

  // 渲染条目列表
  const renderItemList = (category: keyof CarbonCalculationData, title: string, icon: React.ReactNode) => {
    const items = carbonData[category]
    const isOpen = openSections[category]

    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(category)}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center">
              {icon}
              <span className="text-lg font-semibold">{title}</span>
              <span className="ml-2 text-sm text-gray-500">({items.length} 项)</span>
            </div>
            {isOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 p-4 border rounded-lg bg-gray-50">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>暂无数据，点击下方按钮添加条目</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="p-4 bg-white border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
                      <div>
                        <Label>碳排放品种</Label>
                        <Select
                          value={item.category}
                          onValueChange={(value) => selectPreset(category, item.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择或输入品种" />
                          </SelectTrigger>
                          <SelectContent>
                            {presetEmissionFactors[category].map((preset) => (
                              <SelectItem key={preset.category} value={preset.category}>
                                {preset.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          className="mt-2"
                          placeholder="或手动输入"
                          value={item.category}
                          onChange={(e) => updateItem(category, item.id, "category", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>消耗量</Label>
                        <Input
                          type="number"
                          value={item.consumption}
                          onChange={(e) => updateItem(category, item.id, "consumption", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>单位</Label>
                        <Input
                          value={item.unit}
                          onChange={(e) => updateItem(category, item.id, "unit", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>排放因子</Label>
                        <Input
                          type="number"
                          step="0.001"
                          value={item.factor}
                          onChange={(e) => updateItem(category, item.id, "factor", parseFloat(e.target.value) || 0)}
                        />
                        <div className="text-xs text-gray-500 mt-1">kg CO₂e/单位</div>
                      </div>
                      <div>
                        <Label>排放量</Label>
                        <Input
                          type="number"
                          value={item.emission}
                          readOnly
                          className="bg-gray-100"
                        />
                        <div className="text-xs text-gray-500 mt-1">kg CO₂e</div>
                      </div>
                      <div>
                        <Label>排放范围 <span className="text-red-500">*</span></Label>
                        <Select
                          value={item.scope}
                          onValueChange={(value: EmissionScope) => updateItem(category, item.id, "scope", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择范围" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="范围一">范围一</SelectItem>
                            <SelectItem value="范围二">范围二</SelectItem>
                            <SelectItem value="范围三">范围三</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="text-xs text-gray-500 mt-1">必选项</div>
                      </div>
                      <div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(category, item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={() => addItem(category)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              添加条目
            </Button>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                可以从预设选项中选择常见的碳排放品种，或手动输入自定义品种。排放量将根据消耗量和排放因子自动计算。
                <br />
                <strong>排放范围说明：</strong>范围一（直接排放）、范围二（间接排放-电力）、范围三（其他间接排放）。
              </AlertDescription>
            </Alert>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

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
      <CardContent className="space-y-4">
        {/* 人工碳排放 */}
        {renderItemList("labor", "人工碳排放", <Truck className="w-5 h-5 mr-3" />)}

        {/* 机械使用碳排放 */}
        {renderItemList("machinery", "机械使用碳排放", <Hammer className="w-5 h-5 mr-3" />)}

        {/* 材料碳排放 */}
        {renderItemList("materials", "材料碳排放", <Package className="w-5 h-5 mr-3" />)}

        {/* 能源碳排放 */}
        {renderItemList("energy", "能源碳排放", <Zap className="w-5 h-5 mr-3" />)}

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
            
            {/* 按类别分类 */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-3 text-gray-700">按类别分类</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>

            {/* 按范围分类 */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-3 text-gray-700">按排放范围分类</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border-l-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600">{calculationResults.scope1}</div>
                  <div className="text-sm text-gray-600">范围一 (kg CO₂e)</div>
                  <div className="text-xs text-gray-500 mt-1">直接排放</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-l-4 border-yellow-500">
                  <div className="text-2xl font-bold text-yellow-600">{calculationResults.scope2}</div>
                  <div className="text-sm text-gray-600">范围二 (kg CO₂e)</div>
                  <div className="text-xs text-gray-500 mt-1">间接排放-电力</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-l-4 border-blue-500">
                  <div className="text-2xl font-bold text-blue-600">{calculationResults.scope3}</div>
                  <div className="text-sm text-gray-600">范围三 (kg CO₂e)</div>
                  <div className="text-xs text-gray-500 mt-1">其他间接排放</div>
                </div>
              </div>
            </div>

            {/* 总计 */}
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