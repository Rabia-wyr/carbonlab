import { ReactNode } from "react"

// 实验难度枚举
export type Difficulty = "基础" | "中级" | "高级"
// 实验状态枚举
export type Status = "已上线" | "开发中" | "维护中"

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
  module: string
}

// 课程类型
export type Course = {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  status: "draft" | "published" | "archived"
  icon: string
  route: string
  module: string
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
  experimentIds: string[]  // 改为存储实验ID列表而非完整实验对象
  courseIds: string[]  // 新增课程ID列表
}

// 所有实验的合并清单
export const experiments: Experiment[] = [
  // 碳中和预测
  {
    id: "global-carbon-neutral-prediction",
    title: "碳中和预测",
    description: "基于机器学习和大数据分析的全球碳中和路径预测与情景模拟",
    difficulty: "中级",
    status: "已上线",
    icon: "globe",
    route: "/experiments/global-carbon-neutral-prediction",
    module: "carbon-neutral"
  },
  {
    id: "carbon-monitoring-analysis",
    title: "碳监测与计量分析",
    description: "基于地理空间数据的碳排放分布可视化与动态监测分析",
    difficulty: "中级",
    status: "已上线",
    icon: "chart-area",
    route: "/experiments/carbon-monitoring-analysis",
    module: "carbon-monitor"
  },
  {
    id: "project-carbon-calculation",
    title: "项目碳精算实验",
    description: "基础设施建设项目的全生命周期碳排放精确核算与分析",
    difficulty: "中级",
    status: "已上线",
    icon: "calculator",
    route: "/experiments/project-carbon-calculation",
    module: "carbon-calculate"
  },
  // 产品碳足迹分析
  {
    id: "product-carbon-footprint",
    title: "产品碳足迹分析",
    description: "产品全生命周期碳足迹评估与环境影响分析",
    difficulty: "高级",
    status: "已上线",
    icon: "shoe-prints",
    route: "/experiments/product-carbon-footprint",
    module: "carbon-calculate"
  },
  // 碳交易模块实验
  {
    id: "carbon-trading-simulation",
    title: "碳交易模拟",
    description: "模拟碳排放权交易市场的运作机制与交易策略",
    difficulty: "中级",
    status: "已上线",
    icon: "chart-line",
    route: "/experiments/carbon-trading-simulation",
    module: "carbon-trading"
  },
  {
    id: "carbon-financial-product-design",
    title: "碳金融产品设计",
    description: "设计和开发创新碳金融产品与风险管理工具",
    difficulty: "高级",
    status: "已上线",
    icon: "coins",
    route: "/experiments/carbon-financial-product-design",
    module: "carbon-trading"
  },
]

// 所有课程的合并清单
export const courses: Course[] = [
  // 碳监测课程
  {
    id: "monitor-principles",
    title: "碳监测原理与技术",
    description: "学习碳排放监测的基本原理、方法和技术，包括直接测量和间接计算方法。",
    difficulty: "beginner",
    status: "published",
    icon: "broadcast-tower",
    route: "/courses/monitor-principles",
    module: "carbon-monitor",
  },
  {
    id: "satellite-monitoring",
    title: "卫星遥感监测技术",
    description: "探索如何利用卫星遥感技术进行大范围碳排放和碳汇监测，了解数据处理与分析方法。",
    difficulty: "intermediate",
    status: "published",
    icon: "satellite",
    route: "/courses/satellite-monitoring",
    module: "carbon-monitor",
  },
  // 碳核算课程
  {
    id: "carbon-accounting-standards",
    title: "碳核算标准与方法",
    description: "深入学习国内外主要碳核算标准，包括ISO 14064、温室气体核算体系等规范与方法。",
    difficulty: "intermediate",
    status: "published",
    icon: "calculator",
    route: "/courses/carbon-accounting-standards",
    module: "carbon-calculate",
  },
  {
    id: "life-cycle-assessment",
    title: "产品生命周期评价",
    description: "掌握产品全生命周期碳足迹评估方法，学习如何识别和量化产品各阶段的碳排放。",
    difficulty: "advanced",
    status: "published",
    icon: "recycle",
    route: "/courses/life-cycle-assessment",
    module: "carbon-calculate",
  },
  // 碳交易课程
  {
    id: "carbon-trading-fundamentals",
    title: "碳交易基础知识",
    description: "了解碳排放权交易的基本概念、机制和全球主要碳市场的运行规则。",
    difficulty: "beginner",
    status: "published",
    icon: "exchange",
    route: "/courses/carbon-trading-fundamentals",
    module: "carbon-trading",
  },
  {
    id: "carbon-derivatives",
    title: "碳金融与衍生品",
    description: "探索碳市场中的金融产品和衍生品，包括碳期货、期权及其定价和风险管理策略。",
    difficulty: "advanced",
    status: "published",
    icon: "line-chart",
    route: "/courses/carbon-derivatives",
    module: "carbon-trading",
  },
  // 碳中和课程
  {
    id: "renewable-energy-integration",
    title: "可再生能源系统集成",
    description: "学习如何规划和实施可再生能源系统，包括太阳能、风能等在企业减碳中的应用。",
    difficulty: "intermediate",
    status: "published",
    icon: "sun",
    route: "/courses/renewable-energy-integration",
    module: "carbon-neutral",
  },
  {
    id: "carbon-capture-technologies",
    title: "碳捕集与封存技术",
    description: "了解最新的碳捕集、利用与封存(CCUS)技术，探索其在实现碳中和目标中的潜力。",
    difficulty: "advanced",
    status: "published",
    icon: "filter",
    route: "/courses/carbon-capture-technologies",
    module: "carbon-neutral",
  },
]

// 四大模块
export const modules: Module[] = [
  {
    id: "carbon-monitor",
    title: "碳监测与计量",
    description: "激光雷达、土壤呼吸监测等多技术融合，真实感知碳排放数据",
    icon: "chart-line",
    color: "emerald",
    gradient: "from-green-600 to-emerald-700",
    experimentIds: ["carbon-monitoring-analysis"],
    courseIds: ["monitor-principles", "satellite-monitoring"],
  },
  {
    id: "carbon-calculate",
    title: "碳核算与管理",
    description: "全生命周期碳管理，从清单到反演，精准核算",
    icon: "calculator",
    color: "blue",
    gradient: "from-blue-600 to-indigo-700",
    experimentIds: ["project-carbon-calculation", "product-carbon-footprint"],
    courseIds: ["carbon-accounting-standards", "life-cycle-assessment"],
  },
  {
    id: "carbon-trading",
    title: "碳交易",
    description: "数字碳产权多轮模拟，让你成为碳市场交易的行家",
    icon: "exchange-alt",
    color: "purple",
    gradient: "from-purple-600 to-violet-700",
    experimentIds: ["carbon-trading-simulation", "carbon-financial-product-design"],
    courseIds: ["carbon-trading-fundamentals", "carbon-derivatives"],
  },
  {
    id: "carbon-neutral",
    title: "碳中和",
    description: "多场景沙盘演练，体验企业运营中的低碳决策过程",
    icon: "leaf",
    color: "orange",
    gradient: "from-orange-600 to-amber-700",
    experimentIds: ["global-carbon-neutral-prediction"],
    courseIds: ["renewable-energy-integration", "carbon-capture-technologies"],
  },
]

// 辅助函数：根据模块获取该模块的所有实验
export function getModuleExperiments(moduleId: string): Experiment[] {
  const module = modules.find(m => m.id === moduleId);
  if (!module) return [];
  
  return experiments.filter(exp => module.experimentIds.includes(exp.id));
}

// 辅助函数：获取实验详情
export function getExperiment(experimentId: string): Experiment | undefined {
  return experiments.find(exp => exp.id === experimentId);
}

// 辅助函数：获取课程详情
export function getCourse(courseId: string): Course | undefined {
  return courses.find(course => course.id === courseId);
}

// 辅助函数：根据模块获取该模块的所有课程
export function getModuleCourses(moduleId: string) {
  return courses.filter(course => course.module === moduleId);
}
