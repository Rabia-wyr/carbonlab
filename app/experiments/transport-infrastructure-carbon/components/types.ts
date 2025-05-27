// 实验步骤类型
export type ExperimentStep = "intro" | "inventory" | "calculation" | "report"

// 工程内容清单项目类型
export interface InventoryItem {
  id: string
  name: string
  unit: string
  quantity: number
  description: string
}

// 碳核算数据类型
export interface CarbonCalculationData {
  labor: {
    workers: number
    workDays: number
    transportDistance: number
  }
  machinery: {
    excavators: number
    trucks: number
    cranes: number
    operatingHours: number
  }
  materials: {
    concrete: number
    steel: number
    asphalt: number
    gravel: number
  }
  energy: {
    electricity: number
    diesel: number
    gasoline: number
  }
}

// 计算结果类型
export interface CalculationResults {
  labor: number
  machinery: number
  materials: number
  energy: number
  total: number
}

// 碳排放因子
export const emissionFactors = {
  labor: {
    transport: 0.12, // kg CO2e/km
    accommodation: 2.5 // kg CO2e/person/day
  },
  machinery: {
    excavator: 25.0, // kg CO2e/hour
    truck: 2.8, // kg CO2e/km
    crane: 18.0 // kg CO2e/hour
  },
  materials: {
    concrete: 0.35, // kg CO2e/kg
    steel: 2.1, // kg CO2e/kg
    asphalt: 0.45, // kg CO2e/kg
    gravel: 0.008 // kg CO2e/kg
  },
  energy: {
    electricity: 0.6, // kg CO2e/kWh
    diesel: 2.7, // kg CO2e/L
    gasoline: 2.3 // kg CO2e/L
  }
} 