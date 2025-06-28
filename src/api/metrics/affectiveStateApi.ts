
export interface GetMetricQueries {
    /** Начальная граница времени. с какой даты брать записи (включительно)  */
    from?: number | string;
    /** Конечная граница времени. ДО какой даты брать записи (включительно)  */
    to?: number | string;
    groupBy?: 'day' | 'week' | 'month';
    /** Флаг указывает на получение общей total-сводки по метрике */
    includeTotal?: boolean | 'true' | 'false';
    /** 
     * как агрегировать данные внутри groupBy-отрезков (неделя/месяц и т.д.) 
     * * `mode` - Вернёт самое частое состояние за каждую неделю
     *  @example
     * ```json
     * [
            { "label": "Week 1", "state": "depressive" },
            { "label": "Week 2", "state": "neutral" }
        ]
     * ```
     * * `percentage` - Вернёт проценты по каждой категории за неделю/месяц
     * @example
     * ```json
     * [
            { "label": "Week 1", "distribution": { "depressive": 60, "neutral": 30, "euphoric": 10 } },
            { "label": "Week 2", "distribution": { "depressive": 20, "neutral": 50, "irritable": 30 } }
        ]
        ```
     * * `count` - Вернёт просто сколько дней было каждого состояния внутри каждой недели/месяца
        @example
        ```json
        [
            { "label": "Week 1", "counts": { "depressive": 4, "neutral": 2, "euphoric": 1 } },
            { "label": "Week 2", "counts": { "neutral": 5, "irritable": 2 } }
        ]
        ```
     * */
    aggregation?: 
        'mode' | 
        'percentage' | 
        'count';
    /** 
     * Временной интервал. какой шаг по времени использовать 
     * @example
     * ```plaintext
     * interval=7d → разбивка по 7 дней (недели)
       interval=1d → разбивка по каждому дню
       interval=1m → разбивка по месяцам
       interval=3d → разбивка по каждые 3 дня
     * ```
     * */
    interval?: string;
    /**
     * Вернуть среднее значение по интервалу
     * Применимо только для числовых метрик
     */
    average?: boolean | 'true' | 'false';
    /**
     * Вернуть минимальное значение за каждый интервал
     * Применимо для числовых метрик
     */
    min?: boolean | 'true' | 'false';
    /**
     * Вернуть максимальное значение за каждый интервал
     * Применимо для числовых метрик
     */
    max?: boolean | 'true' | 'false';
}

/**
 * Получает с базы данных статистику по метрике `affective_state`
 * @returns Возвращает объект метрики с временными рядами и их состояниями
 */
export async function getAffectiveStateMetric(params?: GetMetricQueries) {
    return {
        total: {
            depressive: 1,
            irritable: 1,
            neutral: 0,
            euphoric: 1,
        },
        metrics: [
            {
                label: '2025-06-24',
                ts: Date.now(),
                score: 1,
                type: 'irritable',
            },
            {
                label: '2025-06-25',
                ts: Date.now(),
                score: 0,
                type: 'depressive',
            },
            {
                label: '2025-06-26',
                ts: Date.now(),
                score: 3,
                type: 'euphoric',
            },
        ]
    }
}