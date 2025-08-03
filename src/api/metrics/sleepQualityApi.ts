import type { GetMetricQueries } from "../../@types/client.types";

/**
 * Получает с базы данных статистику по метрике `sleep_quality`
 * @returns Возвращает объект метрики с временными рядами и их состояниями
 */
export async function getSleepQualityMetric(_?: GetMetricQueries) {
    return {
        total: {},
        metrics: [
            {
                label: '2025-06-25',

                ts: Date.now(),
                score: 2,
            },
            {
                label: '2025-06-26',
                ts: Date.now(),
                score: null,
                // score: 7,
            },
            {
                label: '2025-06-27',
                ts: Date.now(),
                score: 5,
            },
            {
                label: '2025-06-28',
                ts: Date.now(),
                score: 4,
            },
        ]
    }
}