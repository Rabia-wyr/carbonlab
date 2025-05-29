# 碳实验室 (Carbon Lab)

一个基于 Next.js 14 的交互式碳科学学习平台，提供多种碳相关的模拟实验和学习工具。

## 项目概述

碳实验室是一个综合性的在线学习平台，旨在通过交互式实验和模拟工具，帮助学习者深入理解碳科学、碳管理和碳政策等相关知识。平台采用现代化的Web技术栈，提供直观易用的用户界面和丰富的学习内容。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **UI组件库**: Shadcn UI
- **包管理器**: PNPM
- **图标库**: Lucide React

## 实验模块

### 🔬 已实现的实验

1. **项目碳核算实验** (`/experiments/project-carbon-calculation`)
   - 交通基础设施建设项目的全生命周期碳排放核算
   - 包含人工、机械、材料、能源等多维度碳排放计算

2. **全球碳中和预测实验** (`/experiments/global-carbon-neutral-prediction`)
   - 基于数据模型的全球碳中和趋势预测分析

### 🚧 开发中的实验

3. **企业碳管理经营模拟** (`/experiments/carbon-trading-simulation`)
   - 模拟生产型企业5年经营过程中的碳管理挑战
   - 包含产线升级、订单管理、碳配额交易等决策要素
   - 体验碳约束下的企业战略规划和风险管理
   - 生成全面的ESG绩效评估报告，评估环境、社会、治理表现
   - **状态**: 完整的5年模拟系统和ESG报告功能已完成

## 项目结构

```
carbonlab/
├── app/                          # Next.js App Router 目录
│   ├── experiments/              # 实验模块
│   │   ├── carbon-trading-simulation/    # 碳交易模拟实验
│   │   ├── project-carbon-calculation/   # 项目碳核算实验
│   │   └── global-carbon-neutral-prediction/ # 全球碳中和预测
│   ├── dashboard/                # 仪表板页面
│   ├── courses/                  # 课程模块
│   ├── resources/                # 资源中心
│   └── admin/                    # 管理后台
├── components/                   # 可复用组件
│   ├── ui/                      # Shadcn UI 组件
│   └── experiment/              # 实验相关组件
├── lib/                         # 工具函数和配置
├── hooks/                       # 自定义 React Hooks
└── styles/                      # 样式文件
```

## 开发指南

### 环境要求

- Node.js 18+
- PNPM 8+

### 安装依赖

```bash
pnpm install
```

### 开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 代码规范

项目使用 ESLint 和 TypeScript 进行代码质量控制：

```bash
# 检查代码规范
pnpm lint

# 类型检查
pnpm type-check
```

## 组件开发

### 添加 Shadcn UI 组件

```bash
pnpm dlx shadcn@latest add [component-name]
```

### 创建新实验

1. 在 `app/experiments/` 下创建新的实验目录
2. 创建 `page.tsx` 作为实验主页面
3. 在 `components/` 目录下创建实验相关组件
4. 添加实验的 README.md 文档

## 设计原则

- **模块化**: 每个实验都是独立的模块，便于维护和扩展
- **响应式**: 支持多种设备和屏幕尺寸
- **可访问性**: 遵循 Web 可访问性标准
- **性能优化**: 使用 Next.js 的性能优化特性
- **类型安全**: 全面使用 TypeScript 确保代码质量

## 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目仓库: [GitHub](https://github.com/your-org/carbonlab)
- 邮箱: contact@carbonlab.com

---

**碳实验室** - 让碳科学学习更加直观和有趣 🌱 