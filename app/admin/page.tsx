import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { experiments, courses, modules } from "@/lib/database"
import { 
  getStudentProgressOverview, 
  getExperimentCompletionStats, 
  getRecentCompletions,
  students 
} from "@/lib/student-data"
import { Users, FlaskConical, GraduationCap, BarChart3, TrendingUp, Clock, Award, UserCheck } from "lucide-react"

export default function AdminPage() {
  // 统计数据
  const stats = {
    experiments: experiments.length,
    courses: courses.length,
    modules: modules.length,
    users: students.length,
  }

  // 学生进度概览
  const progressOverview = getStudentProgressOverview()
  
  // 实验完成统计
  const experimentStats = getExperimentCompletionStats()
  
  // 最近完成的实验
  const recentCompletions = getRecentCompletions(5)

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>管理后台</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* 基础统计卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                实验总数
              </CardTitle>
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.experiments}</div>
              <p className="text-xs text-muted-foreground">
                已发布的实验项目
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                课程总数
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.courses}</div>
              <p className="text-xs text-muted-foreground">
                已发布的课程内容
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                学生总数
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">
                注册学生数量
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                活跃学生
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressOverview.activeStudents}</div>
              <p className="text-xs text-muted-foreground">
                近7天内活跃的学生
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 学生学习进度概览 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                学生学习进度概览
              </CardTitle>
              <CardDescription>
                全体学生的平均学习完成情况
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>实验完成率</span>
                  <span>{progressOverview.avgExperimentCompletion}%</span>
                </div>
                <Progress value={progressOverview.avgExperimentCompletion} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>课程完成率</span>
                  <span>{progressOverview.avgCourseCompletion}%</span>
                </div>
                <Progress value={progressOverview.avgCourseCompletion} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{progressOverview.totalStudents}</div>
                  <div className="text-xs text-muted-foreground">总学生数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{progressOverview.activeStudents}</div>
                  <div className="text-xs text-muted-foreground">活跃学生</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                最近完成的实验
              </CardTitle>
              <CardDescription>
                学生最新的实验完成记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCompletions.map((completion) => {
                  const experiment = experiments.find(e => e.id === completion.experimentId)
                  return (
                    <div key={completion.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {completion.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          完成了 "{experiment?.title || "未知实验"}"
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={completion.score >= 90 ? "default" : completion.score >= 80 ? "secondary" : "outline"}>
                          {completion.score}分
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(completion.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 实验完成情况统计 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              各实验完成情况统计
            </CardTitle>
            <CardDescription>
              每个实验的学生参与和完成情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from(experimentStats.entries()).map(([experimentId, stat]) => {
                const experiment = experiments.find(e => e.id === experimentId)
                const completionRate = Math.round((stat.completed / stat.total) * 100)
                
                return (
                  <div key={experimentId} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm leading-tight">
                        {experiment?.title || "未知实验"}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {experiment?.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>完成率</span>
                        <span>{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="font-medium">{stat.completed}</div>
                        <div className="text-muted-foreground">已完成</div>
                      </div>
                      <div>
                        <div className="font-medium">{stat.total - stat.completed}</div>
                        <div className="text-muted-foreground">未完成</div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {stat.completed > 0 ? Math.round(stat.avgScore) : 0}
                        </div>
                        <div className="text-muted-foreground">平均分</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>系统状态</CardTitle>
              <CardDescription>
                各模块运行状态监控
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">{module.title}</span>
                    </div>
                    <span className="text-sm text-green-600">正常</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>学生等级分布</CardTitle>
              <CardDescription>
                按学习水平划分的学生分布情况
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["初级", "中级", "高级"].map((level) => {
                  const count = students.filter(s => s.level === level).length
                  const percentage = Math.round((count / students.length) * 100)
                  
                  return (
                    <div key={level} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{level}学生</span>
                        <span>{count}人 ({percentage}%)</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
} 