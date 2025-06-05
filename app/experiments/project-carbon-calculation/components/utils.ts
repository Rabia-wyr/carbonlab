import { CarbonCalculationData, CalculationResults } from "./types"

// 计算碳排放
export function calculateEmissions(carbonData: CarbonCalculationData): CalculationResults {
  // 材料生产碳排放
  const materialsEmissions = carbonData.materials.reduce((sum, item) => sum + item.emission, 0)

  // 材料运输碳排放
  const transportEmissions = carbonData.transport.reduce((sum, item) => sum + item.emission, 0)

  // 施工建设碳排放（包括机械能源消耗和人员活动）
  const constructionEmissions = carbonData.energy.reduce((sum, item) => sum + item.emission, 0) + 
                               carbonData.labor.reduce((sum, item) => sum + item.emission, 0) +
                               carbonData.temporary.reduce((sum, item) => sum + item.emission, 0)

  // 竣工交付碳排放（废弃物运输）
  const completionEmissions = carbonData.waste.reduce((sum, item) => sum + item.emission, 0)

  // 碳汇减碳量
  const carbonSinkEmissions = carbonData.carbonSink.reduce((sum, item) => sum + item.emission, 0)

  // 按范围计算（不包括碳汇减碳量）
  const allItems = [
    ...carbonData.labor,
    ...carbonData.transport,
    ...carbonData.materials,
    ...carbonData.energy,
    ...carbonData.temporary,
    ...carbonData.waste
  ]

  const scope1Emissions = allItems.filter(item => item.scope === "范围一").reduce((sum, item) => sum + item.emission, 0)
  const scope2Emissions = allItems.filter(item => item.scope === "范围二").reduce((sum, item) => sum + item.emission, 0)
  const scope3Emissions = allItems.filter(item => item.scope === "范围三").reduce((sum, item) => sum + item.emission, 0)

  // 碳排放计算结果（负数）
  const emissionsTotal = -(materialsEmissions + transportEmissions + constructionEmissions + completionEmissions)
  
  // 总碳排放量 = 碳排放计算结果（负数）+ 碳汇减碳计算结果（正数）
  const total = emissionsTotal + carbonSinkEmissions

  return {
    materials: Math.round(materialsEmissions),
    transport: Math.round(transportEmissions),
    construction: Math.round(constructionEmissions),
    completion: Math.round(completionEmissions),
    carbonSink: Math.round(carbonSinkEmissions),
    total: Math.round(total),
    scope1: Math.round(scope1Emissions),
    scope2: Math.round(scope2Emissions),
    scope3: Math.round(scope3Emissions)
  }
} 