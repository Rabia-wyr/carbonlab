import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Play } from 'lucide-react';

// 定义课程图标映射
const courseIcons = {
  "carbon-emission-map": "map-marked-alt",
  "emission-source": "microscope",
  "personal-carbon-footprint": "user",
  "enterprise-carbon-footprint": "building",
  "carbon-market-simulation": "chart-line",
  "trading-strategy": "chess",
  "carbon-sink-measurement": "tree",
  "neutral-path-planning": "route",
}

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    status?: string;
    icon?: string;
    module: string;
  };
  className?: string;
};

export function CourseCard({ course, className }: CourseCardProps) {
  // 将英文难度转换为中文难度
  const difficultyInChinese = {
    "beginner": "基础",
    "intermediate": "中级",
    "advanced": "高级"
  }[course.difficulty] || course.difficulty;
  
  // 根据难度设置徽章颜色
  const difficultyColor = {
    "基础": "bg-green-100 text-green-800",
    "中级": "bg-indigo-100 text-indigo-800",
    "高级": "bg-red-100 text-red-800",
  }[difficultyInChinese] || "bg-gray-100 text-gray-800";
  
  // 根据状态设置徽章颜色
  const statusColor = {
    "已上线": "bg-green-100 text-green-800",
    "开发中": "bg-amber-100 text-amber-800",
    "维护中": "bg-orange-100 text-orange-800",
  }[course.status || ""] || "";

  // 根据模块设置按钮和背景颜色
  const moduleStyles = {
    "carbon-monitor": {
      bg: "bg-emerald-50",
      button: "bg-emerald-600 hover:bg-emerald-700",
      icon: "text-emerald-600"
    },
    "carbon-calculate": {
      bg: "bg-blue-50",
      button: "bg-blue-600 hover:bg-blue-700",
      icon: "text-blue-600"
    },
    "carbon-trading": {
      bg: "bg-purple-50",
      button: "bg-purple-600 hover:bg-purple-700",
      icon: "text-purple-600"
    },
    "carbon-neutral": {
      bg: "bg-orange-50",
      button: "bg-orange-600 hover:bg-orange-700",
      icon: "text-orange-600"
    }
  }[course.module] || {
    bg: "bg-indigo-50",
    button: "bg-indigo-600 hover:bg-indigo-700",
    icon: "text-indigo-600"
  };

  // 根据课程ID获取图标，如果没有则使用模块默认图标
  const getIcon = () => {
    // 优先使用课程自身的icon属性
    if (course.icon) {
      return <i className={`fas fa-${course.icon} text-6xl ${moduleStyles.icon}`}></i>;
    }
    
    // 其次使用预定义的课程图标映射
    const icon = courseIcons[course.id as keyof typeof courseIcons];
    if (icon) {
      return <i className={`fas fa-${icon} text-6xl ${moduleStyles.icon}`}></i>;
    }
    
    // 如果没有课程特定图标，使用模块默认图标
    const moduleIcons = {
      "carbon-monitor": "chart-line",
      "carbon-calculate": "calculator",
      "carbon-trading": "exchange-alt",
      "carbon-neutral": "leaf"
    }
    
    const moduleIcon = moduleIcons[course.module as keyof typeof moduleIcons] || "book";
    return <i className={`fas fa-${moduleIcon} text-6xl ${moduleStyles.icon}`}></i>;
  };

  const isAvailable = course.status !== "开发中" && course.status !== "维护中";

  return (
    <Card className={cn("h-full overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-5px]", className)}>
      <div className={`aspect-video relative overflow-hidden ${moduleStyles.bg} flex items-center justify-center`}>
        <div className="flex flex-col items-center justify-center h-full w-full">
          {getIcon()}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-xl text-gray-800">{course.title}</h3>
          <div className="flex items-center gap-2">
            {course.status && (course.status === "开发中" || course.status === "维护中") && (
              <span className={`text-xs font-medium ${statusColor} px-2 py-1 rounded`}>
                {course.status}
              </span>
            )}
            <span className={`text-xs font-medium ${difficultyColor} px-2 py-1 rounded`}>
              {difficultyInChinese}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <Link
          href={`/courses/${course.id}`}
          className={`inline-block ${moduleStyles.button} text-white font-medium px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105`}
        >
          <Play className="h-4 w-4 inline-block mr-2" />
          开始学习
        </Link>
      </CardContent>
    </Card>
  );
} 