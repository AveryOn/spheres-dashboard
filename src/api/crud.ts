import { openDB, type IDBPDatabase } from 'idb';
import type { DayEntry, Scores, SphereKey } from '../types';
import moment from 'moment';

const DB_NAME = 'boopcoin_db' as const;
const DB_VERSION = 1 as const;
const SCORES_TABLE_NAME = 'scores';
const DAYS_TABLE_NAME = 'days';

let db: IDBPDatabase | null = null;

export type ScoreEntry = Record<SphereKey, number>;

export async function initDb(): Promise<IDBPDatabase> {
    db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            db.createObjectStore(DAYS_TABLE_NAME, { keyPath: 'date' });
            db.createObjectStore(SCORES_TABLE_NAME, { keyPath: 'id' });
        },
    });
    return db;
}

export async function getDayByDate(date: string): Promise<DayEntry> {
    try {
        if (!db) throw 'is not db!';

        return await db.get(DAYS_TABLE_NAME, date);
    } catch (err) {
        throw err;
    }
}

export async function getAllDays(): Promise<DayEntry[]> {
    try {
        if (!db) throw 'is not db!';

        return await db.getAll(DAYS_TABLE_NAME);
    } catch (err) {
        throw err;
    }
}

export async function createDay(data: Record<SphereKey, number>, note?: string | null): Promise<void> {
    try {
        if (!db) throw 'is not db!';
        const day = moment().format('YYYY-MM-DD');
        await db.put(DAYS_TABLE_NAME, {
            date: day,
            scores: data,
            note: note ?? null,
        } as DayEntry);
    } catch (err) {
        throw err;
    }
}

export async function deleteDayByKey(date: string): Promise<void> {
    try {
        if (!db) throw 'is not db!';

        await db.delete(DAYS_TABLE_NAME, date);
    } catch (err) {
        throw err;
    }
}

export async function putScores(data: Record<SphereKey, number>, count: number): Promise<void> {
    try {
        if (!db) throw 'is not db!';

        await db.put(SCORES_TABLE_NAME, {
            id: 'global',
            scores: data,
            count: count+1,
          } as Scores);
    } catch (err) {
        throw err;
    }
}

export async function getScores(): Promise<Scores | undefined> {
    try {
        if (!db) throw 'is not db!';

        const scores: Scores | undefined = await db.get(SCORES_TABLE_NAME, 'global');
        return scores
    } catch (err) {
        throw err;
    }
} 