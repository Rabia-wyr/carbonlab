"use client";

import React, { useEffect, useState } from "react";
import { getCourseById } from "@/lib/courses";
import { CourseContent } from "@/components/course/CourseContent";
import { Difficulty } from "@/lib/database";

// 定义课程类型
type Course = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  status?: string;
  category: string;
  icon?: string;
  average_rating: string;
  module: string;
  image?: string;
} | null;

export default function CourseDetail({ params }: { params: { "course-id": string } }) {
  const [course, setCourse] = useState<Course>(null);
  const [loading, setLoading] = useState(true);
  const courseId = params["course-id"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // 背景图片数组
  const backgroundImages = [
    "/banner1.webp",
    "/banner2.webp",
    "/banner3.webp",
    "/banner4.webp"
  ];

  // 计算下一张图片的索引
  const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;

  // 处理图片切换完成后的逻辑
  const handleTransitionEnd = () => {
    // 切换完成后更新当前索引
    setCurrentImageIndex(nextImageIndex);
    // 重置滑动状态
    setIsSliding(false);
  };

  useEffect(() => {
    // 设置定时器，每5秒切换一次图片
    const timer = setInterval(() => {
      setIsSliding(true);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      const courseData = await getCourseById(courseId);
      // 添加缺失的属性来满足 Course 类型要求
      if (courseData) {
        // 转换 difficulty 类型
        const difficultyMap: Record<string, Difficulty> = {
          "beginner": "基础",
          "intermediate": "中级", 
          "advanced": "高级"
        };
        
        setCourse({
          ...courseData,
          category: courseData.module,
          average_rating: courseData.rating?.toString() || "4.5",
          difficulty: difficultyMap[courseData.difficulty] || "中级"
        });
      } else {
        setCourse(null);
      }
      setLoading(false);
    }
    fetchInitialData();
  }, [courseId]);

  // 根据模块ID获取模块样式
  const getModuleStyles = (moduleId: string) => {
    switch (moduleId) {
      case "carbon-monitor":
        return {
          bg: "bg-emerald-50",
          gradient: "from-green-600 to-emerald-700",
          icon: "text-emerald-600"
        };
      case "carbon-calculate":
        return {
          bg: "bg-blue-50",
          gradient: "from-blue-600 to-indigo-700",
          icon: "text-blue-600"
        };
      case "carbon-trading":
        return {
          bg: "bg-purple-50",
          gradient: "from-purple-600 to-violet-700",
          icon: "text-purple-600"
        };
      case "carbon-neutral":
        return {
          bg: "bg-orange-50",
          gradient: "from-orange-600 to-amber-700",
          icon: "text-orange-600"
        };
      default:
        return {
          bg: "bg-gray-50",
          gradient: "from-gray-600 to-gray-700",
          icon: "text-gray-600"
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 md:py-8">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">加载课程中...</p>
          </div>
        </div>
      ) : course ? (
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3">
            <div className="relative h-[300px] overflow-hidden rounded-lg shadow-lg">
              {/* 当前背景图片 */}
              <div 
                className={`absolute inset-0 transition-transform duration-500 ${isSliding ? "-translate-x-full" : "translate-x-0"}`}
                style={{
                  backgroundImage: `url("${backgroundImages[currentImageIndex]}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {/* 黑色遮罩层 */}
                <div className="absolute inset-0 bg-black opacity-30"></div>
              </div>

              {/* 下一张背景图片 */}
              <div 
                className={`absolute inset-0 transition-transform duration-500 ${isSliding ? "translate-x-0" : "translate-x-full"}`}
                style={{
                  backgroundImage: `url("${backgroundImages[nextImageIndex]}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {/* 黑色遮罩层 */}
                <div className="absolute inset-0 bg-black opacity-30"></div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {course.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {course.difficulty}
              </span>
              {course.status && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {course.status}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-secondary-foreground mb-4">{course.description}</p>
            <div className="flex items-center mb-6">
              <span className="text-yellow-500 mr-2">★</span>
              <span className="font-bold mr-2">{course.average_rating}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">课程不存在或加载失败</div>
      )}

      {course && <CourseContent courseId={courseId} />}
    </div>
  );
}