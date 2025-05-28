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
}

// 碳核算数据类型
export interface CarbonCalculationData {
  labor: CarbonEmissionItem[]
  machinery: CarbonEmissionItem[]
  materials: CarbonEmissionItem[]
  energy: CarbonEmissionItem[]
}

// 计算结果类型
export interface CalculationResults {
  labor: number
  machinery: number
  materials: number
  energy: number
  total: number
  // 按范围分类的结果
  scope1: number
  scope2: number
  scope3: number
}

// 预设的碳排放因子选项
export const presetEmissionFactors = {
  labor: [
    { category: "人员通勤", unit: "公里", factor: 0.12, scope: "范围三" as EmissionScope },
    { category: "人员住宿", unit: "人·天", factor: 2.5, scope: "范围三" as EmissionScope },
    { category: "人员餐饮", unit: "人·天", factor: 1.8, scope: "范围三" as EmissionScope }
  ],
  machinery: [
    { category: "挖掘机", unit: "小时", factor: 25.0, scope: "范围一" as EmissionScope },
    { category: "运输卡车", unit: "公里", factor: 2.8, scope: "范围一" as EmissionScope },
    { category: "起重机", unit: "小时", factor: 18.0, scope: "范围一" as EmissionScope },
    { category: "压路机", unit: "小时", factor: 15.0, scope: "范围一" as EmissionScope },
    { category: "装载机", unit: "小时", factor: 20.0, scope: "范围一" as EmissionScope }
  ],
  materials: [
    { category: "混凝土", unit: "千克", factor: 0.35, scope: "范围三" as EmissionScope },
    { category: "钢材", unit: "千克", factor: 2.1, scope: "范围三" as EmissionScope },
    { category: "沥青", unit: "千克", factor: 0.45, scope: "范围三" as EmissionScope },
    { category: "碎石", unit: "千克", factor: 0.008, scope: "范围三" as EmissionScope },
    { category: "水泥", unit: "千克", factor: 0.82, scope: "范围三" as EmissionScope },
    { category: "砂石", unit: "千克", factor: 0.005, scope: "范围三" as EmissionScope }
  ],
  energy: [
    { category: "电力", unit: "千瓦时", factor: 0.6, scope: "范围二" as EmissionScope },
    { category: "柴油", unit: "升", factor: 2.7, scope: "范围一" as EmissionScope },
    { category: "汽油", unit: "升", factor: 2.3, scope: "范围一" as EmissionScope },
    { category: "天然气", unit: "立方米", factor: 2.0, scope: "范围一" as EmissionScope }
  ]
} 