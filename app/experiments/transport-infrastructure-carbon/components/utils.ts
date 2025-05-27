import { CarbonCalculationData, CalculationResults } from "./types"

// 计算碳排放
export function calculateEmissions(carbonData: CarbonCalculationData): CalculationResults {
  // 人工碳排放
  const laborEmissions = carbonData.labor.reduce((sum, item) => sum + item.emission, 0)

  // 机械使用碳排放
  const machineryEmissions = carbonData.machinery.reduce((sum, item) => sum + item.emission, 0)

  // 材料碳排放
  const materialsEmissions = carbonData.materials.reduce((sum, item) => sum + item.emission, 0)

  // 能源碳排放
  const energyEmissions = carbonData.energy.reduce((sum, item) => sum + item.emission, 0)

  // 按范围计算
  const allItems = [
    ...carbonData.labor,
    ...carbonData.machinery,
    ...carbonData.materials,
    ...carbonData.energy
  ]

  const scope1Emissions = allItems.filter(item => item.scope === "范围一").reduce((sum, item) => sum + item.emission, 0)
  const scope2Emissions = allItems.filter(item => item.scope === "范围二").reduce((sum, item) => sum + item.emission, 0)
  const scope3Emissions = allItems.filter(item => item.scope === "范围三").reduce((sum, item) => sum + item.emission, 0)

  const total = laborEmissions + machineryEmissions + materialsEmissions + energyEmissions

  return {
    labor: Math.round(laborEmissions),
    machinery: Math.round(machineryEmissions),
    materials: Math.round(materialsEmissions),
    energy: Math.round(energyEmissions),
    total: Math.round(total),
    scope1: Math.round(scope1Emissions),
    scope2: Math.round(scope2Emissions),
    scope3: Math.round(scope3Emissions)
  }
} 