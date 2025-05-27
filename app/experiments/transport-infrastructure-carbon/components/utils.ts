import { CarbonCalculationData, CalculationResults, emissionFactors } from "./types"

// 计算碳排放
export function calculateEmissions(carbonData: CarbonCalculationData): CalculationResults {
  // 人工碳排放
  const laborEmissions = 
    carbonData.labor.workers * carbonData.labor.workDays * emissionFactors.labor.accommodation +
    carbonData.labor.workers * carbonData.labor.transportDistance * emissionFactors.labor.transport

  // 机械使用碳排放
  const machineryEmissions = 
    carbonData.machinery.excavators * carbonData.machinery.operatingHours * emissionFactors.machinery.excavator +
    carbonData.machinery.trucks * 50 * emissionFactors.machinery.truck + // 假设每台卡车每天行驶50km
    carbonData.machinery.cranes * carbonData.machinery.operatingHours * emissionFactors.machinery.crane

  // 材料碳排放
  const materialsEmissions = 
    carbonData.materials.concrete * emissionFactors.materials.concrete +
    carbonData.materials.steel * emissionFactors.materials.steel +
    carbonData.materials.asphalt * emissionFactors.materials.asphalt +
    carbonData.materials.gravel * emissionFactors.materials.gravel

  // 能源碳排放
  const energyEmissions = 
    carbonData.energy.electricity * emissionFactors.energy.electricity +
    carbonData.energy.diesel * emissionFactors.energy.diesel +
    carbonData.energy.gasoline * emissionFactors.energy.gasoline

  const total = laborEmissions + machineryEmissions + materialsEmissions + energyEmissions

  return {
    labor: Math.round(laborEmissions),
    machinery: Math.round(machineryEmissions),
    materials: Math.round(materialsEmissions),
    energy: Math.round(energyEmissions),
    total: Math.round(total)
  }
} 