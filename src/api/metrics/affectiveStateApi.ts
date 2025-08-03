import type { GetMetricQueries } from "../../@types/client.types";


/**
 * Получает с базы данных статистику по метрике `affective_state`
 * @returns Возвращает объект метрики с временными рядами и их состояниями
 */
export async function getAffectiveStateMetric(_?: GetMetricQueries) {
    return {
        total: {
            depressive: 1,
            irritable: 1,
            neutral: 0,
            euphoric: 1,
        },
        metrics: [
            {
                label: 'Неделя 1',
                ts: Date.now(),
                score: 2,
                type: 'irritable',
            },
            {
                label: 'Неделя 2',
                ts: Date.now(),
                score: 3,
                type: 'depressive',
            },
            {
                label: 'Неделя 3',
                ts: Date.now(),
                score: 1,
                type: 'euphoric',
            },
            // {
            //     label: '2025-06-24',
            //     ts: Date.now(),
            //     score: 1,
            //     type: 'irritable',
            // },
            // {
            //     label: '2025-06-25',
            //     ts: Date.now(),
            //     score: 0,
            //     type: 'depressive',
            // },
            // {
            //     label: '2025-06-26',
            //     ts: Date.now(),
            //     score: 3,
            //     type: 'euphoric',
            // },
        ]
    }
}