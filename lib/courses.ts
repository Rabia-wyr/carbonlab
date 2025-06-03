import { Course, courses, modules, getCourse } from "@/lib/database";

// 课程进度记录类型
export interface ProgressRecord {
  completedLessons: string[];
  completedUnits: string[];
}

// 获取所有课程
export const getCourses = async (): Promise<Course[]> => {
  return courses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    difficulty: course.difficulty,
    status: course.status,
    icon: course.icon,
    module: course.module,
    route: `/courses/${course.id}`, // 添加route属性
    image: course.image // 添加image属性
  }));
};

// 根据ID获取课程
export function getCourseById(courseId: string) {
  const course = getCourse(courseId);
  
  if (!course) {
    return null;
  }
  
  // 模拟评分数据 (4.5-5.0之间的随机数)
  const rating = (4.5 + Math.random() * 0.5).toFixed(1);
  
  return {
    ...course,
    rating: parseFloat(rating),
    enrolledCount: Math.floor(Math.random() * 500) + 1000, // 随机学员数量
    updatedAt: new Date().toISOString().split('T')[0], // 更新日期为今天
  };
}

// 根据模块获取课程
export function getCoursesByModule(moduleId: string) {
  const module = modules.find(m => m.id === moduleId);
  if (!module) return [];
  
  return module.courseIds.map(courseId => {
    const course = getCourse(courseId);
    if (!course) return null;
    
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      difficulty: course.difficulty,
      status: course.status,
      icon: course.icon,
      module: course.module,
      route: `/courses/${course.id}` // 添加route属性
    };
  }).filter(Boolean);
}

// 模拟课程单元和课程
export async function getCourseUnitsAndLessons(courseId: string) {
  const course = await getCourseById(courseId);
  if (!course) {
    return { units: [] };
  }

  // 为每个课程生成3-5个单元
  const unitCount = Math.floor(Math.random() * 3) + 3;
  const units = [];

  for (let i = 0; i < unitCount; i++) {
    // 每个单元2-4节课
    const lessonCount = Math.floor(Math.random() * 3) + 2;
    const lessons = [];

    for (let j = 0; j < lessonCount; j++) {
      lessons.push({
        id: `${courseId}-lesson-${i}-${j}`,
        title: `${course.title} 单元${i + 1} 课时${j + 1}`,
        description: `这是 ${course.title} 的第 ${i + 1} 单元第 ${j + 1} 节课`,
        unit_id: `${courseId}-unit-${i}`,
        order: j + 1,
        content_type: "video",
        content_url: "",
        duration: Math.floor(Math.random() * 20) + 10,
      });
    }

    units.push({
      id: `${courseId}-unit-${i}`,
      title: `${course.title} 单元${i + 1}`,
      description: `这是 ${course.title} 的第 ${i + 1} 个单元`,
      course_id: courseId,
      order: i + 1,
      lessons,
    });
  }

  return { units };
}

// 获取课程进度记录
export async function getCourseProgressRecords(courseId: string): Promise<ProgressRecord[]> {
  const { units } = await getCourseUnitsAndLessons(courseId);
  const progressRecords: ProgressRecord[] = [];

  // 为每个课程随机生成进度记录
  units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      // 70%的概率课程已完成
      const isCompleted = Math.random() > 0.3;
      if (isCompleted) {
        progressRecords.push({
          completedLessons: [lesson.id],
          completedUnits: [unit.id],
        });
      }
    });
  });

  return progressRecords;
} 