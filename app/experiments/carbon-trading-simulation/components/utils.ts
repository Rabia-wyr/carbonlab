import { QuarterlyActivity, QuarterlyUpgrade, CompanyState, AnnualPlan } from "./index"

/**
 * 计算季度生产能力
 * @param activity 季度活动类型
 * @param baseCapacity 基础产能
 * @returns 实际生产能力
 */
export function calculateQuarterlyCapacity(
  activity: QuarterlyActivity,
  baseCapacity: number
): number {
  switch (activity) {
    case "production":
      return baseCapacity
    case "upgrade":
      return 0 // 升级季度无法生产
    case "idle":
      return 0 // 空闲季度无生产
    default:
      return 0
  }
}

/**
 * 验证年度规划的季度活动安排是否合法
 * @param plan 年度规划
 * @returns 验证结果和错误信息
 */
export function validateAnnualPlan(plan: AnnualPlan): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  // 检查每季度只能有一种活动
  for (let quarter = 1; quarter <= 4; quarter++) {
    const activity = plan.quarterlyActivities[quarter]
    if (!activity) {
      errors.push(`第${quarter}季度未安排活动`)
      continue
    }
    
    // 检查升级季度是否有对应的升级计划
    if (activity === "upgrade") {
      const hasUpgrade = plan.plannedUpgrades.some(
        upgrade => upgrade.quarter === quarter && upgrade.year === plan.year
      )
      if (!hasUpgrade) {
        errors.push(`第${quarter}季度安排了升级活动但没有具体升级计划`)
      }
    }
  }
  
  // 检查升级计划是否与季度活动匹配
  plan.plannedUpgrades.forEach(upgrade => {
    const activity = plan.quarterlyActivities[upgrade.quarter]
    if (activity !== "upgrade") {
      errors.push(
        `第${upgrade.quarter}季度有升级计划但活动类型不是升级`
      )
    }
  })
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * 计算升级后的能耗和碳排
 * @param currentLevel 当前级别
 * @param upgradeLevel 升级级别
 * @param baseValue 基础值
 * @returns 升级后的值
 */
export function calculateUpgradedValue(
  currentLevel: number,
  upgradeLevel: number,
  baseValue: number
): number {
  const newLevel = Math.min(currentLevel + upgradeLevel, 5) // 最多5级
  return Math.max(baseValue - newLevel, 5) // 最低5单位
}

/**
 * 生成季度活动建议
 * @param companyState 企业状态
 * @param year 年份
 * @returns 活动建议
 */
export function generateActivitySuggestions(
  companyState: CompanyState,
  year: number
): {
  quarter: number
  suggestedActivity: QuarterlyActivity
  reason: string
}[] {
  const suggestions = []
  const carbonAllowance = companyState.carbonAllowances.find(a => a.year === year)
  
  for (let quarter = 1; quarter <= 4; quarter++) {
    let suggestedActivity: QuarterlyActivity = "production"
    let reason = "正常生产以满足订单需求"
    
    // 如果碳配额紧张且还未升级，建议升级
    if (carbonAllowance && carbonAllowance.allowance <= 20) {
      if (companyState.productionUpgrades.emission < 3) {
        suggestedActivity = "upgrade"
        reason = "碳配额紧张，建议优先升级碳排放技术"
      }
    }
    
    // 如果是年初且资金充足，建议升级
    if (quarter === 1 && companyState.funds > 50) {
      if (companyState.productionUpgrades.energy < 3) {
        suggestedActivity = "upgrade"
        reason = "年初资金充足，建议升级能耗技术降低运营成本"
      }
    }
    
    suggestions.push({
      quarter,
      suggestedActivity,
      reason
    })
  }
  
  return suggestions
} 