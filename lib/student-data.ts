// 学生数据类型定义
export type Student = {
  id: string
  name: string
  email: string
  avatar?: string
  enrolledAt: string
  lastActiveAt: string
  totalExperiments: number
  completedExperiments: number
  totalCourses: number
  completedCourses: number
  level: "初级" | "中级" | "高级"
}

// 实验完成记录类型
export type ExperimentCompletion = {
  id: string
  studentId: string
  experimentId: string
  completedAt: string
  score: number
  timeSpent: number // 分钟
  status: "completed" | "in-progress" | "not-started"
}

// 课程完成记录类型
export type CourseCompletion = {
  id: string
  studentId: string
  courseId: string
  progress: number // 0-100
  completedAt?: string
  lastAccessedAt: string
  status: "completed" | "in-progress" | "not-started"
}

// 模拟学生数据
export const students: Student[] = [
  {
    id: "student-001",
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/avatars/student1.jpg",
    enrolledAt: "2024-01-15",
    lastActiveAt: "2024-12-20",
    totalExperiments: 6,
    completedExperiments: 4,
    totalCourses: 8,
    completedCourses: 6,
    level: "中级"
  },
  {
    id: "student-002", 
    name: "李四",
    email: "lisi@example.com",
    avatar: "/avatars/student2.jpg",
    enrolledAt: "2024-02-01",
    lastActiveAt: "2024-12-19",
    totalExperiments: 6,
    completedExperiments: 3,
    totalCourses: 8,
    completedCourses: 4,
    level: "初级"
  },
  {
    id: "student-003",
    name: "王五",
    email: "wangwu@example.com", 
    avatar: "/avatars/student3.jpg",
    enrolledAt: "2024-01-20",
    lastActiveAt: "2024-12-20",
    totalExperiments: 6,
    completedExperiments: 6,
    totalCourses: 8,
    completedCourses: 8,
    level: "高级"
  },
  {
    id: "student-004",
    name: "赵六",
    email: "zhaoliu@example.com",
    avatar: "/avatars/student4.jpg", 
    enrolledAt: "2024-03-10",
    lastActiveAt: "2024-12-18",
    totalExperiments: 6,
    completedExperiments: 2,
    totalCourses: 8,
    completedCourses: 3,
    level: "初级"
  },
  {
    id: "student-005",
    name: "孙七",
    email: "sunqi@example.com",
    avatar: "/avatars/student5.jpg",
    enrolledAt: "2024-02-15",
    lastActiveAt: "2024-12-20",
    totalExperiments: 6,
    completedExperiments: 5,
    totalCourses: 8,
    completedCourses: 7,
    level: "高级"
  }
]

// 模拟实验完成记录
export const experimentCompletions: ExperimentCompletion[] = [
  // 张三的完成记录
  {
    id: "comp-001",
    studentId: "student-001",
    experimentId: "global-carbon-neutral-prediction",
    completedAt: "2024-12-15",
    score: 85,
    timeSpent: 120,
    status: "completed"
  },
  {
    id: "comp-002", 
    studentId: "student-001",
    experimentId: "carbon-monitoring-analysis",
    completedAt: "2024-12-10",
    score: 92,
    timeSpent: 95,
    status: "completed"
  },
  {
    id: "comp-003",
    studentId: "student-001",
    experimentId: "project-carbon-calculation",
    completedAt: "2024-12-05",
    score: 78,
    timeSpent: 110,
    status: "completed"
  },
  {
    id: "comp-004",
    studentId: "student-001",
    experimentId: "product-carbon-footprint",
    completedAt: "2024-11-28",
    score: 88,
    timeSpent: 135,
    status: "completed"
  },
  // 李四的完成记录
  {
    id: "comp-005",
    studentId: "student-002",
    experimentId: "carbon-monitoring-analysis",
    completedAt: "2024-12-12",
    score: 76,
    timeSpent: 105,
    status: "completed"
  },
  {
    id: "comp-006",
    studentId: "student-002", 
    experimentId: "project-carbon-calculation",
    completedAt: "2024-12-08",
    score: 82,
    timeSpent: 98,
    status: "completed"
  },
  {
    id: "comp-007",
    studentId: "student-002",
    experimentId: "carbon-trading-simulation",
    completedAt: "2024-12-01",
    score: 74,
    timeSpent: 88,
    status: "completed"
  },
  // 王五的完成记录（全部完成）
  {
    id: "comp-008",
    studentId: "student-003",
    experimentId: "global-carbon-neutral-prediction",
    completedAt: "2024-12-18",
    score: 95,
    timeSpent: 85,
    status: "completed"
  },
  {
    id: "comp-009",
    studentId: "student-003",
    experimentId: "carbon-monitoring-analysis", 
    completedAt: "2024-12-16",
    score: 98,
    timeSpent: 75,
    status: "completed"
  },
  {
    id: "comp-010",
    studentId: "student-003",
    experimentId: "project-carbon-calculation",
    completedAt: "2024-12-14",
    score: 94,
    timeSpent: 80,
    status: "completed"
  },
  {
    id: "comp-011",
    studentId: "student-003",
    experimentId: "product-carbon-footprint",
    completedAt: "2024-12-12",
    score: 96,
    timeSpent: 90,
    status: "completed"
  },
  {
    id: "comp-012",
    studentId: "student-003",
    experimentId: "carbon-trading-simulation",
    completedAt: "2024-12-10",
    score: 93,
    timeSpent: 95,
    status: "completed"
  },
  {
    id: "comp-013",
    studentId: "student-003",
    experimentId: "carbon-financial-product-design",
    completedAt: "2024-12-08",
    score: 97,
    timeSpent: 100,
    status: "completed"
  }
]

// 模拟课程完成记录
export const courseCompletions: CourseCompletion[] = [
  // 张三的课程进度
  {
    id: "course-comp-001",
    studentId: "student-001",
    courseId: "monitor-principles",
    progress: 100,
    completedAt: "2024-12-10",
    lastAccessedAt: "2024-12-10",
    status: "completed"
  },
  {
    id: "course-comp-002",
    studentId: "student-001", 
    courseId: "satellite-monitoring",
    progress: 100,
    completedAt: "2024-12-08",
    lastAccessedAt: "2024-12-08",
    status: "completed"
  },
  {
    id: "course-comp-003",
    studentId: "student-001",
    courseId: "carbon-accounting-standards",
    progress: 75,
    lastAccessedAt: "2024-12-15",
    status: "in-progress"
  }
]

// 获取实验完成统计
export function getExperimentCompletionStats() {
  const stats = new Map<string, { total: number; completed: number; avgScore: number }>()
  
  // 初始化所有实验的统计
  const experimentIds = [
    "global-carbon-neutral-prediction",
    "carbon-monitoring-analysis", 
    "project-carbon-calculation",
    "product-carbon-footprint",
    "carbon-trading-simulation",
    "carbon-financial-product-design"
  ]
  
  experimentIds.forEach(id => {
    stats.set(id, { total: students.length, completed: 0, avgScore: 0 })
  })
  
  // 计算完成情况
  experimentCompletions.forEach(completion => {
    const stat = stats.get(completion.experimentId)
    if (stat && completion.status === "completed") {
      stat.completed += 1
      stat.avgScore = (stat.avgScore * (stat.completed - 1) + completion.score) / stat.completed
    }
  })
  
  return stats
}

// 获取学生学习进度概览
export function getStudentProgressOverview() {
  const totalStudents = students.length
  const activeStudents = students.filter(s => {
    const lastActive = new Date(s.lastActiveAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return lastActive >= weekAgo
  }).length
  
  const avgExperimentCompletion = students.reduce((sum, s) => sum + (s.completedExperiments / s.totalExperiments), 0) / totalStudents
  const avgCourseCompletion = students.reduce((sum, s) => sum + (s.completedCourses / s.totalCourses), 0) / totalStudents
  
  return {
    totalStudents,
    activeStudents,
    avgExperimentCompletion: Math.round(avgExperimentCompletion * 100),
    avgCourseCompletion: Math.round(avgCourseCompletion * 100)
  }
}

// 获取最近完成的实验
export function getRecentCompletions(limit: number = 5) {
  return experimentCompletions
    .filter(c => c.status === "completed")
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, limit)
    .map(completion => {
      const student = students.find(s => s.id === completion.studentId)
      return {
        ...completion,
        studentName: student?.name || "未知学生"
      }
    })
} 