import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Info, Truck, Hammer, Zap, Package, ChevronDown, ChevronRight, Plus, Trash2, Trees } from "lucide-react"
import { CarbonCalculationData, CalculationResults, ExperimentStep, CarbonEmissionItem, presetEmissionFactors, EmissionScope, PresetEmissionFactor } from "./types"
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
    transport: false,
    materials: false,
    energy: false,
    temporary: false,
    waste: false,
    carbonSink: false
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
      unit: "t",
      factor: 0,
      emission: 0,
      scope: "范围一",
      transportWeight: 0,
      transportDistance: 0,
      transportType: "",
      diesel: 0,
      electricity: 0,
      shifts: 0,
      workdays: 0
    }

    // 根据类别设置不同的初始值
    switch (category) {
      case "energy":
        newItem.factor = 249.085
        newItem.scope = "范围一"
        break
      case "labor":
        newItem.factor = 2.09
        newItem.scope = "范围三"
        break
      case "temporary":
        newItem.factor = 0.5810
        newItem.scope = "范围二"
        break
      case "transport":
        newItem.factor = 0.078
        newItem.transportType = "重型柴油货车运输(载重30t)"
        break
      case "carbonSink":
        newItem.consumption = 0
        newItem.unit = "m2"
        newItem.factor = 3.4127
        newItem.scope = "范围一"
        break
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
          switch (category) {
            case "transport":
              const weight = updatedItem.transportWeight || 0
              const distance = updatedItem.transportDistance || 0
              const factor = updatedItem.factor || 0
              updatedItem.emission = Number((weight * distance * factor).toFixed(2))
              break
            case "energy":
              const shifts = updatedItem.shifts || 0
              const energyFactor = updatedItem.factor || 0
              updatedItem.emission = Number((shifts * energyFactor).toFixed(2))
              break
            case "labor":
              const workdays = updatedItem.workdays || 0
              const laborFactor = updatedItem.factor || 0
              updatedItem.emission = Number((workdays * laborFactor).toFixed(2))
              break
            case "temporary":
              const consumption = updatedItem.consumption || 0
              const tempFactor = updatedItem.factor || 0
              updatedItem.emission = Number((consumption * tempFactor).toFixed(2))
              break
            default:
          if (field === "consumption" || field === "factor") {
            updatedItem.emission = Number((updatedItem.consumption * updatedItem.factor).toFixed(2))
              }
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
    const preset = presetEmissionFactors[category].find(p => p.category === presetCategory) as PresetEmissionFactor
    if (preset) {
      updateItem(category, itemId, "category", preset.category)
      updateItem(category, itemId, "unit", preset.unit)
      updateItem(category, itemId, "factor", preset.factor)
      updateItem(category, itemId, "scope", preset.scope)
      if (category === "transport" && preset.transportType) {
        updateItem(category, itemId, "transportType", preset.transportType)
      }
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
          分别计算材料生产阶段、材料运输阶段、施工建设阶段、竣工交付阶段四个方面的碳排放，以及碳汇减碳量
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 材料生产阶段碳排放 */}
        <Collapsible
          open={openSections.materials}
          onOpenChange={() => toggleSection("materials")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Package className="w-5 h-5 mr-3" />
              <span className="text-lg font-bold">材料生产阶段产生的碳排放</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.materials ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="space-y-4">
              {/* 材料生产碳排放计算 */}
              <h4 className="text-md font-medium">材料生产碳排放计算</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">材料名称</th>
                      <th className="p-2 border">材料消耗量</th>
                      <th className="p-2 border">单位</th>
                      <th className="p-2 border">材料碳排放因子</th>
                      <th className="p-2 border">单位</th>
                      <th className="p-2 border">碳排放量(kg CO2)</th>
                      <th className="p-2 border">排放范围</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.materials.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.materials.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => updateItem("materials", item.id, "category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择材料" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="C25混凝土">C25混凝土</SelectItem>
                                <SelectItem value="C30混凝土">C30混凝土</SelectItem>
                                <SelectItem value="钢筋">钢筋</SelectItem>
                                <SelectItem value="沥青">沥青</SelectItem>
                                <SelectItem value="碎石">碎石</SelectItem>
                                <SelectItem value="水泥">水泥</SelectItem>
                                <SelectItem value="砂石">砂石</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.consumption}
                              onChange={(e) => updateItem("materials", item.id, "consumption", parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.unit}
                              onValueChange={(value) => updateItem("materials", item.id, "unit", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择单位" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m3">m3</SelectItem>
                                <SelectItem value="kg">kg</SelectItem>
                                <SelectItem value="t">t</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => updateItem("materials", item.id, "factor", parseFloat(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择因子" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="255">255</SelectItem>
                                <SelectItem value="350">350</SelectItem>
                                <SelectItem value="2100">2100</SelectItem>
                                <SelectItem value="450">450</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="820">820</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.unit}
                              onValueChange={(value) => updateItem("materials", item.id, "unit", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择单位" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg CO2/m3">kg CO2/m3</SelectItem>
                                <SelectItem value="kg CO2/kg">kg CO2/kg</SelectItem>
                                <SelectItem value="kg CO2/t">kg CO2/t</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.scope}
                              onValueChange={(value) => updateItem("materials", item.id, "scope", value)}
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
                          </td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("materials", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("materials")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 材料运输阶段碳排放 */}
        <Collapsible
          open={openSections.transport}
          onOpenChange={() => toggleSection("transport")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-3" />
              <span className="text-lg font-bold">材料运输阶段产生的碳排放</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.transport ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="space-y-4">
              {/* 材料运输碳排放计算 */}
              <h4 className="text-md font-medium">材料运输碳排放计算</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">材料名称</th>
                      <th className="p-2 border">材料重量（t）</th>
                      <th className="p-2 border">平均运输距离（km）</th>
                      <th className="p-2 border">运输汽车类型</th>
                      <th className="p-2 border">运输碳排放因子（kgCO₂/t·km）</th>
                      <th className="p-2 border">碳排放量（kg CO₂）</th>
                      <th className="p-2 border">排放范围</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.transport.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.transport.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => {
                                const preset = presetEmissionFactors.transport.find(p => p.category === value)
                                if (preset) {
                                  const newData = {
                                    ...carbonData,
                                    transport: carbonData.transport.map(t => {
                                      if (t.id === item.id) {
                                        return {
                                          ...t,
                                          category: preset.category,
                                          transportType: preset.transportType || "",
                                          factor: preset.factor,
                                          scope: preset.scope
                                        }
                                      }
                                      return t
                                    })
                                  }
                                  onDataUpdate(newData)
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择材料" />
                              </SelectTrigger>
                              <SelectContent>
                                {presetEmissionFactors.transport.map((preset) => (
                                  <SelectItem key={preset.category} value={preset.category}>
                                    {preset.category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.transportWeight || 0}
                              onChange={(e) => {
                                const weight = parseFloat(e.target.value) || 0
                                const newData = {
                                  ...carbonData,
                                  transport: carbonData.transport.map(t => {
                                    if (t.id === item.id) {
                                      const distance = t.transportDistance || 0
                                      const factor = t.factor || 0
                                      return {
                                        ...t,
                                        transportWeight: weight,
                                        emission: Number((weight * distance * factor).toFixed(2))
                                      }
                                    }
                                    return t
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            />
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.transportDistance || 0}
                              onChange={(e) => {
                                const distance = parseFloat(e.target.value) || 0
                                const newData = {
                                  ...carbonData,
                                  transport: carbonData.transport.map(t => {
                                    if (t.id === item.id) {
                                      const weight = t.transportWeight || 0
                                      const factor = t.factor || 0
                                      return {
                                        ...t,
                                        transportDistance: distance,
                                        emission: Number((weight * distance * factor).toFixed(2))
                                      }
                                    }
                                    return t
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.transportType || ""}
                              onValueChange={(value) => updateItem("transport", item.id, "transportType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择运输类型" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="重型柴油货车运输(载重30t)">重型柴油货车运输(载重30t)</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => {
                                const factor = parseFloat(value)
                                updateItem("transport", item.id, "factor", factor)
                                // 自动计算排放量
                                const weight = item.transportWeight || 0
                                const distance = item.transportDistance || 0
                                updateItem("transport", item.id, "emission", Number((weight * distance * factor).toFixed(2)))
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择因子" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.078">0.078</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.scope}
                              onValueChange={(value) => updateItem("transport", item.id, "scope", value)}
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
                          </td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("transport", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("transport")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 施工建设阶段碳排放 */}
        <Collapsible
          open={openSections.energy}
          onOpenChange={() => toggleSection("energy")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Hammer className="w-5 h-5 mr-3" />
              <span className="text-lg font-bold">施工建设阶段产生的碳排放</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.energy ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            {/* 施工机械能源消耗碳排放计算 */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">施工机械能源消耗碳排放计算</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">机械名称</th>
                      <th className="p-2 border">柴油(kg)</th>
                      <th className="p-2 border">电(kW·h)</th>
                      <th className="p-2 border">碳排放系数（kg CO2/台班）</th>
                      <th className="p-2 border">台班量</th>
                      <th className="p-2 border">碳排放量</th>
                      <th className="p-2 border">排放范围</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.energy.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.energy.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => updateItem("energy", item.id, "category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择机械" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="斗容量 1.0m3 履带式单斗挖掘机">斗容量 1.0m3 履带式单斗挖掘机</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.diesel || 0}
                              onChange={(e) => updateItem("energy", item.id, "diesel", parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.electricity || 0}
                              onChange={(e) => updateItem("energy", item.id, "electricity", parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => updateItem("energy", item.id, "factor", parseFloat(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择因子" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="249.085">249.085</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.shifts || 0}
                              onChange={(e) => updateItem("energy", item.id, "shifts", parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.scope}
                              onValueChange={(value) => updateItem("energy", item.id, "scope", value)}
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
                          </td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("energy", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("energy")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>

            {/* 人员活动碳排放计算 */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">人员活动碳排放计算</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">劳动者类型</th>
                      <th className="p-2 border">累计有效工作日</th>
                      <th className="p-2 border">生活碳排放因子（kg/人·天）</th>
                      <th className="p-2 border">碳排放量</th>
                      <th className="p-2 border">排放范围</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.labor.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.labor.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => updateItem("labor", item.id, "category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择类型" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="管理人员">管理人员</SelectItem>
                                <SelectItem value="机械操作手">机械操作手</SelectItem>
                                <SelectItem value="工人">工人</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.workdays || 0}
                              onChange={(e) => updateItem("labor", item.id, "workdays", parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => updateItem("labor", item.id, "factor", parseFloat(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择因子" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2.09">2.09</SelectItem>
                                <SelectItem value="2.42">2.42</SelectItem>
                                <SelectItem value="2.83">2.83</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.scope}
                              onValueChange={(value) => updateItem("labor", item.id, "scope", value)}
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
                          </td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("labor", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("labor")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>

            {/* 临时用能碳排放计算 */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">临时用能碳排放计算</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">类型</th>
                      <th className="p-2 border">用电量/kWh</th>
                      <th className="p-2 border">电网排放因子（t/（MW·h））</th>
                      <th className="p-2 border">碳排量（kg）</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.temporary.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.temporary.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => updateItem("temporary", item.id, "category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择类型" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="生活用能">生活用能</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.consumption || 0}
                              onChange={(e) => updateItem("temporary", item.id, "consumption", parseFloat(e.target.value) || 0)}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => {
                                const factor = parseFloat(value)
                                const newData = {
                                  ...carbonData,
                                  temporary: carbonData.temporary.map(t => {
                                    if (t.id === item.id) {
                                      const consumption = t.consumption || 0
                                      return {
                                        ...t,
                                        factor: factor,
                                        emission: Number((consumption * factor).toFixed(2))
                                      }
                                    }
                                    return t
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择因子" />
                              </SelectTrigger>
                              <SelectContent>
                                {presetEmissionFactors.temporary.map((preset) => (
                                  <SelectItem key={preset.category} value={preset.factor.toString()}>
                                    {preset.factor}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("temporary", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("temporary")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 竣工交付阶段碳排放 */}
        <Collapsible
          open={openSections.waste}
          onOpenChange={() => toggleSection("waste")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-3" />
              <span className="text-lg font-bold">竣工交付阶段产生的碳排放</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.waste ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            {/* 废弃物运输碳排放计算 */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">废弃物运输碳排放计算</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">废弃物类型</th>
                      <th className="p-2 border">废弃物重量(t)</th>
                      <th className="p-2 border">运输距离（KM）</th>
                      <th className="p-2 border">运输汽车类型</th>
                      <th className="p-2 border">运输碳排放因子（kgCO₂/t·km）</th>
                      <th className="p-2 border">碳排放量（kg CO₂）</th>
                      <th className="p-2 border">排放范围</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.waste.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.waste.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => {
                                const preset = presetEmissionFactors.waste.find(p => p.category === value)
                                if (preset) {
                                  const newData = {
                                    ...carbonData,
                                    waste: carbonData.waste.map(w => {
                                      if (w.id === item.id) {
                                        return {
                                          ...w,
                                          category: preset.category,
                                          transportType: preset.transportType || "",
                                          factor: preset.factor,
                                          scope: preset.scope
                                        }
                                      }
                                      return w
                                    })
                                  }
                                  onDataUpdate(newData)
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择废弃物类型" />
                              </SelectTrigger>
                              <SelectContent>
                                {presetEmissionFactors.waste.map((preset) => (
                                  <SelectItem key={preset.category} value={preset.category}>
                                    {preset.category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.transportWeight || 0}
                              onChange={(e) => {
                                const weight = parseFloat(e.target.value) || 0
                                const newData = {
                                  ...carbonData,
                                  waste: carbonData.waste.map(w => {
                                    if (w.id === item.id) {
                                      const distance = w.transportDistance || 0
                                      const factor = w.factor || 0
                                      return {
                                        ...w,
                                        transportWeight: weight,
                                        emission: Number((weight * distance * factor).toFixed(2))
                                      }
                                    }
                                    return w
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            />
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.transportDistance || 0}
                              onChange={(e) => {
                                const distance = parseFloat(e.target.value) || 0
                                const newData = {
                                  ...carbonData,
                                  waste: carbonData.waste.map(w => {
                                    if (w.id === item.id) {
                                      const weight = w.transportWeight || 0
                                      const factor = w.factor || 0
                                      return {
                                        ...w,
                                        transportDistance: distance,
                                        emission: Number((weight * distance * factor).toFixed(2))
                                      }
                                    }
                                    return w
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.transportType || ""}
                              onValueChange={(value) => updateItem("waste", item.id, "transportType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择运输类型" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="重型柴油货车运输(载重30t)">重型柴油货车运输(载重30t)</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => {
                                const factor = parseFloat(value)
                                const newData = {
                                  ...carbonData,
                                  waste: carbonData.waste.map(w => {
                                    if (w.id === item.id) {
                                      const weight = w.transportWeight || 0
                                      const distance = w.transportDistance || 0
                                      return {
                                        ...w,
                                        factor: factor,
                                        emission: Number((weight * distance * factor).toFixed(2))
                                      }
                                    }
                                    return w
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择因子" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.078">0.078</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.scope}
                              onValueChange={(value) => updateItem("waste", item.id, "scope", value)}
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
                          </td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("waste", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("waste")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 碳汇减碳量 */}
        <Collapsible
          open={openSections.carbonSink}
          onOpenChange={() => toggleSection("carbonSink")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Trees className="w-5 h-5 mr-3" />
              <span className="text-lg font-bold">碳汇减碳量</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.carbonSink ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">序号</th>
                      <th className="p-2 border">植物种类</th>
                      <th className="p-2 border">栽种量</th>
                      <th className="p-2 border">单位</th>
                      <th className="p-2 border">固碳系数</th>
                      <th className="p-2 border">单位</th>
                      <th className="p-2 border">年固碳量（kg）</th>
                      <th className="p-2 border">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.carbonSink.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-4 text-center text-gray-500">
                          暂无数据，点击下方按钮添加条目
                        </td>
                      </tr>
                    ) : (
                      carbonData.carbonSink.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border">
                            <Select
                              value={item.category}
                              onValueChange={(value) => {
                                const preset = presetEmissionFactors.carbonSink.find(p => p.category === value)
                                if (preset) {
                                  const newData = {
                                    ...carbonData,
                                    carbonSink: carbonData.carbonSink.map(c => {
                                      if (c.id === item.id) {
                                        return {
                                          ...c,
                                          category: preset.category,
                                          unit: preset.unit,
                                          factor: preset.factor,
                                          scope: preset.scope
                                        }
                                      }
                                      return c
                                    })
                                  }
                                  onDataUpdate(newData)
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择植物种类" />
                              </SelectTrigger>
                              <SelectContent>
                                {presetEmissionFactors.carbonSink.map((preset) => (
                                  <SelectItem key={preset.category} value={preset.category}>
                                    {preset.category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Input
                              type="number"
                              value={item.consumption || 0}
                              min={0}
                              onChange={(e) => {
                                const consumption = parseFloat(e.target.value) || 0
                                const newData = {
                                  ...carbonData,
                                  carbonSink: carbonData.carbonSink.map(c => {
                                    if (c.id === item.id) {
                                      const factor = c.factor || 0
                                      return {
                                        ...c,
                                        consumption: consumption,
                                        emission: Number((consumption * factor).toFixed(2))
                                      }
                                    }
                                    return c
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            />
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.unit}
                              onValueChange={(value) => updateItem("carbonSink", item.id, "unit", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择单位" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m2">m2</SelectItem>
                                <SelectItem value="株">株</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.factor.toString()}
                              onValueChange={(value) => {
                                const factor = parseFloat(value)
                                const newData = {
                                  ...carbonData,
                                  carbonSink: carbonData.carbonSink.map(c => {
                                    if (c.id === item.id) {
                                      const consumption = c.consumption || 0
                                      return {
                                        ...c,
                                        factor: factor,
                                        emission: Number((consumption * factor).toFixed(2))
                                      }
                                    }
                                    return c
                                  })
                                }
                                onDataUpdate(newData)
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择系数" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3.4127">3.4127</SelectItem>
                                <SelectItem value="344.076">344.076</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border">
                            <Select
                              value={item.unit === "m2" ? "kg/m2" : "kg/a"}
                              onValueChange={(value) => updateItem("carbonSink", item.id, "unit", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择单位" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg/m2">kg/m2</SelectItem>
                                <SelectItem value="kg/a">kg/a</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2 border text-center">{item.emission}</td>
                          <td className="p-2 border text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("carbonSink", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => addItem("carbonSink")}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加条目
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-center mt-6">
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
                  <div className="text-2xl font-bold text-sky-500">{calculationResults.materials}</div>
                  <div className="text-sm text-gray-600">材料生产 (kg CO₂e)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-amber-700">{calculationResults.transport}</div>
                  <div className="text-sm text-gray-600">材料运输 (kg CO₂e)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{calculationResults.construction}</div>
                  <div className="text-sm text-gray-600">施工建设 (kg CO₂e)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{calculationResults.completion}</div>
                  <div className="text-sm text-gray-600">竣工交付 (kg CO₂e)</div>
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

            {/* 碳汇减碳量 */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 text-gray-700">碳汇减碳计算结果</h4>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">{calculationResults.carbonSink || 0}</div>
                <div className="text-sm text-gray-600">碳汇减碳总量 (kg CO₂e)</div>
              </div>
            </div>

            {/* 总计 */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 text-gray-700">总碳排放计算结果</h4>
            <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-300">
                <div className="text-2xl font-bold text-red-600">{calculationResults.total}</div>
                <div className="text-sm text-gray-600">总碳排放 (kg CO₂e)</div>
                <div className="text-sm text-gray-500 mt-1">已扣除碳汇减碳量</div>
            </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 