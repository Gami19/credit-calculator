// React Context API
'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Course, Requirement } from '@/types'; // OK: '@/types' は 'my-credit-calculator/types' を指す
import { v4 as uuidv4 } from 'uuid';

interface CoursesContextType {
    courses: Course[];
    requirements: Requirement[]; // 必要なら要件も管理
    addCourse: (courseData: Omit<Course, 'id' | 'isCounted'>) => void;
    updateCourse: (id: string, updatedData: Partial<Omit<Course, 'id'>>) => void;
    deleteCourse: (id: string) => void;
    setRequirements: (reqs: Requirement[]) => void; // 要件設定用
  }
  
  const CoursesContext = createContext<CoursesContextType | undefined>(undefined);
  
  // 成績に基づいて isCounted を決定するヘルパー関数
  const checkIsCounted = (grade: Course['grade']): boolean => {
      // 例: 特定の成績以上の場合に true
      return ['秀', '優', '良','可'].includes(grade);
  };
  
  export const CoursesProvider = ({ children }: { children: ReactNode }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [requirements, setRequirements] = useState< Requirement[] >([
        // デフォルトの要件例
        { category: '一般教養', requiredCredits: 30 },
        { category: '専門基礎', requiredCredits: 40 },
    ]);
  
    const addCourse = useCallback((courseData: Omit<Course, 'id' | 'isCounted'>) => {
      const newCourse: Course = {
        ...courseData,
        id: uuidv4(),
        isCounted: checkIsCounted(courseData.grade),
      };
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    }, []);
  
    const updateCourse = useCallback((id: string, updatedData: Partial<Omit<Course, 'id'>>) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === id
                    ? { ...course, ...updatedData, isCounted: checkIsCounted(updatedData.grade ?? course.grade) }
                    : course
            )
        );
    }, []);
  
    const deleteCourse = useCallback((id: string) => {
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    }, []);
  
    const value = {
        courses,
        requirements,
        addCourse,
        updateCourse,
        deleteCourse,
        setRequirements
    };
  
    return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
  };
  
  export const useCourses = (): CoursesContextType => {
    const context = useContext(CoursesContext);
    if (context === undefined) {
      throw new Error('useCourses must be used within a CoursesProvider');
    }
    return context;
  };