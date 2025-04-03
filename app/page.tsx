'use client'; // Context を使用するため Client Component にする

import CourseInputForm from '@/components/courseInputForm'; // 修正: コンポーネント名を大文字に
import CourseList from '@/components/courseList';
import CreditSummary from '@/components/creditSummary';
import { useCourses } from '@/context/coursesContext'; // useCourses フックをインポート

export default function Home() {
  // useCourses フックから addCourse 関数を取得
  const { addCourse } = useCourses();

  return (
    // レイアウトを調整 (例: flexbox を使用)
    <div className="flex flex-col items-center min-h-screen p-8 sm:p-12 md:p-16 lg:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <main className="w-full max-w-4xl flex flex-col gap-8"> {/* 最大幅を設定し、中央揃え */}
        <h1 className="text-3xl font-bold text-center mb-6">履修単位計算</h1>

        {/* 科目入力フォーム */}
        {/* CourseInputForm コンポーネントに addCourse 関数を props として渡す */}
        <CourseInputForm addCourse={addCourse} />

        {/* 単位取得状況サマリー */}
        <CreditSummary />

        {/* 登録科目一覧 */}
        <CourseList />

      </main>

      {/* フッターは必要に応じて残すか削除 */}
      {/*
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Powered by Next.js
      </footer>
      */}
    </div>
  );
}