'use client';

import React,{ useState } from "react";
import { Course } from '@/types';

interface CourseInputFormProps {
    addCourse: (course: Omit<Course, 'id' | 'isCounted'>) => void; // コースを追加する関数を受け取る
}

export default function courseInputForm({ addCourse }: CourseInputFormProps ){
    const [name, setName] = useState('');
    const [credits, setCredits] = useState<number | ''>('');
    const [category, setCategory] = useState('');
    const [grade, setGrade] = useState<'秀' | '優' | '良' | '可' | '不可'>('不可');

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if (!name || credits === '' || !category) {
        alert('必須項目を入力してください');
        return;
        }
        addCourse({ name, credits: Number(credits), category, grade });
        // フォームをリセット
        setName('');
        setCredits('');
        setCategory('');
        setGrade('不可');
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded mb-6">
          {/* フォーム要素（省略） - input, select など */}
          <div>
            <label>科目名:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border p-1" />
          </div>
          <div>
            <label>単位数:</label>
            <input type="number" value={credits} onChange={(e) => setCredits(e.target.value === '' ? '' : Number(e.target.value))} required min="0" className="border p-1" />
          </div>
          <div>
            <label>分野:</label>
            {/* カテゴリは選択式が良い場合が多い */}
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="border p-1" />
          </div>
          <div>
            <label>成績/状態:</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value as any)} className="border p-1">
              <option value="Planned">履修予定</option>
              <option value="InProgress">履修中</option>
              <option value="Passed">合格</option>
              <option value="Failed">不合格</option>
              {/* 必要に応じて他の成績も */}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            科目追加
          </button>
        </form>
      );
    
}