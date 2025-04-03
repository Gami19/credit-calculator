'use client'; // Client Component としてマーク

import React from 'react'; // Reactのインポート (最新のNext.jsでは必須ではないが良い習慣)
import { useCourses } from '@/context/coursesContext'; // Contextフックをインポート (@/ はプロジェクトルートを指す)
import { Course } from '@/types'; // Course型をインポート

export default function CourseList() {
  // Contextから科目リストと削除関数を取得
  const { courses, deleteCourse } = useCourses();

  // (オプション) 編集機能が必要な場合は updateCourse も取得
  // const { courses, deleteCourse, updateCourse } = useCourses();

  const handleDelete = (course: Course) => {
    // 削除前に確認ダイアログを表示
    if (window.confirm(`「${course.name}」を削除してもよろしいですか？`)) {
      deleteCourse(course.id);
    }
  };

  return (
    <div className="mt-6 w-full"> {/* 上部にマージン、幅をフルに */}
      <h2 className="text-xl font-semibold mb-4">登録科目一覧</h2> {/* 見出し */}

      {/* 科目リストが空の場合の表示 */}
      {courses.length === 0 ? (
        <p className="text-gray-500">科目が登録されていません。</p>
      ) : (
        /* 科目リストが存在する場合の表示 */
        <ul className="space-y-3"> {/* リスト要素間のスペース */}
          {/* courses 配列をループして各科目を表示 */}
          {courses.map((course) => (
            <li
              key={course.id} // Reactがリスト項目を識別するためのユニークなキー
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200" // スタイル（レスポンシブ対応、パディング、ボーダー、角丸、影）
            >
              {/* 科目詳細 */}
              <div className="mb-2 sm:mb-0 flex-grow mr-4"> {/* 右側にマージン */}
                <span className="font-medium text-lg">{course.name}</span>
                <div className="text-sm text-gray-600 mt-1">
                  <span>{course.credits}単位</span>
                  <span className="mx-2">|</span> {/* 区切り線 */}
                  <span>分野: {course.category}</span>
                  <span className="mx-2">|</span>
                  <span>状態: {course.grade}</span>
                  {/* isCounted が true ならチェックマークを表示 */}
                  {course.isCounted && (
                    <span className="ml-2 text-green-600 font-semibold">✔️ 取得済</span>
                  )}
                </div>
              </div>

              {/* 操作ボタンエリア */}
              <div className="flex-shrink-0"> {/* ボタンが縮まないように */}
                {/* 編集ボタン (将来的に実装する場合) */}
                {/*
                <button
                  // onClick={() => handleEdit(course)} // 編集関数を呼び出す
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition duration-150 ease-in-out mr-2"
                >
                  編集
                </button>
                */}

                {/* 削除ボタン */}
                <button
                  onClick={() => handleDelete(course)} // 上で定義した削除関数（確認付き）を呼び出す
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition duration-150 ease-in-out"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}