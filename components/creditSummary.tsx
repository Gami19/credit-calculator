'use client';

import { useCourses } from '@/context/coursesContext';
import { useMemo } from 'react';

export default function CreditSummary() {
  const { courses, requirements } = useCourses();

  // カテゴリごとの取得単位数を計算 (useMemoで計算結果をキャッシュ)
  const creditsByCategory = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    courses.forEach(course => {
      if (course.isCounted) { // isCounted が true のものだけ計算
        categoryMap[course.category] = (categoryMap[course.category] || 0) + course.credits;
      }
    });
    return categoryMap;
  }, [courses]);

  // 総取得単位数
  const totalCredits = useMemo(() => {
    return Object.values(creditsByCategory).reduce((sum, credits) => sum + credits, 0);
  }, [creditsByCategory]);

  return (
    <div className="p-4 border rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">単位取得状況</h2>
      <p className="mb-2">総取得単位数: {totalCredits} 単位</p>

      <h3 className="text-lg font-semibold mb-2">分野別取得単位</h3>
      {requirements.length > 0 ? (
        <ul className="space-y-1">
          {requirements.map(req => {
            const earned = creditsByCategory[req.category] || 0;
            const progress = req.requiredCredits > 0 ? Math.min((earned / req.requiredCredits) * 100, 100) : 100; // 達成率
            return (
              <li key={req.category}>
                {req.category}: {earned} / {req.requiredCredits} 単位
                {/* 簡単なプログレスバー */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </li>
            );
          })}
          {/* 要件にないカテゴリの単位も表示する場合 */}
          {Object.entries(creditsByCategory)
            .filter(([category]) => !requirements.some(req => req.category === category))
            .map(([category, earned]) => (
              <li key={category}>
                {category} (その他): {earned} 単位
              </li>
            ))}
        </ul>
      ) : (
        <p>卒業要件が設定されていません。</p>
      )}
    </div>
  );
}