// 实验步骤类型
export type ExperimentStep = "intro" | "inventory" | "calculation" | "report"

// 工程清单内容项目类型
export interface InventoryItem {
  id: string
  name: string
  unit: string
  quantity: number
  description: string
}

// 碳排放范围类型
export type EmissionScope = "范围一" | "范围二" | "范围三"

// 碳排放条目类型
export interface CarbonEmissionItem {
  id: string
  category: string // 品种名称
  consumption: number // 消耗量
  unit: string // 单位
  factor: number // 排放因子
  emission: number // 排放量（自动计算）
  scope: EmissionScope // 排放范围
  transportWeight?: number // 运输重量（吨）
  transportDistance?: number // 运输距离（公里）
  transportType?: string // 运输类型
  diesel?: number
  electricity?: number
  shifts?: number
  workdays?: number
}

// 碳核算数据类型
export interface CarbonCalculationData {
  materials: CarbonEmissionItem[]
  transport: CarbonEmissionItem[]
  energy: CarbonEmissionItem[]
  labor: CarbonEmissionItem[]
  temporary: CarbonEmissionItem[]
  waste: CarbonEmissionItem[]
  carbonSink: CarbonEmissionItem[] // 新增碳汇减碳量
}

// 计算结果类型
export interface CalculationResults {
  materials: number
  transport: number
  construction: number
  completion: number
  carbonSink: number
  total: number
  // 按范围分类的结果
  scope1: number
  scope2: number
  scope3: number
}

// 预设的碳排放因子选项
export const presetEmissionFactors = {
  materials: [
    { category: "C25混凝土", unit: "m3", factor: 255, scope: "范围一" as EmissionScope },
    { category: "C30混凝土", unit: "m3", factor: 350, scope: "范围一" as EmissionScope },
    { category: "钢筋", unit: "kg", factor: 2100, scope: "范围一" as EmissionScope },
    { category: "沥青", unit: "kg", factor: 450, scope: "范围一" as EmissionScope },
    { category: "碎石", unit: "kg", factor: 8, scope: "范围一" as EmissionScope },
    { category: "水泥", unit: "kg", factor: 820, scope: "范围一" as EmissionScope },
    { category: "砂石", unit: "kg", factor: 5, scope: "范围一" as EmissionScope }
  ],
  transport: [
    { category: "C25混凝土", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" },
    { category: "C30混凝土", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" },
    { category: "钢筋", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" },
    { category: "沥青", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" },
    { category: "碎石", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" },
    { category: "水泥", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" },
    { category: "砂石", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" }
  ],
  energy: [
    { category: "斗容量 1.0m3 履带式单斗挖掘机", unit: "台班", factor: 249.085, scope: "范围一" as EmissionScope }
  ],
  labor: [
    { category: "管理人员", unit: "人·天", factor: 2.09, scope: "范围三" as EmissionScope },
    { category: "机械操作手", unit: "人·天", factor: 2.42, scope: "范围三" as EmissionScope },
    { category: "工人", unit: "人·天", factor: 2.83, scope: "范围三" as EmissionScope }
  ],
  temporary: [
    { category: "生活用能", unit: "kWh", factor: 0.5810, scope: "范围二" as EmissionScope }
  ],
  waste: [
    { category: "弃土", unit: "t", factor: 0.078, scope: "范围一" as EmissionScope, transportType: "重型柴油货车运输(载重30t)" }
  ],
  carbonSink: [
    { category: "植被", unit: "m2", factor: 3.4127, scope: "范围一" as EmissionScope },
    { category: "香樟", unit: "株", factor: 344.076, scope: "范围一" as EmissionScope }
  ]
} as const

// 预设碳排放因子类型
export type PresetEmissionFactor = {
  category: string
  unit: string
  factor: number
  scope: EmissionScope
  transportType?: string
} 