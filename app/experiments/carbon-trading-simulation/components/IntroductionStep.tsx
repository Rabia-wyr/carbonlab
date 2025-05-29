import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, TrendingUp, Calendar, Target, DollarSign, Zap } from "lucide-react"

interface IntroductionStepProps {
  onNext: () => void
}

export function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="space-y-8">
      {/* 实验概述 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-green-600" />
            实验目标
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-gray-700">
            本实验模拟一个生产型企业5年的经营过程，帮助学习者深入理解：
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              企业碳配额管理与生产经营的平衡决策
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              产线升级投资对能耗和碳排放的长期影响
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              订单选择策略与库存管理的协调优化
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              碳交易市场对企业财务状况的影响分析
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 企业初始状态 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              企业初始状态
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">财务与库存：</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 初始资金：10M</li>
                <li>• 原材料库存：10单位</li>
                <li>• 产成品库存：10单位</li>
                <li>• 基础产能：每季度10个产品</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">生产参数：</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1单位原材料 → 1单位产成品</li>
                <li>• 消耗10单位能源（1M/单位）</li>
                <li>• 产生10单位碳排放</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-purple-600" />
              碳配额限制
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              企业面临逐年递减的碳配额限制，需要通过技术升级和碳交易来应对挑战。
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">5年配额计划：</h4>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="bg-red-50 p-2 rounded">
                  <div className="text-xs text-gray-500">第1年</div>
                  <div className="font-bold text-red-600">30</div>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <div className="text-xs text-gray-500">第2年</div>
                  <div className="font-bold text-orange-600">25</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="text-xs text-gray-500">第3年</div>
                  <div className="font-bold text-yellow-600">20</div>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-xs text-gray-500">第4年</div>
                  <div className="font-bold text-blue-600">15</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-xs text-gray-500">第5年</div>
                  <div className="font-bold text-green-600">10</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 经营决策要素 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-600" />
            经营决策要素
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">产线升级</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 能耗降低：每级减少1单位能源消耗</li>
                <li>• 碳排降低：每级减少1单位碳排放</li>
                <li>• 升级成本：每次10M，最多5级</li>
                <li>• <span className="font-medium text-orange-600">季度约束：每季度只能进行一次升级</span></li>
                <li>• <span className="font-medium text-orange-600">活动冲突：升级季度无法安排生产</span></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">订单管理</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 销售订单：平均50M/单位，2年内交付</li>
                <li>• 采购订单：平均35M/单位，1年内交付</li>
                <li>• 违约风险：销售订单有违约金</li>
                <li>• 库存平衡：合理安排生产和交付</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">碳交易</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 碳价格：固定1M/单位配额</li>
                <li>• 年底结算：超额需购买，结余可出售</li>
                <li>• 资金风险：资金不足则游戏结束</li>
                <li>• 策略选择：减排vs购买配额</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 模拟流程 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            模拟流程
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium">年度规划</h4>
              <p className="text-sm text-gray-600">制定产线升级和订单选择策略，安排季度活动</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-medium">季度执行</h4>
              <p className="text-sm text-gray-600">按计划进行生产和订单交付</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-medium">年底结算</h4>
              <p className="text-sm text-gray-600">碳配额交易和财务状况评估</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-medium">结果分析</h4>
              <p className="text-sm text-gray-600">评估经营绩效和碳管理效果</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 学习要点 */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-green-700">💡 学习要点</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">战略思维</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 长期投资与短期收益的平衡</li>
                <li>• 风险管理与机会把握</li>
                <li>• 资源配置优化策略</li>
                <li>• 可持续发展理念</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">实操技能</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 财务预算与成本控制</li>
                <li>• 生产计划与库存管理</li>
                <li>• 碳足迹核算与管理</li>
                <li>• 数据分析与决策支持</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 开始实验按钮 */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={onNext}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
        >
          开始模拟经营
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
} 