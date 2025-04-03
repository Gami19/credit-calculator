// 型定義

export interface Course{
    id: string;
    name: string;
    credits: number;
    category: string;
    grade: '秀' | '優' | '良' | '可' | '不可' ;
    isCounted: boolean;
}

export interface Requirement{
    category: string;
    requiredCredits: number;
}