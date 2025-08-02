
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
    /**
     * Числовая агрегация по:
     * * `'min'` - минимальному значению за каждый интервал
     * * `'max'` - максимальному значению за каждый интервал
     * * `'average'` - среднему значению за каждый интервал
     */
    numericAggregationBy: 'average' | 'min' | 'max';
}