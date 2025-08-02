import type { GetMetricQueries } from "../../@types/client.types";

/**
 * Получает с базы данных статистику по метрике `energy_level`
 * @returns Возвращает объект метрики с временными рядами и их состояниями
 */
export async function getEnergyLevelMetric(params?: GetMetricQueries) {
    return {
        total: {
            depressive: 1,
            irritable: 1,
            neutral: 0,
            euphoric: 1,
        },
        metrics: [
            {
                label: '2025-06-25',
                ts: Date.now(),
                score: 2,
            },
            {
                label: '2025-06-26',
                ts: Date.now(),
                score: 7,
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