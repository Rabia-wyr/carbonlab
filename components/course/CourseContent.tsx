"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Circle, ChevronRight } from "lucide-react";
import { getCourseUnitsAndLessons } from "@/lib/courses";

interface CourseContentProps {
  courseId: string;
}

export function CourseContent({ courseId }: CourseContentProps) {
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseDetails() {
      setLoading(true);
      const { units } = await getCourseUnitsAndLessons(courseId);
      setUnits(units);
      setLoading(false);
    }
    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="bg-background p-4 rounded-lg">
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">加载课程内容中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background p-4 rounded-lg">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
        {units.map((unit, unitIndex) => (
          <AccordionItem value={`item-${unitIndex}`} key={unitIndex}>
            <AccordionTrigger>
              <div className="flex justify-between w-full items-center">
                <span>第 {unitIndex + 1} 单元：{unit.title}</span>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-2">
                    {unit.lessons.length} 课时
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {unit.lessons.map((lesson: any, lessonIndex: number) => (
                  <li key={lessonIndex}>
                    <Link
                      href={`/courses/${courseId}/lessons/${lesson.id}`}
                      className="flex items-center p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <Circle className="text-gray-300 mr-2 flex-shrink-0" />
                      <span className="flex-grow text-gray-800">
                        {unitIndex + 1}.{lessonIndex + 1} {lesson.title}
                      </span>
                      <ChevronRight className="text-gray-400 ml-2 flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
