import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMoodTrackStore = defineStore('mood-track', () => {
    const filterPanel = reactive({
        date: {
            from: null,
            to: null,
        },
        aggregation: null,
        groupBy: null,
        includeTotal: true,
        numericAggregationBy: null,
    })

    return {
        filterPanel,
    }
})