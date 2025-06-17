
export const spheresList = [
    'personal',
    'health',
    'work',
    'mind',
    'rest',
    'home',
    'meaning',
  ] as const
  
export type SphereKey = typeof spheresList[number];

export interface SpheresItem {
  score: number;
  initScore: number;
  isSetMode: boolean;
  isChanged: boolean;
  description?: string;
}

export interface DayEntry {
    date: string; // 'YYYY-MM-DD'
    scores: Record<SphereKey, number>; // от 0 до 100
    note: string | null;
}

export interface Scores {
    id: 'global'; // всегда 'global', один ключ
    /** кол-во дней всего */
    count: number; 
    scores: Record<SphereKey, number>; // значения: (среднее * 10), округлено до целого
}