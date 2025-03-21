import { ReactNode } from "react"

// 实验难度枚举
export type Difficulty = "基础" | "中级" | "高级"
// 实验状态枚举
export type Status = "开发中" | "开发中" | "维护中"

// 实验类型
export type Experiment = {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  status?: Status
  icon?: string
  route?: string
  svg?: ReactNode
}

// 模块类型
export type Module = {
  id: string
  title: string
  description: string
  icon?: string
  color?: string
  gradient?: string
  subtitle?: string
  headerSvg?: ReactNode
  experiments: Experiment[]
}

// 示例数据结构
export const modules: Module[] = [
  {
    id: "carbon-monitor",
    title: "碳监测",
    description: "实时数据采集与排放源识别技术实训",
    icon: "chart-line",
    color: "emerald",
    gradient: "from-green-600 to-emerald-700",
    experiments: [
      {
        id: "real-time-monitoring",
        title: "实时监测系统",
        description: "通过传感器网络实时监测碳排放数据",
        difficulty: "中级",
        status: "开发中",
        icon: "sensor",
        route: "/experiments/real-time-monitoring",
      },
      {
        id: "emission-source",
        title: "排放源识别",
        description: "使用机器学习识别和分类碳排放源",
        difficulty: "高级",
        status: "开发中",
        icon: "microscope",
        route: "/experiments/emission-source",
      },
    ],
  },
  {
    id: "carbon-calculate",
    title: "碳核算",
    description: "全生命周期碳足迹计算与核查方法",
    icon: "calculator",
    color: "blue",
    gradient: "from-blue-600 to-indigo-700",
    experiments: [
      {
        id: "personal-carbon-footprint",
        title: "个人碳足迹计算器",
        description: "计算并分析个人日常生活中的碳排放量",
        difficulty: "基础",
        status: "开发中",
        icon: "user",
        route: "/experiments/personal-carbon-footprint",
      },
      {
        id: "enterprise-carbon-footprint",
        title: "企业碳足迹分析",
        description: "企业生产经营活动的碳排放计算与分析",
        difficulty: "高级",
        status: "开发中",
        icon: "building",
        route: "/experiments/enterprise-carbon-footprint",
      },
    ],
  },
  {
    id: "carbon-trading",
    title: "碳交易",
    description: "碳排放权交易市场机制与策略模拟",
    icon: "exchange-alt",
    color: "purple",
    gradient: "from-purple-600 to-violet-700",
    experiments: [
      {
        id: "carbon-market-simulation",
        title: "碳市场模拟交易",
        description: "模拟碳排放权交易市场的运作机制",
        difficulty: "中级",
        status: "开发中",
        icon: "chart-line",
        route: "/experiments/carbon-market-simulation",
      },
      {
        id: "trading-strategy",
        title: "交易策略设计",
        description: "设计和优化碳交易策略",
        difficulty: "高级",
        status: "开发中",
        icon: "chess",
        route: "/experiments/trading-strategy",
      },
    ],
  },
  {
    id: "carbon-neutral",
    title: "碳中和",
    description: "碳汇计量与碳中和路径规划实践",
    icon: "leaf",
    color: "orange",
    gradient: "from-orange-600 to-amber-700",
    experiments: [
      {
        id: "carbon-sink-measurement",
        title: "碳汇计量方法",
        description: "森林、海洋等自然碳汇的计量方法",
        difficulty: "中级",
        status: "开发中",
        icon: "tree",
        route: "/experiments/carbon-sink-measurement",
      },
      {
        id: "neutral-path-planning",
        title: "碳中和路径规划",
        description: "区域碳中和实现路径的规划与优化",
        difficulty: "高级",
        status: "开发中",
        icon: "route",
        route: "/experiments/neutral-path-planning",
      },
    ],
  },
] 