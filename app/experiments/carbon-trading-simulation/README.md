# 企业碳管理经营模拟

## 实验概述

企业碳管理经营模拟是一个交互式的学习平台，模拟生产型企业5年的经营过程。学习者将扮演企业管理者，在碳配额逐年递减的约束下，通过产线升级、订单管理、碳交易等策略，实现企业的可持续发展目标。

## 实验背景

### 企业初始状态
- **初始资金**: 10M
- **原材料库存**: 10单位
- **产成品库存**: 10单位
- **基础产能**: 每季度10个产品
- **生产参数**: 1单位原材料 + 10单位能源(1M/单位) → 1单位产成品 + 10单位碳排放

### 碳配额约束
企业面临5年逐年递减的碳配额限制：
- 第1年：30单位
- 第2年：25单位
- 第3年：20单位
- 第4年：15单位
- 第5年：10单位

## 核心机制

### 1. 年度规划决策
每年企业需要制定年度经营计划，包括：

#### 季度活动安排
- **活动类型**: 每季度只能选择生产、技术升级或空闲其中一种活动
- **升级约束**: 技术升级季度无法安排生产，影响产能和订单交付
- **策略权衡**: 需要平衡升级投资与生产收益的时机选择
- **风险管理**: 合理安排升级时间，避免影响重要订单交付

#### 产线升级投资
- **能耗降低**: 每级减少1单位能源消耗，成本10M，最多升级5级
- **碳排降低**: 每级减少1单位碳排放，成本10M，最多升级5级
- **投资回报**: 长期降低运营成本和碳排放
- **时机选择**: 需要考虑升级对当季度生产的影响

#### 订单选择策略
- **销售订单**: 平均50M/单位，2年内交付，有违约金风险
- **采购订单**: 平均35M/单位，1年内交付，保证按期到货
- **风险管理**: 平衡收益与交付风险

### 2. 季度执行模拟
按照年度计划自动执行季度生产和交付：
- **活动执行**: 根据季度活动安排执行生产或技术升级
- **生产计算**: 受原材料库存和产能限制，升级季度产量为0
- **升级执行**: 技术升级在指定季度完成，立即生效
- **订单交付**: 按时交付获得收入，违约承担损失
- **成本核算**: 能源成本 + 原材料成本 + 升级投资
- **碳排统计**: 累计年度碳排放量，考虑升级效果

### 3. 年底碳交易结算
- **配额核算**: 对比年度碳排放与配额限制
- **碳交易**: 超额需购买(1M/单位)，结余可出售(1M/单位)
- **财务检查**: 资金不足则游戏结束

## 实验目标

### 知识目标
- 理解企业碳管理的复杂性和挑战性
- 掌握碳约束下的企业经营决策方法
- 学习产线升级投资的成本效益分析
- 了解碳交易市场对企业财务的影响

### 技能目标
- 培养战略规划和风险管理能力
- 提升财务预算和成本控制技能
- 增强数据分析和决策支持能力
- 锻炼多目标优化的综合决策能力

### 素养目标
- 增强可持续发展理念
- 理解经济效益与环境效益的平衡
- 培养长期投资与短期收益的权衡思维
- 建立企业社会责任意识

## 决策要素分析

### 季度活动规划策略
- **时机优化**: 选择最佳的升级时机，避开关键生产期
- **产能平衡**: 在升级收益与生产损失之间找到平衡点
- **订单协调**: 合理安排升级时间，确保重要订单按时交付
- **现金流管理**: 考虑升级投资对资金流的影响

### 产线升级策略
- **时机选择**: 早期投资vs后期投资的权衡
- **类型选择**: 能耗降低vs碳排降低的优先级
- **投资强度**: 激进升级vs渐进升级的风险收益
- **资金平衡**: 升级投资与运营资金的分配

### 订单管理策略
- **销售策略**: 高收益订单vs低风险订单的选择
- **采购策略**: 库存成本vs缺货风险的平衡
- **交付管理**: 生产计划与订单承诺的协调
- **风险控制**: 违约金损失的预防和控制

### 碳交易策略
- **减排投资**: 技术升级vs购买配额的成本比较
- **交易时机**: 提前购买vs临时购买的价格风险
- **配额管理**: 结余出售vs储备应急的策略选择
- **长期规划**: 5年碳约束趋势的提前应对

## 成功要素

### 财务管理
- 合理的资金分配和现金流管理
- 准确的成本核算和收益预测
- 有效的投资回报率分析
- 充足的风险准备金

### 运营优化
- 高效的生产计划和库存管理
- 灵活的订单选择和交付安排
- 持续的技术升级和效率提升
- 完善的风险预警和应对机制

### 战略规划
- 清晰的5年发展目标和路径
- 前瞻性的碳约束应对策略
- 平衡的短期收益和长期投资
- 适应性的策略调整能力

## 学习价值

### 理论联系实际
- 将碳管理理论应用于具体经营场景
- 体验企业决策的复杂性和不确定性
- 理解政策约束对企业行为的影响
- 掌握多目标优化的实践方法

### 能力培养
- **分析能力**: 数据分析和趋势预测
- **决策能力**: 多因素权衡和选择判断
- **规划能力**: 长期战略和短期执行
- **应变能力**: 风险识别和危机处理

### 思维训练
- **系统思维**: 全局视角和整体优化
- **战略思维**: 长远规划和前瞻布局
- **创新思维**: 问题解决和方案创新
- **责任思维**: 可持续发展和社会责任

## ESG绩效评估

### ESG评分体系
实验结束后，系统将基于企业5年经营表现生成全面的ESG绩效评估报告：

#### 环境绩效 (E - Environmental)
- **碳减排效果**: 基于技术升级降低的碳排放强度
- **能效提升**: 通过技术投资实现的能源效率改善
- **清洁技术投资**: 环保技术升级的投资规模和效果
- **碳足迹管理**: 总碳排放量、碳强度等关键指标

#### 社会绩效 (S - Social)
- **经营稳定性**: 企业持续经营能力和财务健康状况
- **可持续发展**: 长期发展战略的执行效果
- **利益相关者**: 对员工、客户、社区的责任履行
- **社会价值创造**: 企业对社会的积极贡献

#### 治理绩效 (G - Governance)
- **战略规划**: 年度规划制定和执行的有效性
- **风险管理**: 财务风险、经营风险的识别和控制
- **决策透明**: 经营决策的科学性和透明度
- **合规管理**: 碳配额等法规要求的遵守情况

### ESG评级标准
- **AAA级** (90-100分): 卓越的ESG表现，行业领先
- **AA级** (80-89分): 优秀的ESG表现，值得认可
- **A级** (70-79分): 良好的ESG表现，符合标准
- **BBB级** (60-69分): 基本的ESG表现，有待改进
- **BB级** (50-59分): 较弱的ESG表现，需要关注
- **B级** (50分以下): 不足的ESG表现，急需改善

### 报告内容
ESG报告包含以下核心内容：
- **综合评分**: 环境、社会、治理三个维度的综合评级
- **详细指标**: 各项ESG指标的具体数值和分析
- **对标分析**: 与行业标准和最佳实践的对比
- **改进建议**: 针对性的ESG提升建议和行动计划
- **价值体现**: ESG理念在企业经营中的价值实现

### 教育意义
通过ESG报告，学习者可以：
- 理解ESG理念在现代企业管理中的重要性
- 掌握ESG绩效评估的方法和标准
- 学习如何将ESG要素融入经营决策
- 认识可持续发展对企业长期价值的影响
- 培养负责任的商业领导力思维

## 技术实现

- **前端框架**: Next.js 14 + TypeScript
- **UI组件**: Shadcn UI + Tailwind CSS
- **状态管理**: React Hooks
- **数据模拟**: 客户端算法模拟
- **响应式设计**: 支持多设备访问

## 使用说明

1. 访问实验页面：`/experiments/carbon-trading-simulation`
2. 阅读实验介绍，了解背景和规则
3. 确认企业初始状态和碳配额计划
4. 进行5年经营模拟（当前为演示版本）
5. 查看结果分析和经营绩效评估
6. 生成企业ESG绩效评估报告

## 开发状态

### ✅ 已完成
- 实验介绍页面（详细的背景知识和规则说明）
- 模拟设置页面（企业状态确认和规则提醒）
- 经营模拟页面（完整的5年模拟系统）
- 结果分析页面（绩效评估和策略建议）
- ESG报告页面（环境、社会、治理绩效评估）
- 完整的数据结构设计和类型定义

### 🚧 开发中
- 年度规划决策界面
- 季度执行模拟算法
- 碳交易结算逻辑
- 实时数据可视化
- 多情景模拟支持

### 📋 计划功能
- 智能决策建议系统
- 历史数据对比分析
- 多企业竞争模式
- 自定义参数设置
- 详细的学习报告生成

## 联系方式

如有问题或建议，请联系开发团队。 